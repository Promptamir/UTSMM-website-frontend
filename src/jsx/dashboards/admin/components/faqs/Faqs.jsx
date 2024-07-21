
import { Icon, loadIcon } from "@iconify/react"

import Table from "../../../../cutsome-components/table/Table"
import TableHeader from "../../../../cutsome-components/table/components/TableHeader"
import ItemHeader from "../../../../cutsome-components/table/components/ItemHeader"
import TableBody from "../../../../cutsome-components/table/components/TableBody"
import Row from "../../../../cutsome-components/table/components/Row"
import Property from "../../../../cutsome-components/table/components/Property"
import {useEffect, useState} from "react"
import SelectedFaqs from "./SelectedFaqs"
import { post, put, useFetch } from "../../../../../lib/useFetch"
import BE_URL, { API } from "../../../../../lib/envAccess"
import { showError, showSuccess } from "../../../../../lib/alertHandler"
import Swal from "sweetalert2"

export default function Faqs() {
    const [data, error, loading, setUrl, refresh] = useFetch(`${BE_URL}/admin/faqs`);
    const [customLoading, setCustomLoading] = useState(false);

    const headerList = [
        "ID",
        "Tag",
        "Question",
        "Answer",
        "Controlls"
    ]

    const replyFaq = (faq) => {
        Swal.fire({
            input: "textarea",
            inputLabel: "Message",
            inputAttributes: {minLength: 10},
            inputPlaceholder: "Type your message here...",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: "green",
            denyButtonColor: "red"
        }).then(what => {
            if (what.isConfirmed) {
                setCustomLoading(true);
                const message = what.value;
                fetch(`${BE_URL}/admin/faqs/${faq.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept" : "application/json",
                        "X-Requested-With" : "XMLHttpRequest",
                        "Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                    },
                    body: JSON.stringify({
                        "question": faq.question,
                        "answer": message,
                        "tag": faq.tag,
                        "order": faq.order
                    })
                })
                    .then((data) => data.json())
                    .then(resp => {
                        console.log(resp);
                        setCustomLoading(false);
                        if (resp.message === "Unauthenticated.") {
                            Swal.fire({
                                icon: 'error',
                                text: 'Unauthenticated.'
                            });
                        } else {
                            Swal.fire({
                                icon: 'success',
                                text: resp.message
                            });

                            refresh();
                        }
                    })
                    .catch(() => {
                        setCustomLoading(false);
                        Swal.fire({
                            icon: 'error',
                            text: 'There was a problem fetching the data'
                        });
                    })
            }
        })
    }


    const deleteFaq = (faq) => {
        setCustomLoading(true);
        fetch(`${BE_URL}/admin/faqs/${faq.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json",
                "X-Requested-With" : "XMLHttpRequest",
                "Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
            .then((resp) => resp.json())
            .then(resp => {
                if (resp.message === "Unauthenticated.") {
                    Swal.fire({
                        icon: 'error',
                        text: 'Unauthenticated.'
                    });
                } else {
                    Swal.fire({
                        icon: 'success',
                        text: resp.message
                    });
                    refresh();
                }
                setCustomLoading(false);
            })
            .catch(err => {
                const errors = err?.response?.data
                showError(errors)
                setCustomLoading(false);
            })
    }



    return (
        <div className="admin-panel-faqs">

            <SelectedFaqs setLoading={setCustomLoading} refresh={refresh}/>

            <div style={{position: 'relative'}}>
                <div className={'loading'} data-loading={customLoading}>
                    <Icon icon={'eos-icons:loading'} width={40} href={40}/>
                </div>
                <Table columnsStyle={"6rem 10rem 15rem 10rem 1fr 5rem 10rem"}>
                    <TableHeader>
                        {
                            headerList.map((record, index) => {
                                return <ItemHeader key={index}>
                                    {record}
                                </ItemHeader>
                            })
                        }
                    </TableHeader>
                    <TableBody>
                        {
                            (!loading && !error) ? data.entities.faqs.map(faq => {
                                    return <Row key={faq.id}>
                                        <Property>
                                            <div className="property-header">
                                                {headerList[0]}
                                            </div>
                                            <div className="property-body">
                                                {faq.id}
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headerList[1]}
                                            </div>
                                            <div className="property-body">
                                                {faq.tag}
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headerList[2]}
                                            </div>
                                            <div className="property-body">
                                                {faq.question}
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headerList[3]}
                                            </div>
                                            <div className="property-body">
                                                {faq.answer}
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headerList[4]}
                                            </div>
                                            <div className="property-body buttons">
                                                <button
                                                    className="reply-email"
                                                    onClick={() => replyFaq(faq)}>
                                            <span>
                                                Reply
                                            </span>
                                                    <Icon icon="iconamoon:send-fill"/>
                                                </button>
                                                <button
                                                    className="reply-phone"
                                                    onClick={() => {
                                                        deleteFaq(faq)
                                                    }}
                                                >
                                            <span>
                                                Delete
                                            </span>
                                                    <Icon icon="iconamoon:send-fill"/>
                                                </button>
                                            </div>
                                        </Property>
                                    </Row>
                                }) :
                                (loading)
                                    ? <h1>Loading...</h1>
                                    : (error)
                                        ? <h1>Error</h1>
                                        : false
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
