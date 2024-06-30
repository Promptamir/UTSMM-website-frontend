// Importing part
import '../../../../../css/dashboard/user/setting.css';
import {useState} from "react";
import BE_URL from "../../../../../lib/envAccess";

// Creating and exporting setting panel as default
export default function Setting() {
    // Defining states of component
    const [error, setError] = useState('');
    const [succses, setSuccses] = useState('');
    const [loading, setLoading] = useState('');

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

                    fetch(`${BE_URL}/user/password`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept" : "application/json",
                            "X-Requested-With" : "XMLHttpRequest",
                            "Authorization" : `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                        },
                        body: JSON.stringify({
                            "password": password
                        })
                    })
                        .then((data) => data.json())
                        .then((data) => setSuccses(data.entities.message))
                        .catch(() => {
                            setLoading(false);
                            setError('There was an unexpected error. Please try again.');
                        })
                }} action="#" className={'dashboard-form'}>
                    <h1 className={'dashboard-title'}>Reset password</h1>
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