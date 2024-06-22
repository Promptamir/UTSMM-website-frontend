import Table from "../../../../cutsome-components/table/Table";
import ItemHeader from "../../../../cutsome-components/table/components/ItemHeader";
import Property from "../../../../cutsome-components/table/components/Property";
import Row from "../../../../cutsome-components/table/components/Row";
import TableBody from "../../../../cutsome-components/table/components/TableBody";
import TableHeader from "../../../../cutsome-components/table/components/TableHeader";
import { useEffect, useState } from "react";
import { useFetch } from "../../../../../lib/useFetch"
import BE_URL, { API } from "../../../../../lib/envAccess";
import TablePaginations from "../../../../cutsome-components/table/components/TablePaginations";
import ResponsivePagination from 'react-responsive-pagination';






export default function Orders() {
    const headersList = [
        "Id",
        "Link",
        "Service",
        "Charge",
        "Created at",
        "Status",
        "Quantity"
    ]

    const orderListButtons = [
        "All",
        "Success",
        "Processing",
        "Errored",
        "Paused"
    ]

    const [ordersStatus, setOrdersStatus] = useState(orderListButtons[0])
    const [currentPage, setCurrentPage] = useState(1);
    const [data, error, loading, setUrl, refreshData, refetch] = useFetch(`${BE_URL}/orders?page=${currentPage}&statuses=${(ordersStatus === 'All') ? '' : ordersStatus.toLowerCase()}`)

    return (
        <div className="admin-panel-orders">
            <div className="intro">
                <h1>Recent Orders</h1>
                <div className="order-list">
                    {
                        orderListButtons.map((record, index) => {
                            return <button
                                key={index}
                                className={`status-${record === ordersStatus}`}
                                onClick={() => {
                                    setOrdersStatus(record);
                                    setUrl(`${BE_URL}/orders?page=${currentPage}&statuses=${(record === 'All') ? '' : record.toLowerCase()}`);
                                    refreshData();
                                }}
                            >
                                {record}
                            </button>
                        })
                    }
                </div>
            </div>
            <Table columnsStyle={"6rem 6rem 1.8fr 6rem 1fr 6rem 5rem 8rem"}>
                {
                    (loading)
                        ? <h1>Loading</h1>
                        : (error)
                            ? <h1>Error</h1>
                            : (
                                <>
                                    <TableHeader>
                                        {
                                            headersList.map((record, index) => {
                                                return <ItemHeader key={index}>
                                                    {record}
                                                </ItemHeader>
                                            })
                                        }
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            !loading ? data.entities.orders?.map((record, index) => {
                                                return <Row key={record.orderId} key={index}>
                                                    <Property>
                                                        <div className="property-header">
                                                            {headersList[0]}
                                                        </div>
                                                        <div className="property-body">
                                                            {record.id}
                                                        </div>
                                                    </Property>
                                                    <Property>
                                                        <div className="property-header">
                                                            {headersList[1]}
                                                        </div>
                                                        <div className="property-body">
                                                            {record.link}
                                                        </div>
                                                    </Property>
                                                    <Property>
                                                        <div className="property-header">
                                                            {headersList[2]}
                                                        </div>
                                                        <div className="property-body ">
                                                            {record.service.title}
                                                        </div>
                                                    </Property>
                                                    <Property>
                                                        <div className="property-header">
                                                            {headersList[3]}
                                                        </div>
                                                        <div className="property-body">
                                                            ${record.charge}
                                                        </div>
                                                    </Property>
                                                    <Property>
                                                        <div className="property-header">
                                                            {headersList[4]}
                                                        </div>
                                                        <div className="property-body">
                                                            {new Date(record.created_at).toLocaleDateString()}
                                                        </div>
                                                    </Property>
                                                    <Property>
                                                        <div className="property-header">
                                                            {headersList[5]}
                                                        </div>
                                                        <div className="property-body status-property">
                                                            {record.status}
                                                        </div>
                                                    </Property>
                                                    <Property>
                                                        <div className="property-header">
                                                            {headersList[6]}
                                                        </div>
                                                        <div className="property-body">
                                                            <p>${record.quantity}</p>
                                                        </div>
                                                    </Property>

                                                </Row>
                                            }) : <h1>Loading...</h1>
                                        }

                                    </TableBody>
                                    <TablePaginations>
                                        <ResponsivePagination
                                            current={currentPage}
                                            total={Math.round(data.entities.count/10)}
                                            onPageChange={(pageNumber) => {
                                                setCurrentPage(pageNumber);
                                                setUrl(`${BE_URL}/orders?page=${pageNumber}&statuses=${(ordersStatus === 'All') ? '' : ordersStatus.toLowerCase()}`);
                                                refreshData();
                                            }}
                                        />
                                    </TablePaginations>
                                </>
                            )
                }
            </Table>
        </div>
    )
}
