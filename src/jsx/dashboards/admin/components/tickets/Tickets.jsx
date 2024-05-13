import React from 'react'
import Table from '../../../../cutsome-components/table/Table'
import TableHeader from '../../../../cutsome-components/table/components/TableHeader'
import TableBody from '../../../../cutsome-components/table/components/TableBody'
import Row from '../../../../cutsome-components/table/components/Row'
import Property from '../../../../cutsome-components/table/components/Property'
import ItemHeader from '../../../../cutsome-components/table/components/ItemHeader'
import { useState } from 'react'
import { useEffect } from 'react'
import Switch from "react-switch"
import { Icon } from '@iconify/react'
import MaxLineText from '../../../../cutsome-components/Text/MaxLineText'
import { put, useFetch } from '../../../../../lib/useFetch'
import TablePaginations from "../../../../cutsome-components/table/components/TablePaginations";
import ResponsivePagination from 'react-responsive-pagination';
import Swal from "sweetalert2"
import { showError, showSuccess } from "../../../../../lib/alertHandler"
import { API } from '../../../../../lib/envAccess'


export default function Tickets() {
    const [currentPage, setCurrentPage] = useState(1);
    const [customLoading, setCustomLoading] = useState(false);
    const [data, error, loading, setUrl, refresh] = useFetch(`https://utsmm.liara.run/api/admin/tickets?page=${currentPage}`)


    const headers = [
        "ID",
        "anything_id",
        "Subject",
        "Answer",
        "Date",
        "Status",
    ]

    const orderListButtons = [
        "All Orders",
        "success",
        "on progress",
        "on error",
        "on pause"
    ]

    const [ordersStatus, setOrdersStatus] = useState(orderListButtons[0])

    const [sortedList, setSortedList] = useState([])

    useEffect(() => {

        if (ordersStatus === orderListButtons[0]) {
            setSortedList(data.orders)
            return
        }

        const temp = data?.orders?.filter(item => {
            return item.status === ordersStatus
        })

        setSortedList(temp)
    }, [ordersStatus, data])



    const handleAnswerClick = async (ticket) => {
        Swal.fire({
            input: "textarea",
            inputLabel: "Message",
            inputPlaceholder: "Type your message here...",
            inputAttributes: {
                "aria-label": "Type your message here"
            },
            showCancelButton: true,
            confirmButtonColor: "green",
            cancelButtonColor: "red"
        }).then(end => {
            if (end.isConfirmed) {
                const message = end.value;

                setCustomLoading(true);
                fetch(`https://utsmm.liara.run/api/admin/tickets/${ticket.id}/answers`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                        "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                    },
                    body: JSON.stringify({"answer" : message})
                })
                    .then((data) => data.json())
                    .then(resp => {
                        setCustomLoading(false);
                        console.log(resp)

                        if (resp.message === "Unauthenticated.") {
                            Swal.fire({
                                icon: 'error',
                                text: 'Unauthenticated.'
                            })
                        } else {
                            Swal.fire({
                                icon: 'success',
                                text: resp.message
                            })

                            refresh();
                        }
                    })
                    .catch(() => {
                        setCustomLoading(false);
                        Swal.fire({
                           icon: 'error',
                           text: 'There was an error while fetching the data'
                        })
                    })
            }
        })

    }

    const handleOnToggleClick = (ticket, state) => {
        setCustomLoading(true);
        fetch(`https://utsmm.liara.run/api/tickets/${ticket.id}/seen-status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        })
            .then((data) => data.json())
            .then(resp => {
                setCustomLoading(false);
                console.log(resp)

                if (resp.message === "Unauthenticated.") {
                    Swal.fire({
                        icon: 'error',
                        text: 'Unauthenticated.'
                    })
                } else {
                    Swal.fire({
                        icon: 'success',
                        text: 'The ticket is seen now'
                    })
                    refresh();
                }
            })
            .catch(() => {
                setCustomLoading(true);
                Swal.fire({
                    icon: 'error',
                    text: 'There was an error while fetching the data'
                })
            })
    }

    return (
        <div className='admin-panel-tickets relative'>
            <div className={'loading'} data-loading={customLoading}>
                <Icon icon={'eos-icons:loading'} width={40} href={40}/>
            </div>
            <Table columnsStyle={"6rem 6rem 6rem  1fr 15rem 5rem 8rem"}>
                <TableHeader>
                    {
                        headers.map((record, index) => {
                            return <ItemHeader key={index}>
                                {record}
                            </ItemHeader>
                        })
                    }

                </TableHeader>
                <TableBody>
                    {
                        (loading)
                            ? <h1>Loading</h1>
                            : (error)
                                ? <h1>An error happened</h1>
                                : data.entities.tickets.map((ticket, index) => (
                                    <Row key={index}>
                                        <Property>
                                            <div className="property-header">
                                                {headers[0]}
                                            </div>
                                            <div className="property-body">
                                                {ticket.id}
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headers[1]}
                                            </div>
                                            <div className="property-body">
                                                {ticket.anything_id}
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headers[2]}
                                            </div>
                                            <div className="property-body">
                                                {ticket.subject}
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headers[3]}
                                            </div>
                                            <div className="property-body">
                                                <MaxLineText
                                                    maxLine={6}
                                                    content={ticket.answer}/>
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headers[4]}
                                            </div>
                                            <div className="property-body">
                                                {new Date(ticket.created_at).toLocaleDateString()}
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headers[5]}
                                            </div>
                                            <div className="property-body">
                                                <Switch
                                                    onChange={(state) => {
                                                        handleOnToggleClick(ticket, state)
                                                    }}
                                                    checked={ticket.seen === 1}/>
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headers[6]}
                                            </div>
                                            <div className="property-body controlls-property">
                                                <button
                                                    onClick={() => {
                                                        handleAnswerClick(ticket)
                                                    }}>
                                                    <span>Answer</span>
                                                    <Icon icon="iconamoon:send-fill"/>
                                                </button>
                                            </div>
                                        </Property>
                                    </Row>
                                ))
                    }
                </TableBody>
                {
                    (loading)
                        ? <h1>Loading...</h1>
                        : (error)
                            ? <h1>Error</h1>
                            : (data.entities.count > 15)
                                ? (
                                    <TablePaginations>
                                        <ResponsivePagination
                                            current={currentPage}
                                            total={Math.round(data.entities.count / 10)}
                                            onPageChange={(pageNumber) => {
                                                setCurrentPage(pageNumber);
                                                setUrl(`https://utsmm.liara.run/api/admin/tickets?page=${pageNumber}`);
                                                refresh();
                                            }}
                                        />
                                    </TablePaginations>
                                ) : false
                }
            </Table>
        </div>
    )
}
