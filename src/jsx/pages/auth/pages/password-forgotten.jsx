// Importing part
import '../../../../css/pages/auth-page/AuthPageStyle.css';
import BE_URL from "../../../../lib/envAccess";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

// Creating and exporting Password Reset page as default
export default function PasswordResetPage() {
    // Defining states of component
    const [error, setError] = useState('');
    const [succses, setSuccses] = useState('');
    const [emailForgottenMode, setEmailForgottenMode] = useState('');
    const [loading, setloading] = useState(false);

    // Defining router to use to navigate to different pages
    const navigate = useNavigate();

    // Handling the form submit event
    function handleSubmit(event) {
        event.preventDefault();

        setloading(true);
        setError('');

        fetch(`${BE_URL}/password-reset-links`, {
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
                setError('');
                setSuccses(data.message);
            })
            .catch(() => {
                setloading(false);
                setSuccses('');
                setError('There was an unexpected error. Please try again.');
            })
    }

    // Returning JSX
    return (
        <div className={'auth-page'}>
            <main className={'container'}>
                <form onSubmit={handleSubmit} action="#" className={'form'}>
                    <h1 className={'form-title'}>Password Forgotten</h1>
                    <input onChange={(event) => setEmailForgottenMode(event.target.value)} name={'email'} id={'email'} type="email" required className={'form-input'} placeholder={'Email'}/>
                    {error !== '' && <div className={'form-input-error'}>{error}</div>}
                    {succses !== '' && <div className={'form-input-succses'}>{succses}</div>}
                    <button className={'form-submit-btn'} disabled={loading}>{(loading) ? 'Loading' : 'Submit'}</button>
                    <Link
                        className={'mode-switch'}
                        type={'button'}
                        to={'/auth/login'}
                    >
                        Already have an account ?
                    </Link>
                </form>
            </main>
        </div>
    )
}

