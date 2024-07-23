// Importing part
import {useFetch} from "../../../../../lib/useFetch";
import {useEffect, useState} from "react";
import {Icon} from "@iconify/react";
import Swal from "sweetalert2";
import {showError} from "../../../../../lib/alertHandler";
import BE_URL from "../../../../../lib/envAccess";

// Creating and exporting settings tab of admin dashboard as default
export default function Settings() {
    // Getting data
    const [data, error, loading, setUrl, refresh] = useFetch(`${BE_URL}/general-configs`);

    // Defining states
    const [customError, setCustomError] = useState('');
    const [customLoading, setCustomLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [seoTitle, setSeoTitle] = useState('');
    const [seoDescription, setSeoDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [mainTitle, setMainTitle] = useState('');
    const [mainDescription, setMainDescription] = useState('');
    const [aboutUs, setAboutUs] = useState('');

    // Using useEffect to set values with fetch
    useEffect(() => {
        if (!loading && !error) {
            setEmail(data.entities['general-configs'].email);
            setSeoTitle(data.entities['general-configs'].seo_title);
            setSeoDescription(data.entities['general-configs'].seo_description);
            setMainTitle(data.entities['general-configs'].main_title);
            setMainDescription(data.entities['general-configs'].main_description);
            setAboutUs(data.entities['general-configs'].about_us);
            setKeywords(data.entities['general-configs'].keywords.join(','));
        }
    }, [loading]);

    // Returning JSX
    return (
        <div>
            <h1 className={'title'}>General Configs</h1>
            {
                (loading)
                    ? <h1>Loading</h1>
                    : (
                        <form onSubmit={(e) => {
                            e.preventDefault();

                            setCustomLoading(true);
                            fetch(`${BE_URL}/admin/general-configs`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Accept": "application/json",
                                    "X-Requested-With": "XMLHttpRequest",
                                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                                },
                                body: JSON.stringify({
                                    "email": email,
                                    "seo_title": seoTitle,
                                    "seo_description": seoDescription,
                                    "main_title": mainTitle,
                                    "main_description": mainDescription,
                                    "keywords": keywords.split(','),
                                    "about_us": aboutUs
                                })
                            })
                                .then((resp) => resp.json())
                                .then(resp => {
                                    if (resp.message === "Unauthenticated.") {
                                        Swal.fire({
                                            icon: 'error',
                                            text: 'Unauthenticated.'
                                        });
                                    } else {
                                        Swal.fire({
                                            icon: 'success',
                                            text: resp.message
                                        });
                                        refresh();
                                    }
                                    setCustomLoading(false);
                                })
                                .catch(err => {
                                    const errors = err?.response?.data
                                    showError(errors)
                                    setCustomLoading(false);
                                })
                        }} action="#" className={'form'}>
                            <div className={'loading'} data-loading={customLoading}>
                                <Icon icon={'eos-icons:loading'} width={40} href={40}/>
                            </div>
                            <div>
                                <label className={'label'} htmlFor="main-title">Main title</label>
                                <input
                                    defaultValue={mainTitle}
                                    onChange={(e) => setMainTitle(e.target.value)}
                                    required
                                    id={'main-title'}
                                    name={'main-title'}
                                    className={'input'}
                                    type="text"
                                    placeholder={'Main Title'}
                                    minLength={3}
                                    maxLength={255}
                                />
                            </div>
                            <div>
                                <label className={'label'} htmlFor="main-desc">Main Description</label>
                                <textarea
                                    defaultValue={mainDescription}
                                    onChange={(e) => setMainDescription(e.target.value)}
                                    required
                                    id={'main-desc'}
                                    name={'main-desc'}
                                    className={'input'}
                                    placeholder={'Main Description'}
                                    minLength={3}
                                />
                            </div>
                            <div>
                                <label className={'label'} htmlFor="email">Email</label>
                                <input
                                    defaultValue={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    id={'email'}
                                    name={'email'}
                                    className={'input'}
                                    type="email"
                                    placeholder={'Email'}/>
                            </div>
                            <div>
                                <label className={'label'} htmlFor="seo-title">Seo Title</label>
                                <input
                                    defaultValue={seoTitle}
                                    onChange={(e) => setSeoTitle(e.target.value)}
                                    required
                                    id={'seo-title'}
                                    name={'seo-title'}
                                    className={'input'}
                                    type="text"
                                    placeholder={'Seo Title'}
                                    minLength={3}
                                    maxLength={255}
                                />
                            </div>
                            <div>
                                <label className={'label'} htmlFor="seo-description">Seo Description</label>
                                <textarea
                                    defaultValue={seoDescription}
                                    onChange={(e) => setSeoDescription(e.target.value)}
                                    required
                                    id={'seo-description'}
                                    name={'seo-description'}
                                    className={'input'}
                                    placeholder={'Seo Description'}
                                    minLength={3}
                                />
                            </div>
                            <div>
                                <label className={'label'} htmlFor="keywords">Keywords</label>
                                <input
                                    onInput={(e) => {
                                        const value = e.target.value;
                                        const arrayOfKeywords = value.split(',');

                                        if (arrayOfKeywords.length < 3) {
                                            setCustomError('There should be at least 3 keywords')
                                        } else {
                                            setCustomError('');
                                            setKeywords(value)
                                        }
                                    }}
                                    required
                                    id={'keywords'}
                                    name={'keywords'}
                                    className={'input'}
                                    type="text"
                                    placeholder={'separated with comma ","'}
                                    min={3}
                                    defaultValue={keywords}/>
                            </div>
                            <div>
                                <label className={'label'} htmlFor="about-us">About Us</label>
                                <textarea
                                    defaultValue={aboutUs}
                                    onChange={(e) => setAboutUs(e.target.value)}
                                    required
                                    id={'about-us'}
                                    name={'about-us'}
                                    className={'input'}
                                    placeholder={'About Us'}
                                    minLength={3}
                                />
                            </div>
                            {customError !== '' && <div className={'form-input-error'}>{customError}</div>}
                            <button className={'submit-btn'}>Submit</button>
                        </form>
                    )
            }
        </div>
    );
}