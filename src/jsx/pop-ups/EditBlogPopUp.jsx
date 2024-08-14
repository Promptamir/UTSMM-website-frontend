import {useState} from "react"
import BE_URL from "../../lib/envAccess"
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import Switch from "react-switch";
import Modal from "./modal";
import '../../css/pop-up/pop-up.css'
import HandleFetchError from "../../lib/handleFetchError";

export default function EditBlogPopUp({ blog, refresh, setLoading, closeFn, isOpened }) {
    const [keywords, setKeywords] = useState('');
    const [error, setError] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState(blog.short_description);
    const [title, setTitle] = useState(blog.title);
    const [published, setPublished] = useState((blog.status === '1'))
    const [image, setImage] = useState(require("../../images/place-holder/1.png"));
    const [imageFile, setImageFile] = useState();

    const handleOnImageChange = (e) => {
        const file = e.target.files[0]

        const fileReader = new FileReader()
        fileReader.onload = (e) => {
            const result = e.target.result
            setImage(result)
        }

        fileReader.readAsDataURL(file);
        setImageFile(e.target.files[0]);
    }


    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (error === '') {
            setLoading(true);
            closeFn();

            const keywordsArray = keywords.split(',');
            const myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("X-Requested-With", "XMLHttpRequest");
            myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('token'))}`);

            const formdata = new FormData();
            formdata.append("title", title);
            formdata.append("short_description", description);
            formdata.append("content", content);
            formdata.append("image", imageFile, "[PROXY]");
            formdata.append("status", 1);
            formdata.append("_method", "PUT");
            keywordsArray.forEach((item, index) => {
                formdata.append(`keywords[${index}]`, item);
            })

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };

            fetch(`${BE_URL}/admin/blogs/${blog.id}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setLoading(false);

                    HandleFetchError({
                        data: result,
                        lineBreak: false,
                        callbackSuccess: (message) => {
                            Swal.fire({icon: 'success', text: message})
                            refresh();
                        },
                        callbackError: (message) => Swal.fire({icon: 'error', text: message})
                    })
                })
                .catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'There was an error while fetching the data'
                    })
                    setLoading(false);
                })
        }
    }

    return (
        <Modal title={'Edit'} isOpened={isOpened} closeFn={closeFn}>
            <form className="form w-full" onSubmit={handleOnSubmit}>
                <img
                    src={image}
                    alt={'Image'}
                    style={{
                        width: '100%',
                        height: '200px',
                        borderRadius: '20px',
                        objectFit: 'cover'
                    }}
                />
                <input
                    className={'input'}
                    required
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleOnImageChange}/>
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
