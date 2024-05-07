import { Icon } from "@iconify/react"
import { useFetch } from "../../../../../../lib/useFetch";
import { API } from "../../../../../../lib/envAccess";
import {useEffect} from "react";

const TicketHistory = () => {


    const [tickets, error, loading] = useFetch('https://utsmm.liara.run/api/tickets')

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

    return (
        <div className="ticket-history">
            {
                (loading)
                    ? <Icon icon={'eos-icons:loading'} width={40} href={40} />
                    : (error)
                        ? <h1>There was an error.</h1>
                        : (tickets.entities.tickets.length === 0)
                            ? <h1>There is no ticket</h1>
                            : (
                                tickets.entities.tickets.map((item, index) => (
                                    <div className={`item ${(item.seen === 1) ? 'seen' : 'pending'}`} key={index}>
                                        <div className="item-header">
                                            <div className="status">
                                                {
                                                    (item.seen === 1)
                                                        ? <Icon icon="quill:checkmark-double" />
                                                        : <Icon icon="uil:clock" />
                                                }
                                            </div>
                                        </div>
                                        <div className="item-body">
                                            <div className="subject row">
                                                <Icon icon="fluent:document-header-24-filled"/>
                                                <span> {item.subject}</span>
                                            </div>
                                            <div className="last-update row">
                                                <Icon icon="material-symbols:date-range"/>
                                                <span>{new Date(item.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
            }
        </div>
    )
}

export default TicketHistory