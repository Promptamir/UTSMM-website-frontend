import { Icon } from "@iconify/react"
import { useFetch } from "../../../../../../lib/useFetch";
import BE_URL, { API } from "../../../../../../lib/envAccess";
import {useEffect, useRef, useState} from "react";
import Modal from "../../../../../pop-ups/modal";
import Swal from "sweetalert2";
import HandleFetchError from "../../../../../../lib/handleFetchError";

const TicketHistory = () => {


    const [tickets, error, loading] = useFetch(`${BE_URL}/tickets`)
    const getTime = (time) => {
        const timeData = new Date(time)
        return `${timeData.getHours()} : ${timeData.getMinutes()} `
    }

    const getDate = (date) => {
        const timeData = new Date(date)
        return `${timeData.getFullYear()} / ${timeData.getMonth()} / ${timeData.getDate()} `
    }

    // Creating inner component of ticket items
    const TicketItem = ({seen, created_at, subject, id}) => {
        // Defining states
        const [modalOpened, setModalOpened] = useState(false);
        const [data, setData] = useState({});
        const [fetchLoading, setFetchLoading] = useState(true);
        const [fetchError, setFetchError] = useState('');
        const [count, setCount] = useState(0);

        // Defining ref
        const fileInputRef = useRef(null);

        // Using useEffect hook to fetch data of ticket
        useEffect(() => {
            if (modalOpened) {
                setFetchLoading(true);
                fetch(`${BE_URL}/tickets/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                    }
                })
                    .then((data) => data.json())
                    .then(resp => {
                        setFetchLoading(false);

                        HandleFetchError({
                            data: resp,
                            lineBreak: false,
                            callbackSuccess: () => setData(resp.entities.ticket),
                            callbackError: (message) => Swal.fire({
                                icon: 'error',
                                text: message
                            })
                        })
                    })
                    .catch(() => {
                        setFetchLoading(true);
                        setFetchError('There was an error while fetching the data')
                    })
            }
        }, [modalOpened, count]);

        // Defining states of new message
        const [imageFile, setImageFile] = useState();
        const [message, setMessage] = useState();

        // Defining a function to handle on change of file input
        const handleFileChange = (e) => {
            const file = e.target.files[0]

            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                const result = e.target.result
            }

            fileReader.readAsDataURL(file);
            setImageFile(e.target.files[0]);
        }

        // Defining a function to add to count
        const refetch = () => setCount(prev => prev + 1);

        // Returning JSX
        return (
            <div className={`item ${(seen === 1) ? 'seen' : 'pending'}`}>
                <Modal closeFn={() => setModalOpened(false)} title={'Ticket Info'} isOpened={modalOpened}>
                    {
                        (fetchLoading)
                            ? <Icon icon={'eos-icons:loading'} width={40} href={40}/>
                            : (fetchError)
                                ? <h1>{fetchError}</h1>
                                : (
                                    <div className={'table_2'} style={{marginBottom: '200px'}}>
                                        <div className={'col'}>ID</div>
                                        <div className={'col'}>{data.id}</div>
                                        <div className={'col'}>Subject</div>
                                        <div className={'col'}>{data.subject}</div>
                                        <div className={'col'}>Anything ID</div>
                                        <div className={'col'}>{data.anything_id}</div>
                                        <div className={'col'}>Created At</div>
                                        <div className={'col'}>{new Date(data.created_at).toLocaleDateString()}</div>
                                        {
                                            (data.messages.length === 0)
                                                ? <h1>There is no message to show</h1>
                                                : (
                                                    <div className={'ticket-messages-all-holder'}>
                                                        <h1 className={'tickets-messages-lable'}>Messages:</h1>
                                                        <div className={'ticket-messages-holder'}>
                                                            {
                                                                data.messages.map((item, index) => (
                                                                    <div key={index} className={'message'}>
                                                                        <div className={'message-content-holder'}>
                                                                            <div className={`message-content ${(item.is_answer === "1") ? 'admin' : 'user'}`}>
                                                                                <p className={'message-text'}>{item.content}</p>
                                                                                <span className={'message-date'}>{new Date(item.created_at).toLocaleDateString()}</span>
                                                                            </div>
                                                                            {
                                                                                (item.attachment)
                                                                                    ? (
                                                                                        <div className={`attachment-holder ${(item.is_answer === "1") ? 'admin' : 'user'}`}>
                                                                                            <div className={'attachment'}>
                                                                                                <img
                                                                                                    src={item.attachment.attachment_url}
                                                                                                    alt={item.attachment.attachment_name}
                                                                                                />
                                                                                                <div className={'attachment-name'}>{item.attachment.attachment_name}</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    ) : false
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                        }
                                    </div>
                                )
                    }
                    <form onSubmit={(e) => {
                        e.preventDefault();

                        const myHeaders = new Headers();
                        myHeaders.append("Accept", "application/json");
                        myHeaders.append("X-Requested-With", "XMLHttpRequest");
                        myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('token'))}`);

                        const formdata = new FormData();
                        formdata.append("content", message);
                        formdata.append("attachment", imageFile, "[PROXY]");

                        const requestOptions = {
                            method: "POST",
                            headers: myHeaders,
                            body: formdata,
                            redirect: "follow"
                        };

                        fetch(`${BE_URL}/tickets/${id}/messages`, requestOptions)
                            .then((response) => response.json())
                            .then((result) => {
                                HandleFetchError({
                                    data: result,
                                    lineBreak: false,
                                    callbackSuccess: (message) => {
                                        Swal.fire({icon: 'success', text: message})
                                        refetch();
                                    },
                                    callbackError: (message) => Swal.fire({icon: 'error', text: message})
                                })
                            })
                            .catch(() => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'There was an error while fetching the data'
                                })
                            })
                    }} className={'send-message-holder'}>
                        <div className={'message'}>
                            <input onChange={(e) => setMessage(e.target.value)} placeholder={'Type Something here'} type="text" className={'input'} required                                 minLength={10} maxLength={1500}/>
                            <button onClick={() => fileInputRef.current.click()} type={'button'} className={'attachment-button'}>
                                <Icon icon="gridicons:attachment" width={20} height={20}/>
                            </button>
                            <input
                                required
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{display: 'none'}}
                                onChange={handleFileChange}
                            />
                        </div>
                        <button className={'send-btn'} type={'submit'}>
                            <Icon icon="material-symbols:send" width={20} height={20}/>
                        </button>
                    </form>
                </Modal>
                <div className="item-header">
                    <div className="status">
                        {
                            (seen === 1)
                                ? <Icon icon="quill:checkmark-double"/>
                                : <Icon icon="uil:clock"/>
                        }
                    </div>
                </div>
                <div className="item-body">
                    <div className="subject row">
                        <Icon icon="fluent:document-header-24-filled"/>
                        <span> {subject}</span>
                    </div>
                    <div className="last-update row">
                        <Icon icon="material-symbols:date-range"/>
                        <span>{new Date(created_at).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className="item-buttons">
                    <button onClick={() => setModalOpened(prevState => !prevState)}>View</button>
                </div>
            </div>
        );
    }

    return (
        <div className="ticket-history">
            {
                (loading)
                    ? <Icon icon={'eos-icons:loading'} width={40} href={40}/>
                    : (error)
                        ? <h1>There was an error.</h1>
                        : (tickets.entities.tickets.length === 0)
                            ? <h1>There is no ticket</h1>
                            : (
                                tickets.entities.tickets.map((item, index) => (
                                    <TicketItem
                                        key={index}
                                        id={item.id}
                                        created_at={item.created_at}
                                        subject={item.subject}
                                        seen={item.seen}
                                    />
                                ))
                            )
            }
        </div>
    )
}

export default TicketHistory