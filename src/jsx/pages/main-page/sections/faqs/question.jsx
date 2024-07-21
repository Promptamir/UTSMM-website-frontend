// Importing part
import {useState} from "react";
import BE_URL from "../../../../../lib/envAccess";

// Creating and exporting question component as default
export default function Question() {
    // Defining states of component
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // Returning JSX
    return (
        <form onSubmit={(e) => {
            e.preventDefault();

            setLoading(true);
            fetch(`${BE_URL}/questions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                },
                body: JSON.stringify({
                    "full_name": name,
                    "email": email,
                    "content": content
                })
            })
                .then((data) => data.json())
                .then((data) => {
                    setLoading(false);
                    (data.message === "Unauthenticated.")
                        ? setError('Unauthenticated.')
                        : setSuccess(data.message);
                })
                .catch(() => {
                    setLoading(false);
                    setSuccess('');
                    setError('There was an error while fetching the data');
                })
        }} action="#" className={'form question'}>
            <h1 className={'form-title'}>Question</h1>
            <input required onChange={(e) => setName(e.target.value)} className={'form-input'} minLength={3}
                   maxLength={30} type="text" id={'name'} placeholder={'Full Name'} name={'name'}/>
            <input required onChange={(e) => setEmail(e.target.value)} className={'form-input'} type="email"
                   id={'email'} placeholder={'Email'} name={'email'}/>
            <textarea required onChange={(e) => setContent(e.target.value)} className={'form-input'} minLength={10}
                   maxLength={350} type="text" id={'content'} placeholder={'Question'} name={'content'}/>
            <button disabled={loading} className={'form-submit-btn'}>SUBMIT</button>
            {error !== '' && <div className={'form-input-error'}>{error}</div>}
            {success !== '' && <div className={'form-input-succses'}>{success}</div>}
        </form>
    );
}