import { Icon } from "@iconify/react"
import { useFetch } from "../../../../../../lib/useFetch";
import { API } from "../../../../../../lib/envAccess";

const TicketHistory = () => {


    const [tickets, error, loading] = useFetch('https://utsmm.liara.run/api/tickets')



    const getIcon = (status) => {
        switch (status) {
            case "Pending": return <Icon icon="material-symbols:pending-actions" />
            case "Resolved": return <Icon icon="icon-park-solid:success" />
            case "Submited": return <Icon icon="carbon:in-progress" />
            case "Rejected": return <Icon icon="material-symbols:dangerous-rounded" />
        }
    }



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

            {tickets.map((record => {
                return <div className={`item ${record.status}`}>
                    <div className="item-header">
                        <div className="status">
                            {getIcon(record.status)}
                        </div>
                    </div>
                    <div className="item-body">
                        <div className="subject row">
                            <Icon icon="fluent:document-header-24-filled" />
                            <span> {record.subject}</span>
                        </div>
                        <div className="last-update row">
                            <Icon icon="mingcute:time-fill" />
                            <span>{getTime(record.updatedAt)}</span>
                        </div>
                        <div className="last-update row">
                            <Icon icon="material-symbols:date-range" />
                            <span>{getDate(record.updatedAt)}</span>
                        </div>
                    </div>
                    <div className="item-buttons">
                        <button>View</button>
                    </div>
                </div>
            }))}
        </div>
    )
}

export default TicketHistory