import { useDispatch } from "react-redux"
import { closePopUp } from "../../features/popUpReducer"
import { Icon } from "@iconify/react"
import AdminPanelFiledset from "../dashboards/admin/components/tools/fieldset/AdminPanelFiledset"
import Legend from "../dashboards/admin/components/tools/fieldset/Legend"
import FieldBody from "../dashboards/admin/components/tools/fieldset/FieldBody"
import {useRef, useState} from "react"
import 'react-quill/dist/quill.snow.css';
import Swal from "sweetalert2";
import BE_URL, {SERVER} from "../../lib/envAccess";
import ReactQuill from "react-quill";
import Modal from "./modal";
import HandleFetchError from "../../lib/handleFetchError";
import {useFetch} from "../../lib/useFetch";
import Pagination from "../primaries/pagination";


export default function CreateNewBlogPopUp({ refresh, setLoading, closeFn, isOpened }) {
    const [image, setImage] = useState(require("../../images/place-holder/1.png"));
    const [imageFile, setImageFile] = useState();
    const [keywords, setKeywords] = useState('');
    const [error, setError] = useState('');

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

    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (error === '') {
            setLoading(true);
            closeFn();

            const keywordsArray = keywords.split(',');
            const myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("X-Requested-With", "XMLHttpRequest");
            myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('token'))}`);

            const formdata = new FormData();
            formdata.append("title", title);
            formdata.append("short_description", description);
            formdata.append("content", content);
            formdata.append("image", imageFile, "[PROXY]");
            formdata.append("status", 1);
            keywordsArray.forEach((item, index) => {
                formdata.append(`keywords[${index}]`, item);
            })

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };

            fetch(`${BE_URL}/admin/blogs`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setLoading(false);

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
                    setLoading(false);
                })
        }
    }

    const [mediaData, mediaError, mediaLoading, setUrl, refreshData, refetch] = useFetch(`${BE_URL}/admin/blog-media`);
    const [mediaOpened, setMediaOpened] = useState(false);
    const [mediaMode, setMediaMode] = useState('upload');
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [mediaImage, setMediaImage] = useState(require("../../images/place-holder/1.png"));
    const [mediaImageFile, setMediaImageFile] = useState();
    const [mediaTitle, setMediaTitle] = useState('');
    const [mediaSubmitLoading, setMediaSubmitLoading] = useState(false);

    const quillRef = useRef(null);

    const handleOnMediaImageChange = (e) => {
        const file = e.target.files[0]

        const fileReader = new FileReader()
        fileReader.onload = (e) => {
            const result = e.target.result
            setMediaImage(result)
        }

        fileReader.readAsDataURL(file);
        setMediaImageFile(e.target.files[0]);
    }

    return (
        <Modal title={'Create'} closeFn={closeFn} isOpened={isOpened}>
            <div className={'media-holder'}>
                <button 
                    onClick={() => setMediaOpened(prevState => !prevState)}                      
                    className={'media-upload-btn'}
                >
                    Upload Media
                </button>
                <div className={'media-content-holder'} data-opened={mediaOpened}>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <div className={'media-mode-holder'}>
                            <button
                                className={'media-mode-btn'}
                                onClick={() => setMediaMode('upload')}
                                data-selected={(mediaMode === 'upload')}
                            >
                                Upload
                            </button>
                            <button
                                className={'media-mode-btn'}
                                onClick={() => setMediaMode('media')}
                                data-selected={(mediaMode === 'media')}
                            >
                                Media
                            </button>
                        </div>
                    </div>
                    {
                        (mediaMode === 'upload')
                            ? (
                                <form action="#" className={'form w-full'} onSubmit={(e) => {
                                    e.preventDefault();
                                    setMediaSubmitLoading(true);

                                    const myHeaders = new Headers();
                                    myHeaders.append("Accept", "application/json");
                                    myHeaders.append("X-Requested-With", "XMLHttpRequest");
                                    myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('token'))}`);

                                    const formdata = new FormData();
                                    formdata.append("title", mediaTitle);
                                    formdata.append("media", mediaImageFile, "[PROXY]");

                                    const requestOptions = {
                                        method: "POST",
                                        headers: myHeaders,
                                        body: formdata,
                                        redirect: "follow"
                                    };

                                    fetch(`${BE_URL}/admin/blog-media`, requestOptions)
                                        .then((response) => response.json())
                                        .then((result) => {
                                            setMediaSubmitLoading(false);

                                            HandleFetchError({
                                                data: result,
                                                lineBreak: false,
                                                callbackSuccess: (message) => {
                                                    Swal.fire({icon: 'success', text: message});
                                                    refreshData();
                                                },
                                                callbackError: (message) => Swal.fire({icon: 'error', text: message})
                                            })
                                        })
                                        .catch(() => {
                                            setMediaSubmitLoading(false);
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'There was an error while fetching the data'
                                            })
                                        })
                                }}>
                                    <img
                                        src={mediaImage}
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
                                        required
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleOnMediaImageChange}/>
                                    <label htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        className="input"
                                        required
                                        minLength={3}
                                        maxLength={255}
                                        name={'title'}
                                        id={'title'}
                                        onChange={(e) => setMediaTitle(e.target.value)}
                                    />
                                    <button disabled={mediaSubmitLoading} className="submit-btn">Submit</button>
                                </form>
                            ) : (
                                <div>
                                    {
                                        (mediaLoading)
                                            ? (
                                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                                    <Icon icon={'eos-icons:loading'} width={40} href={40}/>
                                                </div>
                                            ) : (mediaError)
                                                ? <p>There was an error while fetching the data</p>
                                                : (
                                                    <div style={{marginBottom: '20px'}} className={'media-grid'}>
                                                        {
                                                            mediaData.entities.media.map((item, index) => (
                                                                <div className={'media-grid-item'} key={index}>
                                                                    <img src={item.url} alt={item.title} className={'bg-image'} />
                                                                    <div className={'media-grid-item-buttons-holder'}>
                                                                        <span className={'media-title'}>{item.title}</span>
                                                                        <button disabled={deleteLoading} className="delete-btn" onClick={() => {
                                                                            setDeleteLoading(true);
                                                                            fetch(`${BE_URL}/admin/blog-media/${item.id}`, {
                                                                                method: "DELETE",
                                                                                headers: {
                                                                                    "Content-Type": "application/json",
                                                                                    "Accept" : "application/json",
                                                                                    "X-Requested-With" : "XMLHttpRequest",
                                                                                    "Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                                                                                }
                                                                            })
                                                                                .then((data) => data.json())
                                                                                .then((data) => {
                                                                                    setDeleteLoading(false);

                                                                                    HandleFetchError({
                                                                                        data: data,
                                                                                        lineBreak: false,
                                                                                        callbackSuccess: (message) => {
                                                                                            Swal.fire({icon:'success', text: message})
                                                                                            refreshData();
                                                                                        },
                                                                                        callbackError: (message) => Swal.fire({icon:'error', text: message})
                                                                                    })
                                                                                })
                                                                                .catch(() => {
                                                                                    setDeleteLoading(false);
                                                                                    Swal.fire({icon:'error', text: 'There was an error while fetching the data'})
                                                                                })
                                                                        }}>
                                                                            <Icon icon="mingcute:delete-line" width={30}
                                                                                  height={30}/>
                                                                            <span>Delete</span>
                                                                        </button>
                                                                        <button
                                                                            onClick={() => {
                                                                                const editor = quillRef.current.getEditor();
                                                                                const range = editor.getSelection(true);

                                                                                if (range) {
                                                                                    editor.insertEmbed(range.index, 'image', item.url);
                                                                                    editor.setSelection(range.index + 1); // Move cursor after the image
                                                                                }
                                                                            }}
                                                                            className="copy-btn"
                                                                        >
                                                                            <Icon icon="ph:copy" width={30}
                                                                                  height={30}/>
                                                                            <span>Copy</span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                )
                                    }
                                    <Pagination
                                        error={mediaError}
                                        refetch={refetch}
                                        setUrl={setUrl}
                                        count={mediaData?.entities?.count}
                                        loading={mediaLoading}
                                        apiEndpoint={'admin/blog-media'}
                                    />
                                </div>
                            )
                    }
                </div>
            </div>
            <form className="form w-full" onSubmit={handleOnSubmit}>
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
                    required
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleOnImageChange}/>
                <label htmlFor="title">Title</label>
                <input
                    className={'input'}
                    minLength={3}
                    maxLength={255}
                    required
                    onChange={(event) => setTitle(event.target.value)}
                    type="text"
                    name="title"
                />

                <label htmlFor="description">Description</label>
                <textarea
                    className={'input'}
                    minLength={3}
                    maxLength={255}
                    required
                    onChange={(event) => setDescription(event.target.value)}
                    name="description"
                />
                <label htmlFor="keywords">Keywords</label>
                <input
                    className={'input'}
                    type="text"
                    name="title"
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
                <label htmlFor="content">Content</label>
                <ReactQuill
                    ref={quillRef}
                    modules={{ toolbar: [['bold', 'italic', 'underline', 'image']] }}
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
                <button className="submit-btn">Submit</button>
            </form>
        </Modal>
    )
}
