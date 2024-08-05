import { useDispatch } from "react-redux"
import { closePopUp } from "../../features/popUpReducer"
import { Icon } from "@iconify/react"
import AdminPanelFiledset from "../dashboards/admin/components/tools/fieldset/AdminPanelFiledset"
import Legend from "../dashboards/admin/components/tools/fieldset/Legend"
import FieldBody from "../dashboards/admin/components/tools/fieldset/FieldBody"
import { useState } from "react"
import 'react-quill/dist/quill.snow.css';
import Swal from "sweetalert2";
import BE_URL, {SERVER} from "../../lib/envAccess";
import ReactQuill from "react-quill";
import Modal from "./modal";


export default function CreateNewBlogPopUp({ refresh, setLoading, closeFn, isOpened }) {
    const [image, setImage] = useState(require("../../images/place-holder/1.png"));
    const [imageFile, setImageFile] = useState();
    const [keywords, setKeywords] = useState('');
    const [error, setError] = useState('');

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

    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');

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
            formdata.append("keywords", keywords.split(','));

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };

            fetch(`${BE_URL}/admin/blogs`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setLoading(false);

                    if (result.message === "Unauthenticated.") {
                        Swal.fire({
                            icon: 'error',
                            text: 'Unauthenticated.'
                        });
                    } else {
                        Swal.fire({
                            icon: 'success',
                            text: result.message
                        });
                        refresh();
                    }
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
        <Modal title={'Create'} closeFn={closeFn} isOpened={isOpened}>
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

                <label htmlFor="title">Title</label>
                <input
                    className={'input'}
                    minLength={3}
                    maxLength={255}
                    required
                    onChange={(event) => setTitle(event.target.value)}
                    type="text"
                    name="title"
                />

                <label htmlFor="description">Description</label>
                <textarea
                    className={'input'}
                    minLength={3}
                    maxLength={255}
                    required
                    onChange={(event) => setDescription(event.target.value)}
                    name="description"
                />
                <label htmlFor="keywords">Keywords</label>
                <input
                    className={'input'}
                    type="text"
                    name="title"
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
