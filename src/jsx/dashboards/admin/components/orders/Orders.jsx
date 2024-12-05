// Importing part
import {Icon} from "@iconify/react";
import {useEffect, useState} from "react";
import Drawer from "../../../../primaries/drawer";
import Dropdown from "react-dropdown";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import Pagination from "../../../../primaries/pagination";
import {useFetch} from "../../../../../lib/useFetch";
import BE_URL from "../../../../../lib/envAccess";
import Modal from "../../../../pop-ups/modal";
import HandleFetchError from "../../../../../lib/handleFetchError";
import Swal from "sweetalert2";

// Defining a function to format date
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

// Creating and exporting orders panel in admin dashboard
export default function Orders() {
    // Defining states of component
    const [isFilteringOpened, setIsFilteringOpened] = useState(false);
    const [date, setDate] = useState([new Date(), new Date()]);
    const [status, setStatus] = useState("");
    const [orderBy, setOrderBy] = useState("created_at");
    const [orderMethod, setOrderMethod] = useState("desc");
    const [orderID, setOrderID] = useState("");
    const [infoModalOpened, setInfoModalOpened] = useState(false);
    const [selectedInfoId, setSelectedInfoId] = useState(null);

    const [infoLoading, setInfoLoading] = useState(false);
    const [infoError, setInfoError] = useState(undefined);
    const [infoData, setInfoData] = useState(undefined);

    const [drawerError, setDrawerError] = useState('');

    // Fetching the data
    const [data, error, loading, setUrl, refreshData, refetch] = useFetch(`${BE_URL}/admin/orders?page=1`);

    // Defining a script for dates validation
    useEffect(() => {
        if (formatDate(date[0]) === formatDate(date[1])) {setDrawerError('The dates cannot be same')}
        else {setDrawerError('');}
    }, [date])

    // Using useEffect to fetch data of selected info with its id
    useEffect(() => {
        if (selectedInfoId) {
            setInfoLoading(true);

            fetch(`${BE_URL}/admin/orders/${selectedInfoId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept" : "application/json",
                    "X-Requested-With" : "XMLHttpRequest",
                    "Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
                .then((data) => data.json())
                .then((data) => {
                    setInfoLoading(false);

                    HandleFetchError({
                        data: data,
                        lineBreak: false,
                        callbackSuccess: () => setInfoData(data.entities.order),
                        callbackError: (message) => setInfoError(message)
                    })
                })
                .catch(() => {
                    setInfoLoading(false);
                    setInfoError('There was an error while fetching the data');
                })
        }
    }, [selectedInfoId]);

    // Returning JSX
    return (
        <div className={'admin-orders-page'}>
            {
                (infoData)
                    ? (
                        <Modal isOpened={infoModalOpened} closeFn={() => setInfoModalOpened(false)} title={'Info of order'}>
                            {
                                (infoLoading)
                                    ? <h1>Loading</h1>
                                    : (infoError)
                                        ? <h1>{infoError}</h1>
                                        : (
                                            <div className={'info-holder'}>
                                                <div className={'row'}>
                                                    <span>ID</span>
                                                    <span>{selectedInfoId}</span>
                                                </div>
                                                <div className={'row'}>
                                                    <span>Fake ID</span>
                                                    <span>{infoData.fake_id}</span>
                                                </div>
                                                <div className={'row'}>
                                                    <span>Link</span>
                                                    <span>{infoData.link}</span>
                                                </div>
                                                <div className={'row'}>
                                                    <span>Quantity</span>
                                                    <span>{infoData.quantity}</span>
                                                </div>
                                                <div className={'row'}>
                                                    <span>Charge</span>
                                                    <span>{infoData.charge}</span>
                                                </div>
                                                <div className={'row'}>
                                                    <span>Start Count</span>
                                                    <span>{(infoData.start_count) ? infoData.start_count : '-'}</span>
                                                </div>
                                                <div className={'row'}>
                                                    <span>Remains</span>
                                                    <span>{infoData.remains}</span>
                                                </div>
                                                <div className={'row'}>
                                                    <span>Created At</span>
                                                    <span>{new Date(infoData.created_at).toLocaleDateString()}</span>
                                                </div>
                                                <div className={'row'}>
                                                    <span>Status</span>
                                                    <span>{infoData.status}</span>
                                                </div>
                                                <div className={'row'}>
                                                    <span>Refunded</span>
                                                    <span>{infoData.refunded}</span>
                                                </div>
                                                <div className={'row'}>
                                                    <span>In affiliate</span>
                                                    <span>{infoData.considered_in_affiliate_program}</span>
                                                </div>
                                                <div className={'row'}>
                                                    <span>Service Id</span>
                                                    <span>{infoData.service_id}</span>
                                                </div>
                                                <div className={'row'}>
                                                    <span>User ID</span>
                                                    <span>{infoData.user_id}</span>
                                                </div>
                                                <div className={'row'}>
                                                    <span>Service</span>
                                                    <span>{infoData.service.title}</span>
                                                </div>
                                            </div>
                                        )
                            }
                        </Modal>
                    ) : false
            }
            <div className={'header'}>
                <h1 className={'title'}>Orders</h1>
                <button
                    className={'filtering-btn'}
                    onClick={() => setIsFilteringOpened(prevState => !prevState)}
                >
                    <Icon icon="mi:filter" width={25} height={25}/>
                </button>
                <Drawer
                    isOpened={isFilteringOpened}
                    closeFn={() => setIsFilteringOpened(false)}
                >
                    <div className={'row'}>
                        <h1 className={'label'}>Date</h1>
                        <DateRangePicker required clearIcon={null} onChange={setDate} value={date} />
                    </div>
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
                        <h1 className={'label'}>Order by</h1>
                        <Dropdown
                            value={orderBy}
                            onChange={(e) => setOrderBy(e.value)}
                            options={[
                                {value: "created_at", label: 'Time created'},
                                {value: "order_bys", label: 'Order BYS'},
                                {value: "charge", label: 'Charge'},
                            ]}
                        />
                    </div>
                    <div className={'row'}>
                        <h1 className={'label'}>Order method</h1>
                        <Dropdown
                            value={orderMethod}
                            onChange={(e) => setOrderMethod(e.value)}
                            options={[
                                {value: "asc", label: 'ASC'},
                                {value: "desc", label: 'DESC'},
                            ]}
                        />
                    </div>
                    <div className={'row'}>
                        <h1 className={'label'}>Order ID</h1>
                        <input className={'input'} placeholder={'Example : 1234'} type="number" onChange={(e) => setOrderID(e.target.value)}/>
                    </div>
                    {
                        (drawerError !== '')
                            ? (
                                <div style={{
                                    border: '1px solid red',
                                    marginBottom: '20px',
                                    color: 'red',
                                    background: 'rgba(255,0,0,0.2)',
                                    padding: '1rem',
                                    borderRadius: '.5rem',
                                    fontSize: '1rem',
                                    fontWeight: 'bold'
                                }}>{drawerError}</div>
                            ) : false
                    }
                    <button onClick={() => {
                        if (drawerError === '') {
                            setIsFilteringOpened(false);
                            setUrl(`${BE_URL}/admin/orders?page=1&start_date=${formatDate(date[0])}&end_date=${formatDate(date[1])}&statuses=${status}&order_by=${orderBy}`);
                            refetch();
                        }
                    }} className={'btn-sub'}>
                        Filter
                    </button>
                </Drawer>
            </div>
            {
                (loading)
                    ? <h1>Loading</h1>
                    : (error)
                        ? <h1>There was an error while fetching the data</h1>
                        : (data.entities.orders.length === 0)
                            ? <h1>There is nothing to show</h1>
                            : (
                                <div className={'table'}>
                                    <div className={'head'}>
                                        <div className={'item'}>Id</div>
                                        <div className={'item'}>Charge</div>
                                        <div className={'item'}>Created At</div>
                                        <div className={'item'}>Status</div>
                                        <div className={'item'}>Refunded</div>
                                        <div className={'item'}>Actions</div>
                                    </div>
                                    <div className={'body'}>
                                        {
                                            data.entities.orders.map((item, index) => (
                                                <div className={'row'} key={index}>
                                                    <div className="item text id">{item.id}</div>
                                                    <div className="item text">${item.charge}</div>
                                                    <div className="item text">{new Date(item.created_at).toLocaleDateString()}</div>
                                                    <div className="item text">{item.status}</div>
                                                    <div className="item">
                                                        <input disabled type="checkbox" checked={(item.refunded === '1')} />
                                                    </div>
                                                    <div className="item">
                                                        <button onClick={() => {
                                                            setSelectedInfoId(item.id);
                                                            setInfoModalOpened(true);
                                                        }} className={'info'}>
                                                            <Icon icon={'material-symbols:info'} width={25} height={25}/>
                                                            Info
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
            }
            <Pagination
                error={error}
                refetch={refetch}
                setUrl={setUrl}
                count={data?.entities?.count}
                loading={loading}
                apiEndpoint={'admin/orders'}
                apiAppend={`&start_date=${formatDate(date[0])}&end_date=${formatDate(date[1])}&statuses=${status}&order_by=${orderBy}&order_method=${orderMethod}&order_id=${orderID}`}
            />
        </div>
    )
}
