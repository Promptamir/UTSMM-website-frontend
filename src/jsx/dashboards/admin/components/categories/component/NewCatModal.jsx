// Importing part
import Swal from "sweetalert2";
import BE_URL from "../../../../../../lib/envAccess";
import Modal from "../../../../../pop-ups/modal";
import {useState} from "react";

// Creating and exporting new category modal as default
export default function NewCatModal({setCustomLoading, refresh, isOpened, closeFn}) {
    // Defining states of component
    const [title, setTitle] = useState('');
    const [platform_id, setPlatformID] = useState();

    // Returning JSX
    return (
        <Modal isOpened={isOpened} closeFn={closeFn} title={'Create'}>
            <form onSubmit={(e) => {
                e.preventDefault();

                setCustomLoading(true);
                closeFn();
                fetch(`${BE_URL}/admin/categories`, {
                    method: "POST",
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