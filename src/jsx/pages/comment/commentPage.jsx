// Importing part
import '../../../css/pages/comment/commentPageStyle.css';
import {useState} from "react";
import Swal from "sweetalert2";

// Creating and exporting comment page as default
export default function CommentPage() {
    // Defining states of the component
    const [stars, setStars] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [succses, setSuccses] = useState('');

    // Returning JSX
    return (
        <div className={'comment-page'}>
            <div className={'container'}>
                <form action="#" className={'form'} onSubmit={(event) => {
                    event.preventDefault();

                    setLoading(true);
                    fetch(`https://utsmm.liara.run/api/comments`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept" : "application/json",
                            "X-Requested-With" : "XMLHttpRequest",
                            "Authorization" : `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                        },
                        body: JSON.stringify({
                            "content": content,
                            "stars": Number(stars)
                        })
                    })
                        .then((data) => data.json())
                        .then((data) => {
                            setLoading(false);
                            setError('');
                            setSuccses('Your comment has been submitted.');
                        })
                        .catch(() => {
                            setLoading(false);
                            setError('An error happened while fetching the data');
                            setSuccses('');
                        })
                }}>
                    <h1 className={'form-title'}>Comment</h1>
                    <input onChange={(e) => setStars(e.target.value)} className={'form-input'} placeholder={'Stars'} id={'stars'} type={'number'} max={5} min={1} />
                    <textarea onChange={(e) => setContent(e.target.value)} name="content" className="form-input" id={'content'} placeholder={'Message'}/>
                    {error !== '' && <div className={'form-input-error'}>{error}</div>}
                    {succses !== '' && <div className={'form-input-succses'}>{succses}</div>}
                    <button disabled={loading} className={'form-submit-btn'}>submit</button>
                </form>
            </div>
        </div>
    );
}