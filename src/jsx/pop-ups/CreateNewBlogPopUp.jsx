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


export default function CreateNewBlogPopUp({ refresh, setLoading }) {
    const [image, setImage] = useState(require("../../images/place-holder/1.png"));
    const [imageFile, setImageFile] = useState();
    const [keywords, setKeywords] = useState('');
    const [error, setError] = useState('');

    const dispatcher = useDispatch()

    const handleCloseButtonClick = () => {
        dispatcher(closePopUp())
    }


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
            keywordsArray.forEach((item, index) => {
                formdata.append(`keywords[${index}]`, item);
            })

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
        <form className="admin-panel-create-blog-pop-up"
              onSubmit={handleOnSubmit}
        >
            <button className="close-button"
                    onClick={handleCloseButtonClick}>
                <Icon icon="mingcute:close-fill" />
            </button>

            <div className="pop-up-header">
                <h1>
                    Edit Blog
                </h1>
            </div>
            <div className="pop-up-body">


                <div className="image-input">
                    <img src={image} />
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleOnImageChange} />
                </div>

                <AdminPanelFiledset className={"create-faq-field-box"}>
                    <Legend>
                        <Icon icon="pajamas:title" />
                        <span>Title</span>
                    </Legend>
                    <FieldBody>
                        <input
                            minLength={3}
                            maxLength={255}
                            required
                            onChange={(event) => setTitle(event.target.value)}
                            type="text"
                            name="title"
                        />
                    </FieldBody>
                </AdminPanelFiledset>
                <AdminPanelFiledset className={"create-faq-field-box"}>
                    <Legend>
                        <Icon icon="pajamas:title" />
                        <span>Description</span>
                    </Legend>
                    <FieldBody>
                        <input
                            required
                            minLength={3}
                            maxLength={300}
                            onChange={(event) => setDescription(event.target.value)}
                            type="text"
                            name="title"
                        />
                    </FieldBody>
                </AdminPanelFiledset>
                <AdminPanelFiledset className={"create-faq-field-box"}>
                    <Legend>
                        <Icon icon="pajamas:title" />
                        <span>Keywords</span>
                    </Legend>
                    <FieldBody>
                        <input
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
                    </FieldBody>
                </AdminPanelFiledset>

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

                <button className="submit">
                    <span>Submit </span>
                    <Icon icon="iconamoon:send-fill" />
                </button>
            </div>

        </form>
    )
}
