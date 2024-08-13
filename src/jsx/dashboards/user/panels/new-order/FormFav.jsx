// Importing part
import {useState} from "react";
import BE_URL from "../../../../../lib/envAccess";
import Swal from "sweetalert2";

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

    // Conditional rendering
    if (type.toString().toLowerCase() === "default") {
        return (
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    setFormLoading(true);
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
                            }
                        })
                        .catch(() => {
                            setFormLoading(false);
                            Swal.fire({
                                icon: 'error',
                                title: 'There was an error while fetching the data'
                            })
                        })
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
        );
    }
    else if (type.toString().toLowerCase() === "seo") {
        return (
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    setFormLoading(true);
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
                            "keywords" : keywords
                        })
                    })
                        .then((data) => data.json())
                        .then((data) => {
                            setFormLoading(false);
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
                            }
                        })
                        .catch(() => {
                            setFormLoading(false);
                            Swal.fire({
                                icon: 'error',
                                title: 'There was an error while fetching the data'
                            })
                        })
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
        );
    }
    else if (type.toString().toLowerCase() === "poll") {
        return (
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    setFormLoading(true);
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
                            "answer_number" : answerNumber
                        })
                    })
                        .then((data) => data.json())
                        .then((data) => {
                            setFormLoading(false);
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
                            }
                        })
                        .catch(() => {
                            setFormLoading(false);
                            Swal.fire({
                                icon: 'error',
                                title: 'There was an error while fetching the data'
                            })
                        })
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
        );
    }
    else if (type.toString().toLowerCase() === "package") {
        return (
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    setFormLoading(true);
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
                            }
                        })
                        .catch(() => {
                            setFormLoading(false);
                            Swal.fire({
                                icon: 'error',
                                title: 'There was an error while fetching the data'
                            })
                        })
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
        );
    }
    else if (type.toString().toLowerCase() === "comment likes") {
        return (
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    setFormLoading(true);
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
                            "username" : userName
                        })
                    })
                        .then((data) => data.json())
                        .then((data) => {
                            setFormLoading(false);
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
                            }
                        })
                        .catch(() => {
                            setFormLoading(false);
                            Swal.fire({
                                icon: 'error',
                                title: 'There was an error while fetching the data'
                            })
                        })
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
        );
    }
    else if (type.toString().toLowerCase() === "custom comments") {
        return (
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    setFormLoading(true);
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
                            "comments" : comments
                        })
                    })
                        .then((data) => data.json())
                        .then((data) => {
                            setFormLoading(false);
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
                            }
                        })
                        .catch(() => {
                            setFormLoading(false);
                            Swal.fire({
                                icon: 'error',
                                title: 'There was an error while fetching the data'
                            })
                        })
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
                    <input
                        onChange={(e) => setComments(e.target.value)}
                        type="text"
                        className="input"
                        placeholder={'Type ...'}
                        required
                    />
                </div>
                <button disabled={formLoading} className={'submit-btn'}>Submit</button>
            </form>
        );
    }
    else if (type.toString().toLowerCase() === "mentions hashtag") {
        return (
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    setFormLoading(true);
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
                            "quantity" : quantity,
                            "hashtag": hashtag
                        })
                    })
                        .then((data) => data.json())
                        .then((data) => {
                            setFormLoading(false);
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
                            }
                        })
                        .catch(() => {
                            setFormLoading(false);
                            Swal.fire({
                                icon: 'error',
                                title: 'There was an error while fetching the data'
                            })
                        })
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
        );
    }
    else if (type.toString().toLowerCase() === "custom comments package") {
        return (
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    setFormLoading(true);
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
                            "comments" : comments
                        })
                    })
                        .then((data) => data.json())
                        .then((data) => {
                            setFormLoading(false);
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
                            }
                        })
                        .catch(() => {
                            setFormLoading(false);
                            Swal.fire({
                                icon: 'error',
                                title: 'There was an error while fetching the data'
                            })
                        })
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
                    <input
                        onChange={(e) => setComments(e.target.value)}
                        type="text"
                        className="input"
                        placeholder={'Type ...'}
                        required
                    />
                </div>
                <button disabled={formLoading} className={'submit-btn'}>Submit</button>
            </form>
        );
    }
}