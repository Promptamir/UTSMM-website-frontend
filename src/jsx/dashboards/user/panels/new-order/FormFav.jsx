// Importing part
import {useState} from "react";
import BE_URL from "../../../../../lib/envAccess";
import Swal from "sweetalert2";
import HandleFetchError from "../../../../../lib/handleFetchError";
import Modal from "../../../../pop-ups/modal";

// Creating and exporting fav form component as default
export default function FavForm({type, setFormLoading, selectedFav, formLoading}) {
    // Defining states
    const [link, setLink] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [runs, setRuns] = useState();
    const [interval, setInterval] = useState();
    const [keywords, setKeywords] = useState();
    const [answerNumber, setAnswerNumber] = useState();
    const [userName, setUserName] = useState();
    const [comments, setComments] = useState();
    const [hashtag, setHashtag] = useState();
    const [commentQuantity, setCommentQuantity] = useState(0);
    const [modalOpened, setModalOpened] = useState(false);

    // Conditional rendering
    if (type.toString().toLowerCase() === "default") {
        return (
            <>
                <Modal title={'Confirm Info'} closeFn={() => setModalOpened(false)} isOpened={modalOpened}>
                    <form className={'form w-full'}>
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Service</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{selectedFav.title}</div>

                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Link</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{link}</div>

                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Quantity</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{quantity}</div>

                            {
                                (selectedFav.dripfeedable === "1")
                                    ? (
                                        <>
                                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Runs</div>
                                            <div style={{
                                                fontSize: '16px',
                                                fontWeight: 'normal',
                                                color: 'black'
                                            }}>{runs}</div>

                                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Interval</div>
                                            <div style={{
                                                fontSize: '16px',
                                                fontWeight: 'normal',
                                                color: 'black'
                                            }}>{interval}</div>
                                        </>
                                    ) : false
                            }
                        </div>
                        <button className={'submit-btn'} type={'button'} onClick={() => {
                            setFormLoading(true);
                            setModalOpened(false);
                            fetch(`${BE_URL}/default-orders`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Accept": "application/json",
                                    "X-Requested-With": "XMLHttpRequest",
                                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                                },
                                body: JSON.stringify({
                                    "service": selectedFav.id,
                                    "link": link,
                                    "quantity": quantity,
                                    "runs": runs,
                                    "interval": interval
                                })
                            })
                                .then((data) => data.json())
                                .then((data) => {
                                    setFormLoading(false);
                                    HandleFetchError({
                                        data: data,
                                        lineBreak: false,
                                        callbackSuccess: (message) => Swal.fire({icon: 'success', text: message}),
                                        callbackError: (message) => Swal.fire({icon: 'error', text: message})
                                    })
                                })
                                .catch(() => {
                                    setFormLoading(false);
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'There was an error while fetching the data'
                                    })
                                })
                        }}>Accept</button>
                    </form>
                </Modal>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setModalOpened(true)
                    }}
                    action="#"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}
                >
                    <div>
                    <label className={'label'}>Link</label>
                        <input
                            onChange={(e) => setLink(e.target.value)}
                            type="url"
                            className="input"
                            placeholder={'Type ...'}
                            required
                        />
                    </div>
                    <div>
                        <label className={'label'}>Quantity</label>
                        <input
                            onChange={(e) => setQuantity(e.target.value)}
                            type="number"
                            className="input"
                            min={(selectedFav) ? Number(selectedFav.min) : 0}
                            max={(selectedFav) ? Number(selectedFav.max) : 0}
                            placeholder={'Type ...'}
                            required
                        />
                    </div>
                    {
                        (!selectedFav)
                            ? undefined
                            : (selectedFav.dripfeedable === "1")
                                ? (
                                    <>
                                        <div>
                                            <label className={'label'}>Runs</label>
                                            <input
                                                onChange={(e) => setRuns((e.target.value === '') ? undefined : e.target.value)}
                                                type="number"
                                                min={0}
                                                className="input"
                                                placeholder={'Type ...'}
                                            />
                                        </div>
                                        <div>
                                            <label className={'label'}>Interval</label>
                                            <input
                                                onChange={(e) => setInterval((e.target.value === '') ? undefined : e.target.value)}
                                                type="number"
                                                min={0}
                                                className="input"
                                                placeholder={'Type ...'}
                                            />
                                        </div>
                                    </>
                                ) : false
                    }
                    <button disabled={formLoading} className={'submit-btn'}>Submit</button>
                </form>
            </>
        );
    } else if (type.toString().toLowerCase() === "seo") {
        return (
            <>
                <Modal
                    title={'Confirm Info'}
                    closeFn={() => setModalOpened(false)}
                    isOpened={modalOpened}
                >
                    <form className={'form w-full'}>
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Service</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{selectedFav.title}</div>

                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Link</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{link}</div>

                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Quantity</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{quantity}</div>

                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Keywords</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{keywords}</div>
                        </div>
                        <button className={'submit-btn'} type={'button'} onClick={() => {
                            setFormLoading(true);
                            setModalOpened(false);
                            fetch(`${BE_URL}/seo-orders`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Accept": "application/json",
                                    "X-Requested-With": "XMLHttpRequest",
                                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                                },
                                body: JSON.stringify({
                                    "service": selectedFav.id,
                                    "link": link,
                                    "quantity": quantity,
                                    "keywords": keywords
                                })
                            })
                                .then((data) => data.json())
                                .then((data) => {
                                    setFormLoading(false);
                                    HandleFetchError({
                                        data: data,
                                        lineBreak: false,
                                        callbackSuccess: (message) => Swal.fire({icon: 'success', text: message}),
                                        callbackError: (message) => Swal.fire({icon: 'error', text: message})
                                    })
                                })
                                .catch(() => {
                                    setFormLoading(false);
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'There was an error while fetching the data'
                                    })
                                })
                        }}>
                            Accept
                        </button>
                    </form>
                </Modal>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        setModalOpened(true);
                    }}
                    action="#"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}
                >
                    <div>
                        <label className={'label'}>Link</label>
                        <input
                            onChange={(e) => setLink(e.target.value)}
                            type="url"
                            className="input"
                            placeholder={'Type ...'}
                            required
                        />
                    </div>
                    <div>
                        <label className={'label'}>Quantity</label>
                        <input
                            onChange={(e) => setQuantity(e.target.value)}
                            type="number"
                            className="input"
                            min={(selectedFav) ? Number(selectedFav.min) : 0}
                            max={(selectedFav) ? Number(selectedFav.max) : 0}
                            placeholder={'Type ...'}
                            required
                        />
                    </div>
                    <div>
                        <label className={'label'}>Keywords</label>
                        <input
                            onChange={(e) => setKeywords(e.target.value)}
                            type="text"
                            className="input"
                            placeholder={'Type ...'}
                            required
                        />
                    </div>
                    <button disabled={formLoading} className={'submit-btn'}>Submit</button>
                </form>
            </>
        );
    } else if (type.toString().toLowerCase() === "poll") {
        return (
            <>
                <Modal
                    title={'Confirm Info'}
                    closeFn={() => setModalOpened(false)}
                    isOpened={modalOpened}
                >
                    <form className={'form w-full'}>
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Service</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{selectedFav.title}</div>

                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Link</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{link}</div>

                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Quantity</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{quantity}</div>

                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Answer Number</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{answerNumber}</div>
                        </div>
                        <button className={'submit-btn'} type={'button'} onClick={() => {
                            setFormLoading(true);
                            setModalOpened(false);
                            fetch(`${BE_URL}/poll-orders`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Accept": "application/json",
                                    "X-Requested-With": "XMLHttpRequest",
                                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                                },
                                body: JSON.stringify({
                                    "service": selectedFav.id,
                                    "link": link,
                                    "quantity": quantity,
                                    "answer_number": answerNumber
                                })
                            })
                                .then((data) => data.json())
                                .then((data) => {
                                    setFormLoading(false);
                                    HandleFetchError({
                                        data: data,
                                        lineBreak: false,
                                        callbackSuccess: (message) => Swal.fire({icon: 'success', text: message}),
                                        callbackError: (message) => Swal.fire({icon: 'error', text: message})
                                    })
                                })
                                .catch(() => {
                                    setFormLoading(false);
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'There was an error while fetching the data'
                                    })
                                })
                        }}>
                            Accept
                        </button>
                    </form>
                </Modal>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        setModalOpened(true);
                    }}
                    action="#"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}
                >
                    <div>
                        <label className={'label'}>Link</label>
                        <input
                            onChange={(e) => setLink(e.target.value)}
                            type="url"
                            className="input"
                            placeholder={'Type ...'}
                            required
                        />
                    </div>
                    <div>
                        <label className={'label'}>Quantity</label>
                        <input
                            onChange={(e) => setQuantity(e.target.value)}
                            type="number"
                            className="input"
                            min={(selectedFav) ? Number(selectedFav.min) : 0}
                            max={(selectedFav) ? Number(selectedFav.max) : 0}
                            placeholder={'Type ...'}
                            required
                        />
                    </div>
                    <div>
                        <label className={'label'}>Answer Number</label>
                        <input
                            onChange={(e) => setAnswerNumber(e.target.value)}
                            type="text"
                            className="input"
                            placeholder={'Type ...'}
                            required
                        />
                    </div>
                    <button disabled={formLoading} className={'submit-btn'}>Submit</button>
                </form>
            </>
        );
    } else if (type.toString().toLowerCase() === "package") {
        return (
            <>
                <Modal
                    title={'Confirm Info'}
                    closeFn={() => setModalOpened(false)}
                    isOpened={modalOpened}
                >
                    <form className={'form w-full'}>
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Service</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{selectedFav.title}</div>

                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Link</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{link}</div>
                        </div>
                        <button className={'submit-btn'} type={'button'} onClick={() => {
                            setFormLoading(true);
                            setModalOpened(false);
                            fetch(`${BE_URL}/package-orders`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Accept": "application/json",
                                    "X-Requested-With": "XMLHttpRequest",
                                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                                },
                                body: JSON.stringify({
                                    "service": selectedFav.id,
                                    "link": link,
                                })
                            })
                                .then((data) => data.json())
                                .then((data) => {
                                    setFormLoading(false);
                                    HandleFetchError({
                                        data: data,
                                        lineBreak: false,
                                        callbackSuccess: (message) => Swal.fire({icon: 'success', text: message}),
                                        callbackError: (message) => Swal.fire({icon: 'error', text: message})
                                    })
                                })
                                .catch(() => {
                                    setFormLoading(false);
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'There was an error while fetching the data'
                                    })
                                })
                        }}>
                            Accept
                        </button>
                    </form>
                </Modal>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        setModalOpened(true);
                    }}
                    action="#"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}
                >
                    <div>
                        <label className={'label'}>Link</label>
                        <input
                            onChange={(e) => setLink(e.target.value)}
                            type="url"
                            className="input"
                            placeholder={'Type ...'}
                            required
                        />
                    </div>
                    <button disabled={formLoading} className={'submit-btn'}>Submit</button>
                </form>
            </>
        );
    } else if (type.toString().toLowerCase() === "comment likes") {
        return (
            <>
                <Modal
                    title={'Confirm Info'}
                    closeFn={() => setModalOpened(false)}
                    isOpened={modalOpened}
                >
                    <form className={'form w-full'}>
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Service</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{selectedFav.title}</div>

                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Link</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{link}</div>

                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Quantity</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{quantity}</div>

                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>User Name</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{userName}</div>
                        </div>
                        <button className={'submit-btn'} type={'button'} onClick={() => {
                            setFormLoading(true);
                            setModalOpened(false);
                            fetch(`${BE_URL}/comment-like-orders`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Accept": "application/json",
                                    "X-Requested-With": "XMLHttpRequest",
                                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                                },
                                body: JSON.stringify({
                                    "service": selectedFav.id,
                                    "link": link,
                                    "quantity": quantity,
                                    "username": userName
                                })
                            })
                                .then((data) => data.json())
                                .then((data) => {
                                    setFormLoading(false);
                                    HandleFetchError({
                                        data: data,
                                        lineBreak: false,
                                        callbackSuccess: (message) => Swal.fire({icon: 'success', text: message}),
                                        callbackError: (message) => Swal.fire({icon: 'error', text: message})
                                    })
                                })
                                .catch(() => {
                                    setFormLoading(false);
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'There was an error while fetching the data'
                                    })
                                })
                        }}>
                            Accept
                        </button>
                    </form>
                </Modal>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setModalOpened(true);
                    }}
                    action="#"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}
                >
                    <div>
                        <label className={'label'}>Link</label>
                        <input
                            onChange={(e) => setLink(e.target.value)}
                            type="url"
                            className="input"
                            placeholder={'Type ...'}
                            required
                        />
                    </div>
                    <div>
                        <label className={'label'}>Quantity</label>
                        <input
                            onChange={(e) => setQuantity(e.target.value)}
                            type="number"
                            className="input"
                            min={(selectedFav) ? Number(selectedFav.min) : 0}
                            max={(selectedFav) ? Number(selectedFav.max) : 0}
                            placeholder={'Type ...'}
                            required
                        />
                    </div>
                    <div>
                        <label className={'label'}>User Name</label>
                        <input
                            onChange={(e) => setUserName(e.target.value)}
                            type="text"
                            className="input"
                            placeholder={'Type ...'}
                            required
                        />
                    </div>
                    <button disabled={formLoading} className={'submit-btn'}>Submit</button>
                </form>
            </>
        );
    } else if (type.toString().toLowerCase() === "custom comments") {
        return (
            <>
                <Modal
                    title={'Confirm Info'}
                    closeFn={() => setModalOpened(false)}
                    isOpened={modalOpened}
                >
                    <form className={'form w-full'}>
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Service</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{selectedFav.title}</div>

                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Link</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{link}</div>

                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Comments</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{comments}</div>
                        </div>
                        <button className={'submit-btn'} type={'button'} onClick={() => {
                            setFormLoading(true);
                            setModalOpened(false);
                            fetch(`${BE_URL}/custom-comment-orders`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Accept": "application/json",
                                    "X-Requested-With": "XMLHttpRequest",
                                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                                },
                                body: JSON.stringify({
                                    "service": selectedFav.id,
                                    "link": link,
                                    "comments": comments
                                })
                            })
                                .then((data) => data.json())
                                .then((data) => {
                                    setFormLoading(false);;
                                    HandleFetchError({
                                        data: data,
                                        lineBreak: false,
                                        callbackSuccess: (message) => Swal.fire({icon: 'success', text: message}),
                                        callbackError: (message) => Swal.fire({icon: 'error', text: message})
                                    })
                                })
                                .catch(() => {
                                    setFormLoading(false);
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'There was an error while fetching the data'
                                    })
                                })
                        }}>
                            Accept
                        </button>
                    </form>
                </Modal>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setModalOpened(true);
                    }}
                    action="#"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}
                >
                    <div>
                        <label className={'label'}>Link</label>
                        <input
                            onChange={(e) => setLink(e.target.value)}
                            type="url"
                            className="input"
                            placeholder={'Type ...'}
                            required
                        />
                    </div>
                    <div>
                        <label className={'label'}>Comments</label>
                        <textarea
                            onChange={(e) => {
                                setComments(e.target.value)

                                const splitLines = e.target.value.split(/\r?\n/);
                                setCommentQuantity(splitLines.length);
                            }}
                            type="text"
                            className="input"
                            placeholder={'Type ...'}
                            required
                        />
                    </div>
                    <p>Quantity : {commentQuantity}</p>
                    <button disabled={formLoading} className={'submit-btn'}>Submit</button>
                </form>
            </>
        );
    } else if (type.toString().toLowerCase() === "mentions hashtag") {
        return (
            <>
                <Modal
                    title={'Confirm Info'}
                    closeFn={() => setModalOpened(false)}
                    isOpened={modalOpened}
                >
                    <form className={'form w-full'}>
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Service</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{selectedFav.title}</div>

                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Link</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{link}</div>

                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Quantity</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{quantity}</div>

                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Hashtag</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{hashtag}</div>
                        </div>
                        <button className={'submit-btn'} type={'button'} onClick={() => {
                            setFormLoading(true);
                            setModalOpened(false);
                            fetch(`${BE_URL}/mention-hashtag-orders`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Accept": "application/json",
                                    "X-Requested-With": "XMLHttpRequest",
                                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                                },
                                body: JSON.stringify({
                                    "service": selectedFav.id,
                                    "link": link,
                                    "quantity": quantity,
                                    "hashtag": hashtag
                                })
                            })
                                .then((data) => data.json())
                                .then((data) => {
                                    setFormLoading(false);
                                    HandleFetchError({
                                        data: data,
                                        lineBreak: false,
                                        callbackSuccess: (message) => Swal.fire({icon: 'success', text: message}),
                                        callbackError: (message) => Swal.fire({icon: 'error', text: message})
                                    })
                                })
                                .catch(() => {
                                    setFormLoading(false);
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'There was an error while fetching the data'
                                    })
                                })
                        }}>
                            Accept
                        </button>
                    </form>
                </Modal>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setModalOpened(true);
                    }}
                    action="#"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}
                >
                    <div>
                        <label className={'label'}>Link</label>
                        <input
                            onChange={(e) => setLink(e.target.value)}
                            type="url"
                            className="input"
                            placeholder={'Type ...'}
                            required
                        />
                    </div>
                    <div>
                        <label className={'label'}>Quantity</label>
                        <input
                            onChange={(e) => setQuantity(e.target.value)}
                            type="number"
                            className="input"
                            min={(selectedFav) ? Number(selectedFav.min) : 0}
                            max={(selectedFav) ? Number(selectedFav.max) : 0}
                            placeholder={'Type ...'}
                            required
                        />
                    </div>
                    <div>
                        <label className={'label'}>Hashtag</label>
                        <input
                            onChange={(e) => setHashtag(e.target.value)}
                            type="text"
                            className="input"
                            placeholder={'Type ...'}
                            required
                        />
                    </div>
                    <button disabled={formLoading} className={'submit-btn'}>Submit</button>
                </form>
            </>
        );
    } else if (type.toString().toLowerCase() === "custom comments package") {
        return (
            <>
                <Modal
                    title={'Confirm Info'}
                    closeFn={() => setModalOpened(false)}
                    isOpened={modalOpened}
                >
                    <form className={'form w-full'}>
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Service</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{selectedFav.title}</div>

                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Link</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{link}</div>

                            <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Comments</div>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                color: 'black'
                            }}>{comments}</div>
                        </div>
                        <button className={'submit-btn'} type={'button'} onClick={() => {
                            setFormLoading(true);
                            setModalOpened(false);
                            fetch(`${BE_URL}/custom-comment-package-orders`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Accept": "application/json",
                                    "X-Requested-With": "XMLHttpRequest",
                                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                                },
                                body: JSON.stringify({
                                    "service": selectedFav.id,
                                    "link": link,
                                    "comments": comments
                                })
                            })
                                .then((data) => data.json())
                                .then((data) => {
                                    setFormLoading(false);
                                    HandleFetchError({
                                        data: data,
                                        lineBreak: false,
                                        callbackSuccess: (message) => Swal.fire({icon: 'success', text: message}),
                                        callbackError: (message) => Swal.fire({icon: 'error', text: message})
                                    })
                                })
                                .catch(() => {
                                    setFormLoading(false);
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'There was an error while fetching the data'
                                    })
                                })
                        }}>
                            Accept
                        </button>
                    </form>
                </Modal>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setModalOpened(true);
                    }}
                    action="#"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}
                >
                    <div>
                        <label className={'label'}>Link</label>
                        <input
                            onChange={(e) => setLink(e.target.value)}
                            type="url"
                            className="input"
                            placeholder={'Type ...'}
                            required
                        />
                    </div>
                    <div>
                        <label className={'label'}>Comments</label>
                        <textarea
                            onChange={(e) => {
                                setComments(e.target.value)

                                const splitLines = e.target.value.split(/\r?\n/);
                                setCommentQuantity(splitLines.length);
                            }}
                            type="text"
                            className="input"
                            placeholder={'Type ...'}
                            required
                        />
                    </div>
                    <p>Quantity : {commentQuantity}</p>
                    <button disabled={formLoading} className={'submit-btn'}>Submit</button>
                </form>
            </>
        );
    }
}