// Importing part
import {Icon} from "@iconify/react";
import {closePopUp} from "../../features/popUpReducer";
import {useDispatch} from "react-redux";
import ReactQuill from "react-quill";
import {useState} from "react";
import BE_URL from "../../lib/envAccess";
import Swal from "sweetalert2";

// Creating and exporting information about categories modal as default
export default function MessageTicketsPopUp({id, setCustomLoading, refresh}) {
    // Defining states of component
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState();
    const [imageFile, setImageFile] = useState(null);

    // Getting data from the server
    const dispatcher = useDispatch();

    // Returning JSX
    return (
        <div className="admin-panel-create-blog-pop-up">
            <button className="close-button" onClick={() => dispatcher(closePopUp())}>
                <Icon icon="mingcute:close-fill"/>
            </button>
            <div className="pop-up-header"><h1>Answer</h1></div>
            <div className="pop-up-body">
                <form
                    onSubmit={(e) => {
                        if (error === '') {
                            e.preventDefault();

                            setCustomLoading(true);

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
                        }
                    }}
                    className="admin-panel-create-blog-pop-up"
                    action="#"
                >
                    <div className="image-input">
                        <img src={image}/>
                        <input
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
                    </div>
                    <ReactQuill
                        style={{width: '100%', marginTop: '20px'}}
                        theme="snow"
                        onChange={(val) => {
                            if (10 >= val.length) {
                                setError('The content should at least be 10 character');
                            } else if (val.length >= 1500) {
                                setError('The content should be 1500 character at most');
                            } else {
                                setError('');
                                setContent(val)
                            }
                        }}
                    />
                    {error !== '' && <div className={'input-error'}>{error}</div>}
                    <button className="submit">
                        <span>Submit </span>
                        <Icon icon="iconamoon:send-fill"/>
                    </button>
                </form>
            </div>
        </div>
    );
}