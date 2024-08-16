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

// Creating and exporting payments panel in admin dashboard
export default function Payments() {
    // Defining states of component
    const [isFilteringOpened, setIsFilteringOpened] = useState(false);
    const [date, setDate] = useState([new Date(), new Date()]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [status, setStatus] = useState("");
    const [orderBy, setOrderBy] = useState("created_at");
    const [paymentID, setPaymentID] = useState('');
    const [orderMethod, setOrderMethod] = useState("desc");
    const [infoModalOpened, setInfoModalOpened] = useState(false);
    const [selectedInfoId, setSelectedInfoId] = useState(null);

    const [infoLoading, setInfoLoading] = useState(false);
    const [infoError, setInfoError] = useState(undefined);
    const [infoData, setInfoData] = useState(undefined);

    const [drawerError, setDrawerError] = useState('');

    // Fetching the data
    const [data, error, loading, setUrl, refreshData, refetch] = useFetch(`${BE_URL}/admin/payments?page=1`);

    // Defining a script for dates validation
    useEffect(() => {
        if (formatDate(date[0]) === formatDate(date[1])) {setDrawerError('The dates cannot be same')}
        else {setDrawerError('');}
    }, [date])

    // Using useEffect to fetch data of selected info with its id
    useEffect(() => {
        if (selectedInfoId) {
            setInfoLoading(true);

            fetch(`${BE_URL}/admin/payments/${selectedInfoId}`, {
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
                        callbackSuccess: () => setInfoData(data.entities.payment),
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
                        <Modal isOpened={infoModalOpened} closeFn={() => setInfoModalOpened(false)} title={'Info of payment'}>
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
                                                    <span>Payment Method</span>
                                                    <span>{infoData.payment_method}</span>
                                                </div>
                                                <div className={'row'}>
                                                    <span>Fake Order ID</span>
                                                    <span>{infoData.fake_order_id}</span>
                                                </div>
                                                <div className={'row'}>
                                                    <span>External payment id</span>
                                                    <span>{infoData.external_payment_id}</span>
                                                </div>
                                                <div className={'row'}>
                                                    <span>Amount</span>
                                                    <span>{infoData.amount}</span>
                                                </div>
                                                <div className={'row'}>
                                                    <span>Payment amount</span>
                                                    <span>{(infoData.payment_amount) ? infoData.payment_amount : '-'}</span>
                                                </div>
                                                <div className={'row'}>
                                                    <span>Payer currency</span>
                                                    <span>{infoData.payer_currency}</span>
                                                </div>
                                                {
                                                    (infoData.invoice_info)
                                                        ? Object.keys(infoData.invoice_info).map((item, index) => (
                                                            <div className={'row'}>
                                                                <span>{item}</span>
                                                                <span>{Object.values(infoData.invoice_info)[index]}</span>
                                                            </div>
                                                        )) : false
                                                }
                                                <div className={'row'}>
                                                    <span>Payment info</span>
                                                    <span>{(infoData.payment_info) ? infoData.payment_info : '-'}</span>
                                                </div>
                                                <div className={'row'}>
                                                    <span>User id</span>
                                                    <span>{infoData.user_id}</span>
                                                </div>
                                                <div className={'row'}>
                                                    <span>Created at</span>
                                                    <span>{new Date(infoData.created_at).toLocaleDateString()}</span>
                                                </div>
                                                <div className={'row'}>
                                                    <span>Updated at</span>
                                                    <span>{(infoData.created_at) ? new Date(infoData.created_at).toLocaleDateString() : '-'}</span>
                                                </div>
                                                <div className={'row'}>
                                                    <span>Status</span>
                                                    <span>{infoData.status}</span>
                                                </div>
                                            </div>
                                        )
                            }
                        </Modal>
                    ) : false
            }
            <div className={'header'}>
                <h1 className={'title'}>Payments</h1>
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
                        <DateRangePicker required clearIcon={null} onChange={setDate} value={date}/>
                    </div>
                    <div className={'row'}>
                        <h1 className={'label'}>Payment Method</h1>
                        <Dropdown
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.value)}
                            options={[
                                {
                                    value: '',
                                    label: 'All'
                                },
                                {
                                    value: 'cryptomus',
                                    label: 'Cryptomus'
                                },
                                {
                                    value: 'nowpayments',
                                    label: 'Nowpayments'
                                },
                                {
                                    value: 'webmoney',
                                    label: 'Webmoney'
                                },
                                {
                                    value: 'perfectmoney',
                                    label: 'Perfectmoney'
                                },
                                {
                                    value: 'payeer',
                                    label: 'Payeer'
                                }
                            ]}
                        />
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
                        <h1 className={'label'}>Payment ID</h1>
                        <input className={'input'} placeholder={'Example : 1234'} type="number" onChange={(e) => setPaymentID(e.target.value)}/>
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
                            setUrl(`${BE_URL}/admin/payments?page=1&start_date=${formatDate(date[0])}&end_date=${formatDate(date[1])}&payment_methods=${paymentMethod}&statuses=${status}&payment_id=${paymentID}&order_by=${orderBy}&order_method=${orderMethod}`);
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
                        : (data.entities.payments.length === 0)
                            ? <h1>There is nothing to show</h1>
                            : (
                                <div className={'table'}>
                                    <div className={'head col-8'}>
                                        <div className={'item'}>Id</div>
                                        <div className={'item'}>Method</div>
                                        <div className={'item'}>External ID</div>
                                        <div className={'item'}>Amount</div>
                                        <div className={'item'}>Payment Amount</div>
                                        <div className={'item'}>Payer Currency</div>
                                        <div className={'item'}>Status</div>
                                        <div className={'item'}>Acions</div>
                                    </div>
                                    <div className={'body'}>
                                    {
                                            data.entities.payments.map((item, index) => (
                                                <div className={'row col-8'} key={index}>
                                                    <div className="item text id">{item.id}</div>
                                                    <div className="item text">{item.payment_method}</div>
                                                    <div className="item text">{item.external_payment_id}</div>
                                                    <div className="item text">${item.amount}</div>
                                                    <div className="item text">${(item.payment_amount) ? item.payment_amount : 0}</div>
                                                    <div className="item text">{item.payer_currency}</div>
                                                    <div className="item text">{item.status}</div>
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
                apiEndpoint={'admin/payments'}
                apiAppend={`&start_date=${formatDate(date[0])}&end_date=${formatDate(date[1])}&payment_methods=${paymentMethod}&statuses=${status}&payment_id=${paymentID}&order_by=${orderBy}&order_method=${orderMethod}`}
            />
        </div>
    )
}
