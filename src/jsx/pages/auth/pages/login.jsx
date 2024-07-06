// Importing part
import '../../../../css/pages/auth-page/AuthPageStyle.css';
import BE_URL from "../../../../lib/envAccess";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

// Creating and exporting Login page as default
export default function LoginPage() {
    // Defining states of component
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [succses, setSuccses] = useState('');


    const [loading, setloading] = useState(false);

    // Defining router to use to navigate to different pages
    const navigate = useNavigate();

    // Handling the form submit event
    function handleSubmit(event) {
        event.preventDefault();
        setloading(true);
        setError('');

        fetch(`${BE_URL}/auth-tokens`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json",
                "X-Requested-With" : "XMLHttpRequest"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
            .then((data) => data.json())
            .then((data) => {
                setloading(false);
                setError('');
                setSuccses("You're succesfully logged in now.")

                localStorage.setItem('token', JSON.stringify(data.entities.token));
                navigate('/');
            })
            .catch(() => {
                setloading(false);
                setError('There was an unexpected error. Please try again.');
            })
    }

    // Returning JSX
    return (
        <div className={'auth-page'}>
            <main className={'container'}>
                <form onSubmit={handleSubmit} action="#" className={'form'}>
                    <h1 className={'form-title'}>Login</h1>
                    <input onChange={(event) => setEmail(event.target.value)} name={'email'} id={'email'} type="email" required className={'form-input'} placeholder={'Email'}/>
                    <input minLength={8} maxLength={30} onChange={(event) => setPassword(event.target.value)} name={'password'} id={'password'} type="password" required className={'form-input'} placeholder={'Password'}/>
                    {error !== '' && <div className={'form-input-error'}>{error}</div>}
                    {succses !== '' && <div className={'form-input-succses'}>{succses}</div>}
                    <button className={'form-submit-btn'} disabled={loading}>{(loading) ? 'Loading' : 'Submit'}</button>
                    <Link className={'mode-switch'} to={'/auth/password-forgotten'}>Password Forgotten ?</Link>
                    <Link className={'mode-switch'} to={'/auth/sign-up'}>Dont have any account ?</Link>
                </form>
            </main>
        </div>
    )
}

