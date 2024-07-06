import { useDispatch } from "react-redux"
import { closePopUp } from "../../features/popUpReducer"
import { Icon } from "@iconify/react"
import AdminPanelFiledset from "../dashboards/admin/components/tools/fieldset/AdminPanelFiledset"
import Legend from "../dashboards/admin/components/tools/fieldset/Legend"
import FieldBody from "../dashboards/admin/components/tools/fieldset/FieldBody"
import { useState } from "react"
import { post, put } from "../../lib/useFetch"
import BE_URL, { API } from "../../lib/envAccess"
import { showError, showSuccess } from "../../lib/alertHandler"
import { logFormData } from "../../lib/helperTools"
import Swal from "sweetalert2";



export default function CreatePlatformPopUp({refresh, customLoading }) {




    const [image, setImage] = useState(require("../../images/place-holder/1.png"));
    const [imageFile, setImageFile] = useState();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [order, setOrder] = useState('');
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


    const handleSubmit = (e) => {
        e.preventDefault()

        customLoading(true);

        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('token'))}`);

        const formdata = new FormData();
        formdata.append("title", name);
        formdata.append("description", description);
        formdata.append("order", order);
        formdata.append("image", imageFile, "[PROXY]");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
        };

        fetch(`${BE_URL}/admin/platforms/`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                customLoading(false);
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
                customLoading(false);
            })
    }
    return (
        <form className="admin-panel-create-platform-pop-up"
              onSubmit={handleSubmit}>
            <button className="close-button"
                    onClick={handleCloseButtonClick}>
                <Icon icon="mingcute:close-fill"/>
            </button>

            <div className="pop-up-header">
                <h1>
                    Edit Platform
                </h1>
            </div>
            <div className="pop-up-body">


                <div className="image-input">
                    <img src={image}/>
                    <input
                        type="file"
                        name="image"
                        required
                        accept="image/*"
                        onChange={handleOnImageChange}/>
                </div>

                <AdminPanelFiledset className={"create-faq-field-box"}>
                    <Legend>
                        <Icon icon="pajamas:title"/>
                        <span>name</span>
                    </Legend>
                    <FieldBody>
                        <input onChange={(e) => setName(e.target.value)} required minLength={5} maxLength={255}
                               type="text" name="title" placeholder={'Title'}/>
                    </FieldBody>
                </AdminPanelFiledset>

                <AdminPanelFiledset className={"create-faq-field-box"}>
                    <Legend>
                        <Icon icon="material-symbols:description-outline"/>
                        <span>Description</span>
                    </Legend>
                    <FieldBody>
                        <textarea
                            cols={10}
                            rows={10}
                            required
                            minLength={20}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={350}
                            name="description"
                            placeholder={'Description'}/>
                    </FieldBody>
                </AdminPanelFiledset>

                <AdminPanelFiledset className={"create-faq-field-box"}>
                    <Legend>
                        <Icon icon="pajamas:title"/>
                        <span>Order</span>
                    </Legend>
                    <FieldBody>
                        <input
                            type="number"
                            min={1}
                            name="order"
                            onChange={(e) => setOrder(e.target.value)}
                            required
                            placeholder={'Order'}/>
                    </FieldBody>
                </AdminPanelFiledset>

                <button className="submit">
                    <span>Submit </span>
                    <Icon icon="iconamoon:send-fill"/>
                </button>
            </div>

        </form>
    )
}
