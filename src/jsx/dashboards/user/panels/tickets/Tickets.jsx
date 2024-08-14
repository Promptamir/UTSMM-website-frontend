import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import AddNewTicket from './componetns/AddNewTicket'
import TicketHistory from './componetns/TicketHistory'
import {useFetch} from "../../../../../lib/useFetch";
import BE_URL from "../../../../../lib/envAccess";
import UserDashboardAcardion from "../../../../primaries/userDashboardAcardion";

const Tickets = () => {
    const [ticketState, setTicketState] = useState(false)
    const [data, error, loading, setUrl, refreshData, refetch] = useFetch(`${BE_URL}/ticket-faqs`)

    return (
        <section className='panel-tickets'>
            <div className="left">
                <div className="state">
                    <button
                        className={`${!ticketState}`}
                        onClick={() => { setTicketState(false) }}
                    >
                        <Icon icon="mdi:add-bold" />
                        <span>Add New Tickets</span>
                    </button>
                    <button
                        className={`${ticketState}`}
                        onClick={() => { setTicketState(true) }}
                    >
                        <Icon icon="ep:ticket" />
                        <span>Ticket History</span>
                    </button>
                </div>
                <div className="ticket-state-content">
                    {!ticketState ? <AddNewTicket /> : <TicketHistory />}
                </div>
            </div>
            {
                (loading)
                    ? <h1>Loading</h1>
                    : (error)
                        ? <h1>There was an error while fetching the data</h1>
                        : (
                            <div className={'acardion-holder'}>
                                <h1>Ticket Related Faqs</h1>
                                {
                                    data.entities.faqs.map((item, index) => (
                                        <UserDashboardAcardion
                                            key={index}
                                            answer={item.answer}
                                            question={item.question}
                                        />
                                    ))
                                }
                            </div>
                        )
            }
        </section >
    )
}

export default Tickets