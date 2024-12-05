import React from 'react'
import Table from '../../../../cutsome-components/table/Table'
import TableHeader from '../../../../cutsome-components/table/components/TableHeader'
import TableBody from '../../../../cutsome-components/table/components/TableBody'
import Row from '../../../../cutsome-components/table/components/Row'
import Property from '../../../../cutsome-components/table/components/Property'
import ItemHeader from '../../../../cutsome-components/table/components/ItemHeader'
import { useState } from 'react'
import Switch from "react-switch"
import { Icon } from '@iconify/react'
import { useFetch } from '../../../../../lib/useFetch'
import Swal from "sweetalert2"
import BE_URL from '../../../../../lib/envAccess'
import MessageTicketsPopUp from "../../../../pop-ups/messageTicketsPopUp";
import Pagination from "../../../../primaries/pagination";
import HandleFetchError from "../../../../../lib/handleFetchError";


export default function Tickets() {
    const [customLoading, setCustomLoading] = useState(false);
    const [data, error, loading, setUrl, refresh, refetch] = useFetch(`${BE_URL}/admin/tickets?page=1`)

    const [answerModalOpened, setAnswerModalOpened] = useState(false);
    const [answerModalID, setAnswerModalID] = useState(undefined);

    const headers = [
        "ID",
        "anything_id",
        "Subject",
        "Date",
        "Answer",
        "Open"
    ]

    return (
        <div className='admin-panel-tickets relative'>
            <MessageTicketsPopUp
                setCustomLoading={setCustomLoading}
                refresh={refresh}
                id={answerModalID}
                isOpened={answerModalOpened}
                closeFn={() => setAnswerModalOpened(false)}
            />
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
                                ? <h1>There was an error while fetching the data</h1>
                                : data.entities.tickets.map((item, index) => (<Row key={index}>
                                            <Property>
                                                <div className="property-header">
                                                    {headers[0]}
                                                </div>
                                                <div className="property-body">
                                                    {item.id}
                                                </div>
                                            </Property>
                                            <Property>
                                                <div className="property-header">
                                                    {headers[1]}
                                                </div>
                                                <div className="property-body">
                                                    {item.anything_id}
                                                </div>
                                            </Property>
                                            <Property>
                                                <div className="property-header">
                                                    {headers[2]}
                                                </div>
                                                <div className="property-body">
                                                    {item.subject}
                                                </div>
                                            </Property>
                                            <Property>
                                                <div className="property-header">
                                                    {headers[3]}
                                                </div>
                                                <div className="property-body">
                                                    {new Date(item.created_at).toISOString().split('T')[0]}
                                                </div>
                                            </Property>
                                            <Property>
                                                <div className="property-header">
                                                    {headers[5]}
                                                </div>
                                                <div className="property-body">
                                                    <button
                                                        style={{
                                                            display: 'block',
                                                            borderRadius: '45rem',
                                                            backgroundColor: 'orange',
                                                            color: 'white',
                                                            paddingBlock: '10px',
                                                            paddingInline: '15px',
                                                        }}
                                                        onClick={() => {
                                                            setAnswerModalOpened(true);
                                                            setAnswerModalID(item.id);
                                                        }}>
                                                        Answer
                                                    </button>
                                                </div>
                                            </Property>
                                            <Property>
                                                <div className="property-header">
                                                    {headers[6]}
                                                </div>
                                                <div className="property-body">
                                                    <Switch
                                                        checked={(item.is_open === "1")}
                                                        onChange={(state) => {
                                                            setCustomLoading(true);
                                                            fetch(`${BE_URL}/admin/tickets/${item.id}/open-status`, {
                                                                method: "PATCH",
                                                                headers: {
                                                                    "Content-Type": "application/json",
                                                                    "Accept" : "application/json",
                                                                    "X-Requested-With" : "XMLHttpRequest",
                                                                    "Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                                                                },
                                                                body: JSON.stringify({"open_status": (state) ? 1 : 0})
                                                            })
                                                                .then((data) => data.json())
                                                                .then((data) => {
                                                                    setCustomLoading(false);
                                                                    HandleFetchError({
                                                                        data: data,
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
                                                                    setCustomLoading(false);
                                                                })
                                                        }}
                                                    />
                                                </div>
                                            </Property>
                                        </Row>))
                    }
                </TableBody>
                <Pagination
                    error={error}
                    refetch={refetch}
                    setUrl={setUrl}
                    count={data?.entities?.count}
                    loading={loading}
                    apiEndpoint={'admin/tickets'}
                />
            </Table>
        </div>
    )
}
