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

// Creating and exporting new category modal as default
export default function NewCatModal({setCustomLoading, refresh, isOpened, closeFn}) {
    // Defining states of component
    const [title, setTitle] = useState('');
    const [idState, setId] = useState();

    // Returning JSX
    return (
        <Modal isOpened={isOpened} title={'Create'} closeFn={closeFn}>
            <form onSubmit={(e) => {
                e.preventDefault();

                setCustomLoading(true);
                closeFn();
                fetch(`${BE_URL}/admin/hot-categories`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                    },
                    body: JSON.stringify({
                        "remote_category_title": title,
                        "local_category_id": idState
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
                    minLength={3}
                    maxLength={255}
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
                    onChange={(event) => setId(event.target.value)}
                    type="number"
                    name="id"
                    className={'input'}
                />
                <button className="submit-btn">submit</button>
            </form>
        </Modal>
    );
}