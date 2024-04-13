import { useDispatch } from "react-redux"
import { closePopUp } from "../../features/popUpReducer"
import { Icon } from "@iconify/react"
import AdminPanelFiledset from "../dashboards/admin/components/tools/fieldset/AdminPanelFiledset"
import Legend from "../dashboards/admin/components/tools/fieldset/Legend"
import FieldBody from "../dashboards/admin/components/tools/fieldset/FieldBody"
import { useState } from "react"
import { API, SERVER } from "../../lib/envAccess"
import { put } from "../../lib/useFetch"
import { showError, showSuccess } from "../../lib/alertHandler"
import Swal from "sweetalert2";
import ReactQuill from "react-quill";

export default function EditBlogPopUp({ blog, refresh }) {


    const [image, setImage] = useState(SERVER.BASE_URL + blog.image)


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

    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');

    const handleOnSubmit = (e) => {
        e.preventDefault();

        fetch(`https://utsmm.liara.run/api/admin/blogs/${blog.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json",
                "X-Requested-With" : "XMLHttpRequest"
            },
            body: JSON.stringify({
                "title": title,
                "short_description": description,
                "content": description,
                "keywords": [],
                "status": 1
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
                            required
                            onChange={(event) => setTitle(event.target.value)}
                            type="text"
                            name="title"
                            defaultValue={blog.title} />
                    </FieldBody>
                </AdminPanelFiledset>

                <ReactQuill
                    style={{width: '100%', marginTop: '20px'}}
                    theme="snow"
                    onChange={setDescription}
                />


                <button className="submit">
                    <span>Submit </span>
                    <Icon icon="iconamoon:send-fill" />
                </button>
            </div>

        </form>
    )
}
