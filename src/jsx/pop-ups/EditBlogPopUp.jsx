import {useState} from "react"
import BE_URL from "../../lib/envAccess"
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import Switch from "react-switch";
import Modal from "./modal";
import '../../css/pop-up/pop-up.css'

export default function EditBlogPopUp({ blog, refresh, setLoading, closeFn, isOpened }) {
    const [keywords, setKeywords] = useState('');
    const [error, setError] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState(blog.short_description);
    const [title, setTitle] = useState(blog.title);
    const [published, setPublished] = useState((blog.status === '1'))

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (error === '') {
            setLoading(true);
            closeFn();

            fetch(`${BE_URL}/admin/blogs/${blog.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept" : "application/json",
                    "X-Requested-With" : "XMLHttpRequest",
                    "Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                },
                body: JSON.stringify({
                    "_method": 'put',
                    "title": title,
                    "short_description": description,
                    "content": content,
                    "keywords": keywords.split(','),
                    "status": (published) ? '1' : '0'
                })
            })
                .then((data) => data.json())
                .then((data) => {
                    setLoading(false);

                    if (data.message === "Unauthenticated.") {
                        Swal.fire({
                            icon: 'error',
                            text: 'Unauthenticated.'
                        });
                    } else {
                        Swal.fire({
                            icon: 'success',
                            text: data.message
                        });
                        refresh();
                    }
                })
                .catch(() => {
                    setLoading(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'There was an error while fetching the data'
                    })
                })
        }
    }

    return (
        <Modal title={'Edit'} isOpened={isOpened} closeFn={closeFn}>
            <form className="form w-full" onSubmit={handleOnSubmit}>
                <label htmlFor="title" className={'input-label'}>Title</label>
                <input
                    className={'input'}
                    defaultValue={title}
                    minLength={3}
                    maxLength={255}
                    required
                    onChange={(event) => setTitle(event.target.value)}
                    type="text"
                    id={'title'}
                    name="title"
                />
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    <label className={'input-label'}>Published</label>
                    <Switch checked={published} onChange={(e) => {
                        setPublished(e)
                    }}/>
                </div>
                <label htmlFor={'description'} className={'input-label'}>Description</label>
                <textarea
                    defaultValue={description}
                    className={'input'}
                    required
                    name={'description'}
                    id={'description'}
                    minLength={3}
                    maxLength={300}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <label htmlFor={'keywords'} className={'input-label'}>Keywords</label>
                <input
                    defaultValue={keywords}
                    className={'input'}
                    type="text"
                    name="keywords"
                    required
                    minLength={3}
                    placeholder={'Separated by Comma ","'}
                    onInput={(e) => {
                        const value = e.target.value;
                        const arrayOfKeywords = value.split(',');

                        if (arrayOfKeywords.length < 3) {
                            setError('There should be at least 3 keywords')
                        } else {
                            setError('');
                            setKeywords(value)
                        }
                    }}
                />
                <label htmlFor="content">Content</label>
                <ReactQuill
                    defaultValue={content}
                    style={{width: '100%', marginTop: '20px'}}
                    theme="snow"
                    onChange={(val) => {
                        if (val.length <= 100) {
                            setError('The content should at least be 100 character.');
                        } else {
                            setError('');
                            setContent(val)
                        }
                    }}
                />
                {error !== '' && <div className={'input-error'}>{error}</div>}
                <button className="submit-btn">Submit</button>
            </form>
        </Modal>
    )
}
