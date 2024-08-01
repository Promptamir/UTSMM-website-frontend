import { useDispatch } from "react-redux"
import { closePopUp } from "../../features/popUpReducer"
import { Icon } from "@iconify/react"
import AdminPanelFiledset from "../dashboards/admin/components/tools/fieldset/AdminPanelFiledset"
import Legend from "../dashboards/admin/components/tools/fieldset/Legend"
import FieldBody from "../dashboards/admin/components/tools/fieldset/FieldBody"
import { useState } from "react"
import BE_URL, { API, SERVER } from "../../lib/envAccess"
import { put } from "../../lib/useFetch"
import { showError, showSuccess } from "../../lib/alertHandler"
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import Switch from "react-switch";

export default function EditBlogPopUp({ blog, refresh, setLoading }) {
    const [keywords, setKeywords] = useState('');
    const [error, setError] = useState('');

    const dispatcher = useDispatch()

    const handleCloseButtonClick = () => {
        dispatcher(closePopUp())
    }

    const [content, setContent] = useState('');
    const [description, setDescription] = useState(blog.short_description);
    const [title, setTitle] = useState(blog.title);
    const [published, setPublished] = useState((blog.status === '1'))

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (error === '') {
            setLoading(true);
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

                <AdminPanelFiledset className={"create-faq-field-box"}>
                    <Legend>
                        <Icon icon="pajamas:title" />
                        <span>Title</span>
                    </Legend>
                    <FieldBody>
                        <input
                            value={title}
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
                        <span>Published</span>
                    </Legend>
                    <FieldBody>
                        <Switch checked={published} onChange={(e) => {setPublished(e)}} />
                    </FieldBody>
                </AdminPanelFiledset>
                <AdminPanelFiledset className={"create-faq-field-box"}>
                    <Legend>
                        <Icon icon="pajamas:title" />
                        <span>Description</span>
                    </Legend>
                    <FieldBody>
                        <input
                            value={description}
                            required
                            minLength={3}
                            maxLength={300}
                            onChange={(event) => setDescription(event.target.value)}
                            type="text"
                            name="description"
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
