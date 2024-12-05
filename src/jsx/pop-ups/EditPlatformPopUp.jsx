import { useDispatch } from "react-redux"
import { closePopUp } from "../../features/popUpReducer"
import { Icon } from "@iconify/react"
import AdminPanelFiledset from "../dashboards/admin/components/tools/fieldset/AdminPanelFiledset"
import Legend from "../dashboards/admin/components/tools/fieldset/Legend"
import FieldBody from "../dashboards/admin/components/tools/fieldset/FieldBody"
import { useState } from "react"
import { post, put } from "../../lib/useFetch"
import { API, SERVER } from "../../lib/envAccess"
import { showError, showSuccess } from "../../lib/alertHandler"
import { logFormData } from "../../lib/helperTools"
import Swal from "sweetalert2";
import BE_URL from "../../lib/envAccess";
import Modal from "./modal";
import HandleFetchError from "../../lib/handleFetchError";


export default function EditPlatformPopUp({ platform, refresh, customLoading, closeFn, isOpened }) {
    const [image, setImage] = useState(require("../../images/place-holder/1.png"));
    const [imageFile, setImageFile] = useState();
    const [name, setName] = useState(platform.title);
    const [description, setDescription] = useState(platform.description);
    const [order, setOrder] = useState(platform.order);


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
        closeFn();

        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('token'))}`);

        const formdata = new FormData();
        formdata.append("title", name);
        formdata.append("description", description);
        formdata.append("order", order);
        formdata.append("image", imageFile, "[PROXY]");
        formdata.append("_method", "PUT");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
        };

        fetch(`${BE_URL}/admin/platforms/${platform.id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                customLoading(false);
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
                customLoading(false);
            })
    }



    return (
        <Modal title={'Edit'} closeFn={closeFn} isOpened={isOpened}>
            <form action="#" className="form w-full" onSubmit={handleSubmit}>
                <label className={'input-label'} htmlFor="title">Image</label>
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
                    type="file"
                    name="image"
                    required
                    accept="image/*"
                    onChange={handleOnImageChange}/>
                <label className={'input-label'} htmlFor="title">Title</label>
                <input
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    minLength={5}
                    maxLength={255}
                    type="text"
                    name="title"
                    placeholder={'Title'}
                    className={'input'}
                />
                <label className={'input-label'} htmlFor="description">Description</label>
                <textarea
                    defaultValue={description}
                    required
                    minLength={20}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={350}
                    name="description"
                    placeholder={'Description'}
                    className={'input'}
                />
                <label className={'input-label'} htmlFor="order">Order</label>
                <input
                    defaultValue={order}
                    type="number"
                    min={1}
                    name="order"
                    onChange={(e) => setOrder(e.target.value)}
                    required
                    placeholder={'Order'}
                    className={'input'}
                />
                <button className={'submit-btn'}>Submit</button>
            </form>
        </Modal>
    )
}
