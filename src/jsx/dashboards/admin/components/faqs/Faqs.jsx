
import { Icon, loadIcon } from "@iconify/react"

import Table from "../../../../cutsome-components/table/Table"
import TableHeader from "../../../../cutsome-components/table/components/TableHeader"
import ItemHeader from "../../../../cutsome-components/table/components/ItemHeader"
import TableBody from "../../../../cutsome-components/table/components/TableBody"
import Row from "../../../../cutsome-components/table/components/Row"
import Property from "../../../../cutsome-components/table/components/Property"
import {useEffect, useState} from "react"
import Switch from "react-switch"
import SelectedFaqs from "./SelectedFaqs"
import { post, put, useFetch } from "../../../../../lib/useFetch"
import { API } from "../../../../../lib/envAccess"
import { showError, showSuccess } from "../../../../../lib/alertHandler"
import Swal from "sweetalert2"
import TablePaginations from "../../../../cutsome-components/table/components/TablePaginations"
import ResponsivePagination from "react-responsive-pagination"

export default function Faqs() {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, error, loading, setUrl, refresh] = useFetch(`https://utsmm.liara.run/api/faqs?page=${currentPage}`);


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
            inputPlaceholder: "Type your message here...",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: "green",
            denyButtonColor: "red"
        }).then(what => {
            if (what.isConfirmed) {
                const message = what.value;
                fetch(`https://utsmm.liara.run/api/admin/faqs/${faq.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept" : "application/json",
                        "X-Requested-With" : "XMLHttpRequest",
                        "Authorization" : `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                    },
                    body: JSON.stringify({
                        "question": faq.question,
                        "answer": message,
                        "tag": faq.tag,
                        "order": faq.order
                    })
                })
                    .then(resp => {
                        showSuccess(resp)
                        refresh();
                    })
                    .catch(err => {
                        const errors = err?.response?.data
                        showError(errors)
                    })
            }
        })
    }


    const deleteFaq = (faq) => {
        console.log({
            "Content-Type": "application/json",
            "Accept" : "application/json",
            "X-Requested-With" : "XMLHttpRequest",
            "Authorization" : `Bearer ${sessionStorage.getItem('token')}`
        })
        fetch(`https://utsmm.liara.run/api/admin/faqs/${faq.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json",
                "X-Requested-With" : "XMLHttpRequest",
                "Authorization" : `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        })
            .then(resp => {
                showSuccess(resp)
                refresh();
            })
            .catch(err => {
                const errors = err?.response?.data
                showError(errors)
            })
    }



    return (
        <div className="admin-panel-faqs">

            <SelectedFaqs />

            <Table columnsStyle={"6rem 10rem 15rem 10rem 1fr 5rem 10rem"} >
                <TableHeader>

                    {
                        headerList.map((record, index) => {
                            return <ItemHeader key={index}>
                                {record}
                            </ItemHeader>
                        })
                    }
                </TableHeader>
                <TableBody >
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
                                            <Icon icon="iconamoon:send-fill" />
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
                                            <Icon icon="iconamoon:send-fill" />
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
                <TablePaginations>
                    <ResponsivePagination
                        current={currentPage}
                        total={3}
                        onPageChange={(pageNumber) => {
                            setCurrentPage(pageNumber);
                            refresh();
                        }}
                    />
                </TablePaginations>
            </Table>




        </div>
    )
}
