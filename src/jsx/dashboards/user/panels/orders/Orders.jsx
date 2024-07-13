import RecentOrderItem from './components/RecentOrderItem';
import { Icon } from '@iconify/react';
import {useEffect, useState} from 'react';
import { useFetch } from '../../../../../lib/useFetch';
import BE_URL, { API } from '../../../../../lib/envAccess';
import Swal from "sweetalert2";


const Orders = () => {

    const [orders, error, loading] = useFetch(`${BE_URL}/orders`)
    const [selectedOrder, setSelectedOrder] = useState({});
    const [refileLoading, setRefileLoading] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);

    useEffect(() => {
        if (!loading) {
          setSelectedOrder(orders.entities.orders[0])
          console.log(orders);
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

    return (
        <section className="panel-orders">
            <div className="recent-orders row">
                <div className="left">
                    <div className="orders">
                        {
                            (loading)
                                ? <h1>Loading</h1>
                                : (error)
                                    ? <h1>There was an error while fetching the data</h1>
                                    : (orders.entities.orders.length === 0)
                                        ? <h1>There is nothing to show</h1>
                                        : orders.entities.orders.map((item, index) => (
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
                                                    <h6 className={'order-row-value'}>{new Date(item.created_at).toLocaleDateString()}</h6>
                                                </div>
                                                <div className={'order-row'}>
                                                    <h3 className={'order-row-title'}>Status</h3>
                                                    <div className={'order-row-value'}>{item.status}</div>
                                                </div>
                                            </div>
                                        ))
                        }
                    </div>
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
                                        {new Date(selectedOrder.created_at).toLocaleDateString()}
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
                                        {getTime(selectedOrder?.created_at)}
                                    </span>
                                                </div>
                                                <div className="date">
                                    <span>
                                        <Icon icon="clarity:date-solid"/>
                                        {getDate(selectedOrder?.created_at)}
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
                                                                backgroundColor: 'white',
                                                                fontSize: '20px',
                                                                fontWeight: '600',
                                                                textAlign: 'center',
                                                                color: 'black',
                                                                padding: '15px',
                                                                borderRadius: '50rem',
                                                                width: '100%',
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

                                                                        if (data.message === "Unauthenticated.") {
                                                                            Swal.fire({
                                                                                icon: 'error',
                                                                                text: 'Unauthenticated.'
                                                                            });
                                                                        } else {
                                                                            Swal.fire({
                                                                                icon: 'success',
                                                                                text: data.message
                                                                            });
                                                                        }
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
                                                (selectedOrder?.status !== "Canceled")
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
                                                                width: '100%',
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

                                                                        if (data.message === "Unauthenticated.") {
                                                                            Swal.fire({
                                                                                icon: 'error',
                                                                                text: 'Unauthenticated.'
                                                                            });
                                                                        } else {
                                                                            Swal.fire({
                                                                                icon: 'success',
                                                                                text: data.message
                                                                            });
                                                                        }
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
