import { Icon } from "@iconify/react"
import { useFetch } from "../../../../../../lib/useFetch";
import BE_URL, { API } from "../../../../../../lib/envAccess";
import {useEffect, useState} from "react";
import Modal from "../../../../../pop-ups/modal";
import Swal from "sweetalert2";

const TicketHistory = () => {


    const [tickets, error, loading] = useFetch(`${BE_URL}/tickets`)

    useEffect(() => {
        if (!loading) {
            console.log(tickets)
        }
    }, [loading]);


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

        // Using useEffect hook to fetch data of ticket
        useEffect(() => {
            if (modalOpened) {
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

                        if (resp.message === "Unauthenticated.") {setFetchError('Unauthenticated.')}
                        else {setData(resp.entities.ticket);}
                    })
                    .catch(() => {
                        setFetchLoading(true);
                        setFetchError('There was an error while fetching the data')
                    })
            }
        }, [modalOpened]);

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
                                    <div className={'table_2'}>
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
                                                                            <div className={`message-content ${(item.is_answer) ? 'admin' : 'user'}`}>
                                                                                <p className={'message-text'}>{item.content}</p>
                                                                                <span className={'message-date'}>{new Date(item.created_at).toLocaleDateString()}</span>
                                                                            </div>
                                                                            {
                                                                                (item.attachment)
                                                                                    ? (
                                                                                        <div className={`attachment-holder ${(item.is_answer) ? 'admin' : 'user'}`}>
                                                                                            <div className={'attachment'} style={{background: `url(${item.attachment.attachment_url})`}}>
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