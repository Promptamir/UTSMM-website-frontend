import RecentOrderItem from './components/RecentOrderItem';
import {Icon} from '@iconify/react';
import {useEffect, useState} from 'react';
import {useFetch} from '../../../../../lib/useFetch';
import BE_URL, {API} from '../../../../../lib/envAccess';
import Swal from "sweetalert2";
import {showPopUp} from "../../../../../features/popUpReducer";
import {ADMIN_PANEL_CREATE_BLOG} from "../../../../pop-ups/Constaints";
import CreateNewBlogPopUp from "../../../../pop-ups/CreateNewBlogPopUp";
import {useDispatch} from "react-redux";
import RefilHistoryPopUt from "../../../../pop-ups/RefilHistoryPopUt";
import HandleFetchError from "../../../../../lib/handleFetchError";
import Pagination from "../../../../primaries/pagination";
import Drawer from "../../../../primaries/drawer";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import Dropdown from "react-dropdown";


const Orders = () => {

    const [data, error, loading, setUrl, refreshData, refetch] = useFetch(`${BE_URL}/orders`)
    const [selectedOrder, setSelectedOrder] = useState({});
    const [refileLoading, setRefileLoading] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [addFavLoading, setAddFavLoading] = useState(false);
    const [addedToFav, setAddedToFav] = useState(false);

    const dispatcher = useDispatch()

    useEffect(() => {
        if (!loading) {
            setSelectedOrder(data.entities.orders[0])
        }
    }, [loading]);

    function getDate(string) {
        let date = new Date(string);
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0'); //janvier = 0
        let yyyy = date.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
    }

    function getTime(string) {
        let date = new Date(string);
        var minutes = date.getMinutes();
        var hours = date.getHours();
        return hours + ':' + minutes;
    }

    const [isFilteringOpened, setFilteringOpened] = useState(false);
    const [orderID, setOrderID] = useState("");
    const [status, setStatus] = useState("");

    return (
        <section className="panel-orders">
            <div className="recent-orders row">
                <div className="left">
                    <div className={'row-filter'}>
                        <h1 className={'title'}>Orders</h1>
                        <button
                            className={'filtering-btn'}
                            onClick={() => setFilteringOpened(prevState => !prevState)}
                        >
                            <Icon icon="mi:filter" width={25} height={25}/>
                        </button>
                        <Drawer
                            isOpened={isFilteringOpened}
                            closeFn={() => setFilteringOpened(false)}
                        >
                            <div className={'row'}>
                                <h1 className={'label'}>Status</h1>
                                <Dropdown
                                    value={status}
                                    onChange={(e) => setStatus(e.value)}
                                    options={[
                                        {value: "-1", label: 'Canceled'},
                                        {value: "0", label: 'Pending'},
                                        {value: "1", label: 'Processing'},
                                        {value: "2", label: 'In Progress'},
                                        {value: "3", label: 'Partial'},
                                        {value: "4", label: 'Completed'},
                                        {value: "", label: 'All'},
                                    ]}
                                />
                            </div>
                            <div className={'row'}>
                                <h1 className={'label'}>Order ID</h1>
                                <input className={'input'} placeholder={'Example : 1234'} type="number"
                                       onChange={(e) => setOrderID(e.target.value)}/>
                            </div>
                            <button onClick={() => {
                                setFilteringOpened(false);
                                setUrl(`${BE_URL}/orders?page=1&statuses=${status}&order_id=${orderID}`);
                                refetch();
                                setSelectedOrder({});
                            }} className={'btn-sub'}>
                                Filter
                            </button>
                        </Drawer>
                    </div>
                    <div className="orders">
                        {
                            (loading)
                                ? <h1>Loading</h1>
                                : (error)
                                    ? <h1>There was an error while fetching the data</h1>
                                    : (data.entities.orders.length === 0)
                                        ? <h1>There is nothing to show</h1>
                                        : data.entities.orders.map((item, index) => (
                                            <div
                                                onClick={() => setSelectedOrder(item)}
                                                data-selected={(selectedOrder === item)}
                                                className={'order-item'}
                                                key={index}
                                            >
                                                <div className={'order-name-container'}>
                                                    <h1 className={'order-name'}>{item.service.title}</h1>
                                                    <h6 className={'order-id'}>#{item.id}</h6>
                                                </div>
                                                <div className={'order-row'}>
                                                    <h3 className={'order-row-title'}>Quantity</h3>
                                                    <h6 className={'order-row-value'}>{item.quantity}</h6>
                                                </div>
                                                <div className={'order-row'}>
                                                    <h3 className={'order-row-title'}>Charge</h3>
                                                    <h6 className={'order-row-value'}>{item.charge}</h6>
                                                </div>
                                                <div className={'order-row'}>
                                                    <h3 className={'order-row-title'}>Date</h3>
                                                    <h6 className={'order-row-value'}>{(item.created_at) ? new Date(item.created_at).toLocaleDateString() : '-'}</h6>
                                                </div>
                                                <div className={'order-row'}>
                                                    <h3 className={'order-row-title'}>Status</h3>
                                                    <div className={'order-row-value'}>{item.status}</div>
                                                </div>
                                            </div>
                                        ))
                        }
                    </div>
                    <Pagination
                        error={error}
                        refetch={refetch}
                        setUrl={setUrl}
                        count={data?.entities?.count}
                        loading={loading}
                        apiEndpoint={'orders'}
                        apiAppend={`&statuses=${status}&order_id=${orderID}`}
                    />
                </div>
                <div className="right">
                    {
                        (loading)
                            ? <h1>Loading</h1>
                            : (error)
                                ? <h1>Error</h1>
                                : (
                                    <div className="order-detail">
                                        <div className="header">
                                            <h1>
                                                <span>
                                                    #{selectedOrder?.service?.id}
                                                </span>
                                            </h1>
                                            <p>
                                                {selectedOrder?.service?.title}
                                            </p>
                                        </div>
                                        <div className="body">
                                            <div className="property">
                                                <div className="property-left">
                                                    <Icon icon="fluent:calendar-date-28-filled"/>
                                                    <span>
                                        Date
                                    </span>
                                                </div>
                                                <div className="property-right">
                                    <span>
                                        {(selectedOrder?.created_at) ? new Date(selectedOrder.created_at).toLocaleDateString() : '-'}
                                    </span>
                                                </div>
                                            </div>
                                            <div className="property">
                                                <div className="property-left">
                                                    <Icon icon="mdi:auto-start"/>
                                                    <span>
                                        Start count
                                    </span>
                                                </div>
                                                <div className="property-right">
                                    <span>
                                        {selectedOrder.start_count}
                                    </span>
                                                </div>
                                            </div>
                                            <div className="property">
                                                <div className="property-left">
                                                    <Icon icon="uim:process"/>
                                                    <span>
                                        Remains
                                    </span>
                                                </div>
                                                <div className="property-right">
                                    <span>
                                        {selectedOrder.remains}
                                    </span>
                                                </div>
                                            </div>
                                            <div className="property">
                                                <div className="property-left">
                                                    <Icon icon="majesticons:chat-status"/>
                                                    <span>
                                        Status
                                    </span>
                                                </div>
                                                <div className="property-right">
                                    <span>
                                        {selectedOrder.status}
                                    </span>
                                                </div>
                                            </div>
                                            <div className="property link">
                                                <div className="property-left">
                                                    <Icon icon="mingcute:link-fill"/>
                                                    <span>
                                        Link
                                    </span>
                                                </div>
                                                <p className="property-right">
                                    <span>
                                        {selectedOrder.link}
                                    </span>
                                                </p>
                                            </div>
                                            <div className="property description">
                                                <div className="property-left">
                                                    <Icon icon="ion:rocket-sharp"/>
                                                    <span>
                                        Order ID
                                    </span>
                                                </div>
                                                <p className="property-right">
                                    <span>
                                        {selectedOrder.id}
                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="footer">
                                            <div className="time-date">
                                                <div className="time">
                                    <span>
                                        <Icon icon="ri:time-fill"/>
                                        {(selectedOrder?.created_at) ? getTime(selectedOrder?.created_at) : '-'}
                                    </span>
                                                </div>
                                                <div className="date">
                                    <span>
                                        <Icon icon="clarity:date-solid"/>
                                        {(selectedOrder?.created_at) ? getDate(selectedOrder?.created_at) : '-'}
                                    </span>
                                                </div>
                                            </div>
                                            {
                                                (selectedOrder?.service?.refillable === "1")
                                                    ? (
                                                        <button
                                                            disabled={refileLoading}
                                                            style={{
                                                                marginTop: '20px',
                                                                backgroundColor: '#21356e',
                                                                fontSize: '20px',
                                                                fontWeight: '600',
                                                                textAlign: 'center',
                                                                color: 'white',
                                                                padding: '15px',
                                                                borderRadius: '50rem',
                                                                display: 'block',
                                                                width: 'calc(100% - 20px)',
                                                                opacity: (refileLoading) ? '50%' : '100%'
                                                            }}
                                                            onClick={() => {
                                                                setRefileLoading(true);
                                                                fetch(`${BE_URL}/order-refills`, {
                                                                    method: "POST",
                                                                    headers: {
                                                                        "Content-Type": "application/json",
                                                                        "Accept": "application/json",
                                                                        "X-Requested-With": "XMLHttpRequest",
                                                                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                                                                    },
                                                                    body: JSON.stringify({order: selectedOrder.id})
                                                                })
                                                                    .then((data) => data.json())
                                                                    .then((data) => {
                                                                        setRefileLoading(false);

                                                                        HandleFetchError({
                                                                            data: data,
                                                                            lineBreak: false,
                                                                            callbackSuccess: (message) => Swal.fire({
                                                                                icon: 'success',
                                                                                text: message
                                                                            }),
                                                                            callbackError: (message) => Swal.fire({
                                                                                icon: 'error',
                                                                                text: message
                                                                            })
                                                                        })
                                                                    })
                                                                    .catch(() => {
                                                                        setRefileLoading(false);
                                                                        Swal.fire({
                                                                            icon: 'error',
                                                                            title: 'There was an error while fetching the data'
                                                                        })
                                                                    })
                                                            }}
                                                        >
                                                            {(refileLoading) ? "Loading" : 'Refile'}
                                                        </button>
                                                    ) : false
                                            }
                                            {
                                                (selectedOrder?.service?.refillable === "1")
                                                    ? (
                                                        <button
                                                            onClick={() => {
                                                                dispatcher(showPopUp({
                                                                    type: ADMIN_PANEL_CREATE_BLOG,
                                                                    duration: 2000,
                                                                    component: <RefilHistoryPopUt id={selectedOrder.id}/>
                                                                }))
                                                            }}
                                                            style={{
                                                                marginTop: '20px',
                                                                backgroundColor: '#21356e',
                                                                fontSize: '20px',
                                                                fontWeight: '600',
                                                                textAlign: 'center',
                                                                color: 'white',
                                                                paddingBlock: '15px',
                                                                borderRadius: '50rem',
                                                                display: 'block',
                                                                width: 'calc(100% + 10px)',
                                                            }}
                                                        >
                                                            Refile History
                                                        </button>
                                                    ) : false
                                            }
                                            {
                                                (selectedOrder?.service?.cancelable === "1")
                                                    ? (
                                                        <button
                                                            disabled={cancelLoading}
                                                            style={{
                                                                marginTop: '20px',
                                                                backgroundColor: 'red',
                                                                color: 'white',
                                                                fontSize: '20px',
                                                                fontWeight: '600',
                                                                textAlign: 'center',
                                                                padding: '15px',
                                                                borderRadius: '50rem',
                                                                width: 'calc(100% - 20px)',
                                                                display: 'block',
                                                                opacity: (cancelLoading) ? '50%' : '100%'
                                                            }}
                                                            onClick={() => {
                                                                setCancelLoading(true);
                                                                fetch(`${BE_URL}/order-cancels`, {
                                                                    method: "POST",
                                                                    headers: {
                                                                        "Content-Type": "application/json",
                                                                        "Accept": "application/json",
                                                                        "X-Requested-With": "XMLHttpRequest",
                                                                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                                                                    },
                                                                    body: JSON.stringify({order: selectedOrder.id})
                                                                })
                                                                    .then((data) => data.json())
                                                                    .then((data) => {
                                                                        setCancelLoading(false);

                                                                        HandleFetchError({
                                                                            data: data,
                                                                            lineBreak: false,
                                                                            callbackSuccess: (message) => Swal.fire({
                                                                                icon: 'success',
                                                                                text: message
                                                                            }),
                                                                            callbackError: (message) => Swal.fire({
                                                                                icon: 'error',
                                                                                text: message
                                                                            })
                                                                        })
                                                                    })
                                                                    .catch(() => {
                                                                        setRefileLoading(false);
                                                                        Swal.fire({
                                                                            icon: 'error',
                                                                            title: 'There was an error while fetching the data'
                                                                        })
                                                                    })
                                                            }}
                                                        >
                                                            {(cancelLoading) ? "Loading" : 'Cancel'}
                                                        </button>
                                                    ) : false
                                            }
                                            <button
                                                disabled={addFavLoading}
                                                style={{
                                                    marginTop: '20px',
                                                    backgroundColor: 'white',
                                                    color: 'red',
                                                    fontSize: '20px',
                                                    fontWeight: '600',
                                                    textAlign: 'center',
                                                    padding: '15px',
                                                    borderRadius: '50rem',
                                                    width: 'calc(100% - 20px)',
                                                    display: 'block',
                                                    opacity: (addFavLoading) ? '50%' : '100%'
                                                }}
                                                onClick={() => {
                                                    setAddFavLoading(true);
                                                    fetch(`${BE_URL}/user/favorite-services`, {
                                                        method: "POST",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                            "Accept": "application/json",
                                                            "X-Requested-With": "XMLHttpRequest",
                                                            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                                                        },
                                                        body: JSON.stringify({service_id: selectedOrder?.service?.id})
                                                    })
                                                        .then((data) => data.json())
                                                        .then((data) => {
                                                            setAddFavLoading(false);

                                                            HandleFetchError({
                                                                data: data,
                                                                lineBreak: false,
                                                                callbackSuccess: (message) => Swal.fire({
                                                                    icon: 'success',
                                                                    text: message
                                                                }),
                                                                callbackError: (message) => Swal.fire({
                                                                    icon: 'error',
                                                                    text: message
                                                                })
                                                            })
                                                        })
                                                        .catch(() => {
                                                            setAddFavLoading(false);
                                                            Swal.fire({
                                                                icon: 'error',
                                                                title: 'There was an error while fetching the data'
                                                            })
                                                        })
                                                }}
                                            >
                                                <Icon icon={'mdi:heart-outline'} width={28} height={28}/>
                                            </button>
                                        </div>
                                    </div>
                                )
                    }

                </div>
            </div>
        </section>
    )
}

export default Orders
