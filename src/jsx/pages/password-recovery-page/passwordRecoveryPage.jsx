// Importing part
import '../../../css/pages/password-recovery-page/passwordRecoveryPageStyle.css';
import {useState} from "react";
import BE_URL from "../../../lib/envAccess";
import {useLocation} from "react-router-dom";

// Creating and exporting password Recovery page as default
export default function PasswordRecoveryPage() {
    // Defining states of component
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [succses, setSuccses] = useState('');

    // Defining token
    const location = useLocation();
    const token = location.search.slice(7, location.search.length);

    // Returning JSX
    return (
        <div className={'password-recovery-page'}>
            {
                (token)
                    ? (
                        <form action="#" className={'form'} onSubmit={(e) => {
                            e.preventDefault();

                            setLoading(true);
                            fetch(`${BE_URL}/user/forgotten-password`, {
                                method: "PATCH",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Accept": "application/json",
                                    "X-Requested-With": "XMLHttpRequest",
                                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                                },
                                body: JSON.stringify({
                                    token: token,
                                    email: email,
                                    password: password
                                })
                            })
                                .then((data) => data.json())
                                .then((data) => {
                                    setLoading(false);
                                    if (data.message === "Unprocessable entity.") {
                                        const stringToShow = Object.values(data.errors).join(', ');
                                        setError(stringToShow);
                                        setSuccses('');
                                    } else {
                                        setError('');
                                        setSuccses(data.message);
                                    }
                                })
                                .catch(() => {
                                    setSuccses('');
                                    setLoading(false);
                                    setError('There was an error while fetching the data');
                                })
                        }}>
                            <label className={'input-label'} htmlFor="email">Email</label>
                            <input placeholder={'x@gmail.com'} required className={'input'} type={'text'} id={'email'}
                                   onChange={(e) => setEmail(e.target.value)}/>
                            <label className={'input-label'} htmlFor="password">Password</label>
                            <input minLength={8} maxLength={30} required className={'input'} type={'password'} id={'password'} placeholder={'xxxxxxxxx'}
                                   onChange={(e) => setPassword(e.target.value)}/>
                            <button disabled={loading} className={'submit-btn'}>{(loading) ? 'Loading' : 'Submit'}</button>
                            {error !== '' && <div className={'form-input-error'}>{error}</div>}
                            {succses !== '' && <div className={'form-input-succses'}>{succses}</div>}
                        </form>
                    ) : <h1>There is no token</h1>
            }
        </div>
    );
}