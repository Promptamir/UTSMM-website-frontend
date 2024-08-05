// Importing part
import AdminPanelFiledset from "../../tools/fieldset/AdminPanelFiledset";
import Legend from "../../tools/fieldset/Legend";
import {Icon} from "@iconify/react";
import FieldBody from "../../tools/fieldset/FieldBody";
import {useState} from "react";
import {closePopUp} from "../../../../../../features/popUpReducer";
import {useDispatch} from "react-redux";
import Swal from "sweetalert2";
import BE_URL from "../../../../../../lib/envAccess";
import Modal from "../../../../../pop-ups/modal";

// Creating and exporting edit category modal as default
export default function EditCatModal({setCustomLoading, refresh, cat, isOpened, closeFn}) {
    // Defining states of component
    const [title, setTitle] = useState(cat.title);
    const [platform_id, setPlatformID] = useState(cat.platform_id);
    const dispatcher = useDispatch();

    // Returning JSX
    return (
        <Modal isOpened={isOpened} closeFn={closeFn} title={'Create'}>
            <form onSubmit={(e) => {
                e.preventDefault();

                setCustomLoading(true);
                fetch(`${BE_URL}/admin/categories/${cat.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                    },
                    body: JSON.stringify({
                        "title": title,
                        "platform_id": platform_id
                    })
                })
                    .then((data) => data.json())
                    .then((data) => {
                        setCustomLoading(false);
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

                        refresh();
                    })
                    .catch(() => {
                        setCustomLoading(false);
                        Swal.fire({
                            icon: 'error',
                            title: 'There was an error while fetching the data'
                        })
                    })
            }} className="form w-full">
                <label htmlFor="title">Title</label>
                <input
                    minLength={5}
                    maxLength={255}
                    defaultValue={title}
                    required
                    onChange={(event) => setTitle(event.target.value)}
                    type="text"
                    name="title"
                    className={'input'}
                />
                <label htmlFor="platform_id">Platform ID</label>
                <input
                    min={1}
                    required
                    defaultValue={platform_id}
                    onChange={(event) => setPlatformID(event.target.value)}
                    type="number"
                    name="platform_id"
                    className={'input'}
                />
                <button className="submit-btn">Submit</button>
            </form>
        </Modal>
    );
}