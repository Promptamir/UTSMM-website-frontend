// Importing part
import '../../../css/pages/auth-page/AuthPageStyle.css';
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

// Creating and exporting auth page as default
export default function AuthPage() {
    // Defining states of component
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [name, setName] = useState('');
    const [emailSignUp, setEmailSignUp] = useState('');
    const [passwordSignup, setPasswordSignup] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const [error, setError] = useState('');
    const [succses, setSuccses] = useState('');

    const [emailForgottenMode, setEmailForgottenMode] = useState('');

    const [loading, setloading] = useState(false);

    // Defining router to use to navigate to different pages
    const navigate = useNavigate();

    // Handling the form submit event
    function handleSubmit(event) {
        event.preventDefault();

        if (mode === 'login') {
            setloading(true);
            setError('');

            fetch('https://utsmm.liara.run/api/login', {
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

                    sessionStorage.setItem('token', JSON.stringify(data.entities.token));
                    navigate('/');
                })
                .catch(() => {
                    setloading(false);
                    setError('There was an unexpected error. Please try again.');
                })
        } else if (mode === 'signup') {
            if (passwordSignup !== passwordRepeat) {
                setError('The password and its repeat are not matching');
            } else {
                setError('');
                setloading(true);

                fetch('https://utsmm.liara.run/api/register', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept" : "application/json",
                        "X-Requested-With" : "XMLHttpRequest"
                    },
                    body: JSON.stringify({
                        "name": name,
                        "email": emailSignUp,
                        "password": passwordSignup,
                        "password_confirmation": passwordRepeat
                    })
                })
                    .then((data) => data.json())
                    .then((data) => {
                        setloading(false);
                        setError('');

                        sessionStorage.setItem('token', JSON.stringify(data.entities.token));
                        navigate('/');
                    })
                    .catch(() => {
                        setloading(false);
                        setError('There was an unexpected error. Please try again.');
                    })
            }
        } else {
            setloading(true);
            setError('');

            fetch('https://utsmm.liara.run/api/forgot-password', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept" : "application/json",
                    "X-Requested-With" : "XMLHttpRequest"
                },
                body: JSON.stringify({
                    "email": emailForgottenMode
                })
            })
                .then((data) => data.json())
                .then((data) => {
                    setloading(false);
                    setSuccses('We sent you an email.');
                })
                .catch(() => {
                    setloading(false);
                    setError('There was an unexpected error. Please try again.');
                })
        }
    }

    // Returning JSX
    return (
        <div className={'auth-page'}>
            <main className={'container'}>
                <form onSubmit={handleSubmit} action="#" className={'form'}>
                    <h1 className={'form-title'}>{(mode === 'login') ? 'Login' : (mode === 'signup') ? 'Sign Up' : 'Password Forgotten'}</h1>
                    {
                        (mode === 'login') ? (
                            <>
                                <input onChange={(event) => setEmail(event.target.value)} name={'email'} id={'email'}
                                       type="email" required className={'form-input'} placeholder={'Email'}/>
                                <input onChange={(event) => setPassword(event.target.value)} name={'password'}
                                       id={'password'} type="password" minLength={8} maxLength={12} required
                                       className={'form-input'} placeholder={'Password'}/>
                            </>
                        ) : (mode === 'signup') ? (
                            <>
                                <input onChange={(event) => setName(event.target.value)} name={'name'} id={'name'}
                                       type="text" minLength={3} maxLength={10} required className={'form-input'}
                                       placeholder={'Name'}/>
                                <input onChange={(event) => setEmailSignUp(event.target.value)} name={'email'}
                                       id={'email'} type="email" required className={'form-input'}
                                       placeholder={'Email'}/>
                                <input onChange={(event) => setPasswordSignup(event.target.value)} name={'password'}
                                       id={'password'} type="password" minLength={8} maxLength={12} required
                                       className={'form-input'} placeholder={'Password'}/>
                                <input onChange={(event) => setPasswordRepeat(event.target.value)}
                                       name={'password-repeat'} id={'password-repeat'} type="password" minLength={8}
                                       maxLength={12} required className={'form-input'}
                                       placeholder={'Password Repeat'}/>
                            </>
                        ) : (mode === 'password-forgotten')
                            ? (
                                <>
                                    <input onChange={(event) => setEmailForgottenMode(event.target.value)}
                                           name={'email'} id={'email'} type="email" required className={'form-input'}
                                           placeholder={'Email'}/>
                                </>
                            ) : false
                    }
                    {error !== '' && <div className={'form-input-error'}>{error}</div>}
                    {succses !== '' && <div className={'form-input-succses'}>{succses}</div>}
                    <button className={'form-submit-btn'} disabled={loading}>
                        {(loading) ? 'Loading' : 'Submit'}
                    </button>
                    {mode === 'login' && <button className={'mode-switch'} type={'button'} onClick={() => setMode('password-forgotten')}>Lost your password ?</button>}
                    <button
                        className={'mode-switch'}
                        type={'button'}
                        onClick={() => {
                            (mode === 'login')
                                ? setMode('signup')
                                : setMode('login')
                        }}
                    >
                        {
                            (mode === 'login')
                                ? 'Already have an account ?'
                                : 'Dont have any account ?'
                        }
                    </button>
                </form>
            </main>
        </div>
    )
}

