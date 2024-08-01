// Importing part
import '../../../../../css/dashboard/user/setting.css';
import {useState} from "react";
import BE_URL from "../../../../../lib/envAccess";
import {useFetch} from "../../../../../lib/useFetch";

// Creating and exporting setting panel as default
export default function Setting() {
    // Fetching api
    const [user, userError, userLoading] = useFetch(`${BE_URL}/user`)

    // Defining states of component
    const [error, setError] = useState('');
    const [succses, setSuccses] = useState('');
    const [loading, setLoading] = useState('');
    const [password, setPassword] = useState('');

    const [profileImage, setProfileImage] = useState();
    const [profileImageFile, setProfileImageFile] = useState();
    const [profileImageLoading, setProfileImageLoading] = useState(false);
    const [profileImageError, setProfileImageError] = useState('');
    const [profileImageSuccess, setProfileImageSuccess] = useState('');

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
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept" : "application/json",
                            "X-Requested-With" : "XMLHttpRequest",
                            "Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                        },
                        body: JSON.stringify({
                            "_method" : 'PATCH',
                            "password": password
                        })
                    })
                        .then((data) => data.json())
                        .then((data) => {
                            setLoading(false);
                            setError('');
                            setSuccses(data.message)
                        })
                        .catch(() => {
                            setLoading(false);
                            setError('There was an unexpected error. Please try again.');
                            setSuccses('');
                        })
                }} action="#" className={'dashboard-form'}>
                    <h1 className={'dashboard-title'}>Reset password</h1>
                    <div>
                        <label className={'dashboard-form-label'} htmlFor="password">New password</label>
                        <input
                            minLength={8}
                            maxLength={30}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            type="password"
                            placeholder={'Example: xxxxxxxx'}
                            className={'dashboard-form-input'}
                        />
                    </div>
                    {error !== '' && <div className={'dashboard-error'}>{error}</div>}
                    {succses !== '' && <div className={'dashboard-succses'}>{succses}</div>}
                    <button disabled={loading} className={'dashboard-submit-btn'}>SUBMIT</button>
                </form>
            </div>
            <div className={'container-item'}>
                <form action="#" className={'dashboard-form'}>
                    <h1 className={'dashboard-title'}>Profile Image</h1>
                    <div className="image-input">
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'}}>
                            {
                                (userLoading)
                                    ? <h1>Loading</h1>
                                    : (userError)
                                        ? <h1>There was an error while fethcing the data</h1>
                                        : <img style={{width: '100px', height: '100px', borderRadius: '100%', objectFit: 'cover'}} src={(profileImage) ? profileImage : user.entities.user.avatar}/>
                            }
                        </div>
                        <input
                            required
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0]

                                const fileReader = new FileReader()
                                fileReader.onload = (e) => {
                                    const result = e.target.result
                                    setProfileImage(result)
                                }

                                fileReader.readAsDataURL(file);
                                setProfileImageFile(e.target.files[0]);
                            }}/>
                    </div>
                    {profileImageError !== '' && <div className={'dashboard-error'}>{profileImageError}</div>}
                    {profileImageSuccess !== '' && <div className={'dashboard-succses'}>{profileImageSuccess}</div>}
                    <button onClick={() => {
                        setProfileImageLoading(true);
                        setProfileImageError('');
                        setProfileImageSuccess('');

                        const myHeaders = new Headers();
                        myHeaders.append("Accept", "application/json");
                        myHeaders.append("X-Requested-With", "XMLHttpRequest");
                        myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('token'))}`);

                        const formdata = new FormData();
                        formdata.append("image", profileImageFile);
                        formdata.append("_method", "PATCH");

                        const requestOptions = {
                            method: "POST",
                            headers: myHeaders,
                            body: formdata,
                            redirect: "follow"
                        };

                        fetch(`${BE_URL}/user/avatar`, requestOptions)
                            .then((response) => response.json())
                            .then((data) => {
                                setProfileImageLoading(false);
                                setProfileImageError('');
                                setProfileImageSuccess('The avatar has been Changed');
                            })
                            .catch(() => {
                                setProfileImageError('There was an error while fetching the data');
                                setProfileImageSuccess('');
                                setProfileImageLoading(false);
                            })
                    }} disabled={profileImageLoading} className={'dashboard-submit-btn'}>SUBMIT</button>
                </form>
            </div>
        </section>
    );
}