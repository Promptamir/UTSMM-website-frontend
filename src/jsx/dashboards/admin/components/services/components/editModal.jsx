// Importing part
import {Icon} from "@iconify/react";
import {useState} from "react";
import Swal from "sweetalert2";
import BE_URL from "../../../../../../lib/envAccess";
import Modal from "../../../../../pop-ups/modal";
import HandleFetchError from "../../../../../../lib/handleFetchError";

// Creating and exporting edit modal as default
export default function EditModal({id, isOpened, closeFn, setCustomLoading, refresh}) {
    // Defining states of component
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');

    // Returning JSX
    return (
        <Modal title={'Edit'} isOpened={isOpened} closeFn={closeFn}>
            <form className={'form w-full'} onSubmit={(e) => {
                e.preventDefault();

                closeFn();
                setCustomLoading(true);
                fetch(`${BE_URL}/admin/services/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                    },
                    body: JSON.stringify({
                        "title": title,
                        "description": description,
                        "category_id": categoryId
                    })
                })
                    .then((data) => data.json())
                    .then((data) => {
                        setCustomLoading(false);
                        HandleFetchError({
                            data: data,
                            lineBreak: false,
                            callbackSuccess: (message) => {
                                Swal.fire({icon: 'success', text: message})
                                refresh();
                            },
                            callbackError: (message) => Swal.fire({icon: 'error', text: message})
                        })
                    })
                    .catch(() => {
                        setCustomLoading(false);
                        Swal.fire({
                            icon: 'error',
                            title: 'There was an error while fetching the data'
                        })
                    })
            }}>
                <label className={'input-label'} htmlFor="title">Title</label>
                <input
                    className={'input'}
                    minLength={5}
                    maxLength={255}
                    required
                    onChange={(event) => setTitle(event.target.value)}
                    type="text"
                    name="title"
                />
                <label className={'input-label'} htmlFor="description">Description</label>
                <textarea
                    className={'input'}
                    minLength={5}
                    maxLength={255}
                    required
                    onChange={(event) => setDescription(event.target.value)}
                    name="description"
                />
                <label className={'input-label'} htmlFor="id">Category ID</label>
                <input
                    className={'input'}
                    min={0}
                    required
                    onChange={(event) => setCategoryId(event.target.value)}
                    type="number"
                    name="id"
                />
                <button className="submit-btn">
                    <span>Submit </span>
                    <Icon icon="iconamoon:send-fill"/>
                </button>
            </form>
        </Modal>
    );
}