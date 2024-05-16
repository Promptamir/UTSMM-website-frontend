import RecentOrderItem from './components/RecentOrderItem';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useFetch } from '../../../../../lib/useFetch';
import { API } from '../../../../../lib/envAccess';


const Orders = () => {

    const [orders, error, loading] = useFetch('https://utsmm.liara.run/api/orders')
    const [selectedOrder, setSelectedOrder] = useState({});

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
                                    <Icon icon="fluent:calendar-date-28-filled" />
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
                                    <Icon icon="mdi:auto-start" />
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
                                    <Icon icon="uim:process" />
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
                                    <Icon icon="majesticons:chat-status" />
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
                                    <Icon icon="mingcute:link-fill" />
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
                                    <Icon icon="ion:rocket-sharp" />
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
                                        <Icon icon="ri:time-fill" />
                                        {getTime(selectedOrder?.created_at)}
                                    </span>
                                </div>
                                <div className="date">
                                    <span>
                                        <Icon icon="clarity:date-solid" />
                                        {getDate(selectedOrder?.created_at)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section >
    )
}

export default Orders