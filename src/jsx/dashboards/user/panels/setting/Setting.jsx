// Importing part
import '../../../../../css/dashboard/user/setting.css';
import {useState} from "react";

// Creating and exporting setting panel as default
export default function Setting() {
    // Defining states of component
    const [error, setError] = useState('');
    const [succses, setSuccses] = useState('');
    const [loading, setLoading] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Returning JSX
    return (
        <section className={'container-dashboard'}>
            <div className={'container-item'}>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    setError('');
                    setSuccses('');
                    setLoading(true);

                    fetch('https://utsmm.liara.run/api/reset-password', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept" : "application/json",
                            "X-Requested-With" : "XMLHttpRequest"
                        },
                        body: JSON.stringify({
                            "token": sessionStorage.getItem('token'),
                            "email": email,
                            "password": password
                        })
                    })
                        .then((data) => data.json())
                        .then((data) => {
                            setSuccses('')
                        })
                        .catch(() => {
                            setLoading(false);
                            setError('There was an unexpected error. Please try again.');
                        })
                }} action="#" className={'dashboard-form'}>
                    <h1 className={'dashboard-title'}>Reset password</h1>
                    <div>
                        <label className={'dashboard-form-label'} htmlFor="email">Email</label>
                        <input onChange={(event) => setEmail(event.target.value)} required type="email" placeholder={'Example : x@gmail.com'} className={'dashboard-form-input'}/>
                    </div>
                    <div>
                        <label className={'dashboard-form-label'} htmlFor="password">New password</label>
                        <input onChange={(event) => setPassword(event.target.value)} required type="password" placeholder={'Example: xxxxxxxx'} className={'dashboard-form-input'}/>
                    </div>
                    {error !== '' && <div className={'dashboard-error'}>{error}</div>}
                    {succses !== '' && <div className={'dashboard-succses'}>{succses}</div>}
                    <button disabled={loading} className={'dashboard-submit-btn'}>SUBMIT</button>
                </form>
            </div>
        </section>
    );
}