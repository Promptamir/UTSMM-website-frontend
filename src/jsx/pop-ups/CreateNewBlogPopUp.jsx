import { useDispatch } from "react-redux"
import { closePopUp } from "../../features/popUpReducer"
import { Icon } from "@iconify/react"
import AdminPanelFiledset from "../dashboards/admin/components/tools/fieldset/AdminPanelFiledset"
import Legend from "../dashboards/admin/components/tools/fieldset/Legend"
import FieldBody from "../dashboards/admin/components/tools/fieldset/FieldBody"
import { useState } from "react"
import { post, put } from "../../lib/useFetch"
import { API } from "../../lib/envAccess"
import { showError, showSuccess } from "../../lib/alertHandler"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from "sweetalert2";


export default function CreateNewBlogPopUp({ refresh }) {


    const [image, setImage] = useState(require("../../images/place-holder/1.png"))
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');


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

        fileReader.readAsDataURL(file)
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        fetch(`https://utsmm.liara.run/api/admin/blogs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json",
                "X-Requested-With" : "XMLHttpRequest",
                "Authorization" : `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            },
            body: JSON.stringify({
                "title": title,
                "short_description": description,
                "content": description,
                "keywords": [],
                "status": 0
            })
        })
            .then((data) => data.json())
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'The blog is added now.'
                })

                refresh();
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'There was an error while fetching the data'
                })
            })
    }


    return (
        <form className="admin-panel-create-blog-pop-up"
            onSubmit={handleSubmit}>
            <button className="close-button"
                onClick={handleCloseButtonClick}>
                <Icon icon="mingcute:close-fill" />
            </button>

            <div className="pop-up-header">
                <h1>
                    Create Blog
                </h1>
            </div>
            <div className="pop-up-body">


                <div className="image-input">
                    <img src={image} />
                    <input
                        required
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
                            type="text"
                            name="title"
                            required
                            onInput={(value) => setTitle(value.target.value)}
                            defaultValue={""} />
                    </FieldBody>
                </AdminPanelFiledset>

                <div style={{margin: '20px 0'}}>
                    <ReactQuill
                        style={{width: '100%'}}
                        theme="snow"
                        onChange={setDescription}
                    />
                </div>

                <button className="submit">
                    <span>Submit </span>
                    <Icon icon="iconamoon:send-fill" />
                </button>
            </div>

        </form>
    )
}
