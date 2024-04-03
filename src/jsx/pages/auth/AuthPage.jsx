// Importing part
import '../../../css/pages/auth-page/AuthPageStyle.css';
import {useRef, useState} from "react";
import axios from "axios";

// Creating and exporting auth page as default
export default function AuthPage() {
    // Defining states of component
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailSignup, setEmailSignup] = useState('');

    const [name, setName] = useState('');
    const [emailSignUp, setEmailSignUp] = useState('');
    const [passwordSignup, setPasswordSignup] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [error, setError] = useState('');

    const [loading, setloading] = useState(false);

    // Handling the form submit event
    function handleSubmit(event) {
        event.preventDefault();

        if (mode === 'login') {
            setloading(true);
            setError('')

            console.log({
                "email": email,
                "password": password
            })

            axios.post('https://utsmm.liara.run/api/login', {
                "headers": {
                    "Content-Type": "application/json",
                    "Accept" : "application/json",
                    "X-Requested-With" : "XMLHttpRequest"
                },
                "body": {
                    "email": email,
                    "password": password
                }
            })
                .then((data) => {
                    setloading(false);
                    console.log(data)
                })
                .catch((data) => {
                    setloading(false);
                    console.log(data)
                    setError('An Unexpected Error has happened.')
                })
        } else {
            if (passwordSignup !== passwordRepeat) {
                setError('The password and its repeat are not matching');
            } else {
                setError('');
                setloading(true);
            }
        }
    }

    // Returning JSX
    return (
        <div className={'auth-page'}>
            <main className={'container'}>
                <form onSubmit={handleSubmit} action="#" className={'form'}>
                    <h1 className={'form-title'}>{(mode === 'login') ? 'Login' : 'Sign Up'}</h1>
                    {
                        (mode === 'login')
                            ? (
                                <>
                                    <input onChange={(event) => setEmail(event.target.value)} name={'email'} id={'email'} type="email" required className={'form-input'} placeholder={'Email'}/>
                                    <input onChange={(event) => setPassword(event.target.value)} name={'password'} id={'password'} type="password" minLength={8} maxLength={12} required className={'form-input'} placeholder={'Password'}/>
                                </>
                            ) : (
                                <>
                                    <input onChange={(event) => setName(event.target.value)} name={'name'} id={'name'} type="text" minLength={3} maxLength={10} required className={'form-input'} placeholder={'Name'}/>
                                    <input onChange={(event) => setEmailSignUp(event.target.value)} name={'email'} id={'email'} type="email" required className={'form-input'} placeholder={'Email'}/>
                                    <input onChange={(event) => setPasswordSignup(event.target.value)} name={'password'} id={'password'} type="password" minLength={8} maxLength={12} required className={'form-input'} placeholder={'Password'}/>
                                    <input onChange={(event) => setPasswordRepeat(event.target.value)} name={'password-repeat'} id={'password-repeat'} type="password" minLength={8} maxLength={12} required className={'form-input'} placeholder={'Password Repeat'}/>
                                </>
                            )
                    }
                    {error !== '' && <div className={'form-input-error'}>{error}</div>}
                    <button className={'form-submit-btn'} disabled={loading}>
                        {(loading) ? 'Loading' : 'Submit'}
                    </button>
                    <button
                        className={'mode-switch'}
                        type={'button'}
                        onClick={() => {
                            (mode === 'login')
                                ? setMode('sign-up')
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

