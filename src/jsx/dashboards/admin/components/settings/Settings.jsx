// Importing part
import {useFetch} from "../../../../../lib/useFetch";
import {useState} from "react";
import {Icon} from "@iconify/react";
import Swal from "sweetalert2";
import {showError} from "../../../../../lib/alertHandler";

// Creating and exporting settings tab of admin dashboard as default
export default function Settings() {
    // Getting data
    const [data, error, loading, setUrl, refresh] = useFetch(`https://utsmm.liara.run/api/general-configs`);

    // Defining states
    const [customError, setCustomError] = useState('');
    const [customLoading, setCustomLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [seoTitle, setSeoTitle] = useState('');
    const [seoDescription, setSeoDescription] = useState('');
    const [keywords, setKeywords] = useState('');

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
                            fetch('https://utsmm.liara.run/api/admin/general-configs', {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Accept": "application/json",
                                    "X-Requested-With": "XMLHttpRequest",
                                    "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                                },
                                body: JSON.stringify({
                                    "email": email,
                                    "seo_title": seoTitle,
                                    "seo_description": seoDescription,
                                    "keywords": keywords.split(',')
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
                                            text: 'The configs are changed'
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
                                <label className={'label'} htmlFor="email">Email</label>
                                <input defaultValue={data.entities['general-configs'].email}
                                       onChange={(e) => setEmail(e.target.value)} required id={'email'} name={'email'}
                                       className={'input'} type="email" placeholder={'Email'}/>
                            </div>
                            <div>
                                <label className={'label'} htmlFor="seo-title">Seo Title</label>
                                <input defaultValue={data.entities['general-configs'].seo_title}
                                       onChange={(e) => setSeoTitle(e.target.value)} required id={'seo-title'}
                                       name={'seo-title'} className={'input'} type="text" placeholder={'Seo Title'}
                                       minLength={3} maxLength={255}/>
                            </div>
                            <div>
                                <label className={'label'} htmlFor="seo-description">Seo Description</label>
                                <input defaultValue={data.entities['general-configs'].seo_description}
                                       onChange={(e) => setSeoDescription(e.target.value)} required id={'seo-description'}
                                       name={'seo-description'} className={'input'} type="text"
                                       placeholder={'Seo Description'} minLength={3}/>
                            </div>
                            <div>
                                <label className={'label'} htmlFor="keywords">Keywords</label>
                                <input onInput={(e) => {
                                    const value = e.target.value;
                                    const arrayOfKeywords = value.split(',');

                                    if (arrayOfKeywords.length < 3) {
                                        setCustomError('There should be at least 3 keywords')
                                    } else {
                                        setCustomError('');
                                        setKeywords(value)
                                    }
                                }} required id={'keywords'} name={'keywords'} className={'input'} type="text"
                                       placeholder={'separated with comma ","'} min={3}  defaultValue={data.entities['general-configs'].keywords.join(',')}/>
                            </div>
                            {customError !== '' && <div className={'form-input-error'}>{customError}</div>}
                            <button className={'submit-btn'}>Submit</button>
                        </form>
                    )
            }
        </div>
    );
}