import React from 'react'
import Table from '../../../../cutsome-components/table/Table'
import TableHeader from '../../../../cutsome-components/table/components/TableHeader'
import TableBody from '../../../../cutsome-components/table/components/TableBody'
import Row from '../../../../cutsome-components/table/components/Row'
import Property from '../../../../cutsome-components/table/components/Property'
import ItemHeader from '../../../../cutsome-components/table/components/ItemHeader'
import {useState} from 'react'
import {useEffect} from 'react'
import Switch from "react-switch"
import {Icon} from '@iconify/react'
import MaxLineText from '../../../../cutsome-components/Text/MaxLineText'
import {put, useFetch} from '../../../../../lib/useFetch'
import TablePaginations from "../../../../cutsome-components/table/components/TablePaginations";
import ResponsivePagination from 'react-responsive-pagination';
import Swal from "sweetalert2"
import {showError, showSuccess} from "../../../../../lib/alertHandler"
import BE_URL, {API} from '../../../../../lib/envAccess'


export default function ExternalReviews() {
    const [currentPage, setCurrentPage] = useState(1);
    const [customLoading, setCustomLoading] = useState(false);
    const [data, error, loading, setUrl, refresh] = useFetch(`${BE_URL}/admin/external-reviews?page=${currentPage}`)

    const headers = [
        "ID",
        "Image",
        "Status",
        "Type",
        "Free credit",
        "Date",
        "Confirmation"
    ]

    const handleOnToggleClick = (review, state) => {
        setCustomLoading(true);
        fetch(`${BE_URL}/admin/external-reviews/${review.id}/confirmation-status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            },
            body: JSON.stringify({
                "confirmation_status": (state) ? 1 : -1
            })
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

    return (
        <div className='admin-panel-tickets relative'>
            <div className={'loading'} data-loading={customLoading}>
                <Icon icon={'eos-icons:loading'} width={40} href={40}/>
            </div>
            <Table columnsStyle={"6rem 6rem 6rem  1fr 15rem 5rem 8rem"}>
                {
                    (loading)
                        ? <h1>Loading</h1>
                        : (error)
                            ? <h1>Error</h1>
                            : (
                                <>
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
                                                    : data.entities.reviews.map((review, index) => (
                                                        <Row key={index}>
                                                            <Property>
                                                                <div className="property-header">
                                                                    {headers[0]}
                                                                </div>
                                                                <div className="property-body">
                                                                    {review.id}
                                                                </div>
                                                            </Property>
                                                            <Property>
                                                                <div className="property-header">
                                                                    {headers[1]}
                                                                </div>
                                                                <div className="property-body">
                                                                    <img style={{
                                                                        width: '50px',
                                                                        height: '50px',
                                                                        aspectRatio: '1/1',
                                                                        borderRadius: '100%'
                                                                    }} src={review.image} alt=""/>
                                                                </div>
                                                            </Property>
                                                            <Property>
                                                                <div className="property-header">
                                                                    {headers[2]}
                                                                </div>
                                                                <div className="property-body">
                                                                    {review.status}
                                                                </div>
                                                            </Property>
                                                            <Property>
                                                                <div className="property-header">
                                                                    {headers[3]}
                                                                </div>
                                                                <div className="property-body">
                                                                    {review.type}
                                                                </div>
                                                            </Property>
                                                            <Property>
                                                                <div className="property-header">
                                                                    {headers[4]}
                                                                </div>
                                                                <div className="property-body">
                                                                    {review.free_credit}
                                                                </div>
                                                            </Property>
                                                            <Property>
                                                                <div className="property-header">
                                                                    {headers[5]}
                                                                </div>
                                                                <div className="property-body controlls-property">
                                                                    {new Date(review.created_at).toLocaleDateString()}
                                                                </div>
                                                            </Property>
                                                            <Property>
                                                                <div className="property-header">
                                                                    {headers[6]}
                                                                </div>
                                                                <div className="property-body">
                                                                    <Switch
                                                                        onChange={(state) => {handleOnToggleClick(review, state)}}
                                                                        checked={review.status === "1"}
                                                                    />
                                                                </div>
                                                            </Property>
                                                        </Row>
                                                    ))
                                        }
                                    </TableBody>
                                </>
                            )
                }
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
                                                setUrl(`${BE_URL}/admin/external-reviews?page=${pageNumber}`);
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
