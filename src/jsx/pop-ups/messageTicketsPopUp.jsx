// Importing part
import {Icon} from "@iconify/react";
import {useState} from "react";
import BE_URL from "../../lib/envAccess";
import Swal from "sweetalert2";
import Modal from "./modal";

// Creating and exporting information about categories modal as default
export default function MessageTicketsPopUp({id, setCustomLoading, refresh, closeFn, isOpened}) {
    // Defining states of component
    const [content, setContent] = useState('');
    const [image, setImage] = useState();
    const [imageFile, setImageFile] = useState(null);

    // Returning JSX
    return (
        <Modal closeFn={closeFn} isOpened={isOpened} title={'Answer'}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    setCustomLoading(true);
                    closeFn();

                    const myHeaders = new Headers();
                    myHeaders.append("Accept", "application/json");
                    myHeaders.append("X-Requested-With", "XMLHttpRequest");
                    myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('token'))}`);

                    const formdata = new FormData();
                    formdata.append("content", content);
                    if (imageFile !== null) {
                        formdata.append("attachment", imageFile, "[PROXY]");
                    }

                    const requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: formdata,
                        redirect: "follow"
                    };

                    fetch(`${BE_URL}/admin/tickets/${id}/messages`, requestOptions)
                        .then((response) => response.json())
                        .then((result) => {
                            setCustomLoading(false);

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
                            setCustomLoading(false);
                            Swal.fire({
                                icon: 'error',
                                title: 'There was an error while fetching the data'
                            })
                        })
                }}
                className="form w-full"
                action="#"
            >
                <label htmlFor="content" className={'image'}>Image</label>
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
                    id={'image'}
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files[0]

                        const fileReader = new FileReader()
                        fileReader.onload = (e) => {
                            const result = e.target.result
                            setImage(result)
                        }

                        fileReader.readAsDataURL(file);
                        setImageFile(e.target.files[0]);
                    }}/>
                <label htmlFor="content" className={'input-label'}>Content</label>
                <textarea
                    onChange={(e) => setContent(e.target.value)}
                    name={'content'}
                    id={'content'}
                    required
                    minLength={10}
                    maxLength={1500}
                    className={'input'}
                />
                <button className="submit-btn">Submit</button>
            </form>
        </Modal>
    );
}