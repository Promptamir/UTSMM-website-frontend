import Table from "../../../../cutsome-components/table/Table";
import ItemHeader from "../../../../cutsome-components/table/components/ItemHeader";
import Property from "../../../../cutsome-components/table/components/Property";
import Row from "../../../../cutsome-components/table/components/Row";
import TableBody from "../../../../cutsome-components/table/components/TableBody";
import TableHeader from "../../../../cutsome-components/table/components/TableHeader";
import {useEffect, useState} from "react";
import {useFetch} from "../../../../../lib/useFetch"
import TablePaginations from "../../../../cutsome-components/table/components/TablePaginations";
import ResponsivePagination from 'react-responsive-pagination';
import {Icon} from "@iconify/react";
import Switch from "react-switch";
import Swal from "sweetalert2";
import BE_URL from "../../../../../lib/envAccess";


export default function CommentPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, error, loading, setUrl, refresh] = useFetch(`${BE_URL}/admin/comments?page=${currentPage}`);
    const [customLoading, setCustomLoading] = useState(false);

    const headersList = [
        "id",
        "content",
        "stars",
        "status",
        "Showing",
        "Created at",
        "Delete"
    ]

    const orderListButtons = [
        "All",
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

    const onPublishedClick = (record, published) => {
        setCustomLoading(true);
        fetch(`${BE_URL}/admin/comments/${record.id}/confirmation-status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            },
            body: JSON.stringify({
                "confirmation_status": (published) ? 1 : 0
            })
        })
            .then((data) => data.json())
            .then(resp => {
                setCustomLoading(false);
                if (resp.message === "Unauthenticated.") {
                    Swal.fire({
                        icon: 'error',
                        text: 'Unauthenticated.'
                    });
                } else {
                    Swal.fire({
                        icon: 'success',
                        text: `The Status is set to "${published}".`
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

    const onPublishedClickMain = (record, published) => {
        setCustomLoading(true);
        fetch(`${BE_URL}/admin/comments/${record.id}/show-on-main-page-status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            },
            body: JSON.stringify({
                "show_on_main_page_status": (published) ? 1 : 0
            })
        })
            .then((data) => data.json())
            .then(resp => {
                setCustomLoading(false);
                if (resp.message === "Unauthenticated.") {
                    Swal.fire({
                        icon: 'error',
                        text: 'Unauthenticated.'
                    });
                } else {
                    Swal.fire({
                        icon: 'success',
                        text: (published) ? 'the comment is now shown' : 'the comment is not visible now'
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

    return (
        <div className="admin-panel-orders">
            <div className="intro">
                <h1>Recent Orders</h1>
                <div className="order-list">
                    {
                        orderListButtons.map((record, index) => {
                            return <button
                                key={index}
                                className={`status-${record ===
                                ordersStatus}`}
                                onClick={() => setOrdersStatus(record)}
                            >
                                {record}
                            </button>
                        })
                    }
                </div>
            </div>
            <div style={{position: 'relative'}}>
                <div className={'loading'} data-loading={customLoading}>
                    <Icon icon={'eos-icons:loading'} width={40} href={40}/>
                </div>
                <Table columnsStyle={"6rem 6rem 1.8fr 6rem 1fr 6rem 5rem 8rem"}>
                    <TableHeader>
                        {
                            headersList.map((record, index) => {
                                return <ItemHeader key={index}>
                                    {record}
                                </ItemHeader>
                            })
                        }
                    </TableHeader>
                    {
                        <TableBody>
                            {
                                (!loading && !error) ? data.entities.comments.map((record, index) => {
                                    return <Row key={index}>
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
                                                {record.content}
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headersList[2]}
                                            </div>
                                            <div className="property-body">
                                                {record.stars}
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headersList[3]}
                                            </div>
                                            <div className="property-body">
                                                <Switch
                                                    checked={record.status === "1"}
                                                    onChange={() => {
                                                        onPublishedClick(record, (record.status !== 1))
                                                    }}/>
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headersList[4]}
                                            </div>
                                            <div className="property-body">
                                                <Switch
                                                    checked={record.show_on_main_page === "1"}
                                                    onChange={() => {
                                                        onPublishedClickMain(record, (record.show_on_main_page !== 1))
                                                    }}/>
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headersList[5]}
                                            </div>
                                            <div className="property-body">
                                                {new Date(record.created_at).toLocaleDateString()}
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headersList[6]}
                                            </div>
                                            <div className="property-body">
                                                <button
                                                    style={{
                                                        paddingBlock: '5px',
                                                        paddingInline: '10px',
                                                        background: 'red',
                                                        borderRadius: '5px'
                                                    }}
                                                    onClick={() => {
                                                        setCustomLoading(true);
                                                        fetch(`${BE_URL}/admin/comments/${record.id}`, {
                                                            method: "DELETE",
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
                                                                if (resp.message === "Unauthenticated.") {
                                                                    Swal.fire({
                                                                        icon: 'error',
                                                                        text: 'Unauthenticated.'
                                                                    });
                                                                } else {
                                                                    Swal.fire({
                                                                        icon: 'success',
                                                                        text: 'The comment is removed'
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
                                                    }}>
                                                    Delete
                                                </button>
                                            </div>
                                        </Property>
                                    </Row>
                                }) : (loading)
                                    ? <h1>Loading...</h1>
                                    : (error)
                                        ? <h1>Error</h1>
                                        : false
                            }
                        </TableBody>
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
                                                    setUrl(`${BE_URL}/admin/comments?page=${pageNumber}`)
                                                    refresh();
                                                }}
                                            />
                                        </TablePaginations>
                                    ) : false
                    }
                </Table>
            </div>
        </div>
    )
}
