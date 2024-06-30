import Lottie from "react-lottie-player"
import UserQuickView from "../../Components/UserQuickView"
import newOrderIntroAnimatin from "../../../../../animations/user-dashboard/new-order-intro-animation.json"
import { Icon } from "@iconify/react"
import { useFetch } from "../../../../../lib/useFetch"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import BE_URL from "../../../../../lib/envAccess";
const NewOrders = () => {
    const [data, error, loading] = useFetch(`${BE_URL}/user-index`);
    const [categoriesData, categoriesError, categoriesLoading] = useFetch(`${BE_URL}/categories`);
    const [services, setServices] = useState([]);
    const [servicesLoading, setServicesLoading] = useState(false);
    const [servicesObj, setServicesObj] = useState();

    const [categroy, setCategory] = useState();
    const [selectedService, setSelectedService] = useState();
    const [link, setLink] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [runs, setRuns] = useState();
    const [interval, setInterval] = useState();
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        if (categroy) {
            setServicesLoading(true);
            fetch(`${BE_URL}/categories/${categroy}/services `, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept" : "application/json",
                    "X-Requested-With" : "XMLHttpRequest",
                    "Authorization" : `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            })
                .then((data) => data.json())
                .then((data) => {
                    setServicesLoading(false);
                    const val = data.entities.services;
                    setServices(val);
                })
                .catch(() => {
                    setServicesLoading(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'There was an error while fetching the data'
                    })
                })
        }
    }, [categroy]);

    useEffect(() => {
        if (selectedService) {
            const findedItem = services.find((item) => item.id === selectedService);
            setServicesObj(findedItem);
        }
    }, [selectedService]);

    return (
        <section className="panel-new-order">
            {
                (loading)
                    ? (
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: "center", width: '100%', padding: '20px'}}>
                            <Icon icon={'eos-icons:loading'} width={40} href={40} />
                        </div>
                    ) : (error)
                        ? <h1>There was an error while fetching the data</h1>
                        : <UserQuickView
                            orders={data.entities.total_orders}
                            spend={data.entities.total_spend}
                            balance={data.entities.balance}
                            activeOrders={data.entities.active_orders}
                        />
            }
            <div className="intro row">
                <div className="left">
                    <Lottie
                        animationData={newOrderIntroAnimatin}
                        play
                        loop />

                </div>
                <div className="right">
                    <h1>
                        Lets Order <br />
                        <span>New</span>
                        Service !
                    </h1>
                    <p>
                        At UTSMM, we are excited to offer a range of services to meet your needs. Choose your desired package, provide your account details, and let our SMM panel deliver the best possible service! Whether you're aiming to boost engagement, expand your online presence or embark on a fresh project, this section is designed to make ordering social media services a breeze.                    </p>
                </div>
            </div>
            <div className={'new-order'}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        console.log({
                            "service": selectedService,
                            "link": link,
                            "quantity": quantity,
                            "runs": runs,
                            "interval": interval
                        })

                        setFormLoading(true);
                        fetch(`${BE_URL}/default-orders`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Accept" : "application/json",
                                "X-Requested-With" : "XMLHttpRequest",
                                "Authorization" : `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                            },
                            body: JSON.stringify({
                                "service": selectedService,
                                "link": link,
                                "quantity": quantity,
                                "runs": runs,
                                "interval": interval
                            })
                        })
                            .then((data) => data.json())
                            .then((data) => {
                                setFormLoading(false);
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

                                console.log(data);
                            })
                            .catch(() => {
                                setFormLoading(false);
                                Swal.fire({
                                    icon: 'error',
                                    title: 'There was an error while fetching the data'
                                })
                            })
                    }}
                    className={'form'} style={{width: 'auto'}} action="#"
                >
                    <div>
                        <label className={'label'}>Category</label>
                        {
                            (categoriesLoading)
                                ? (
                                    <div className={'drop-down-loading'}>
                                        <Icon icon={'eos-icons:loading'} width={30} height={30}/>
                                    </div>
                                ) : (categoriesError)
                                    ? <h1>Error</h1>
                                    : <Dropdown
                                        onChange={(e) => setCategory(e.value)}
                                        options={categoriesData.entities.categories.map(item => {return { label: item.title, value: item.id }})}
                                        placeholder="Select an option"
                                    />
                        }
                    </div>
                    <div>
                        <label className={'label'}>Service</label>
                        {
                            (servicesLoading)
                                ? (
                                    <div className={'drop-down-loading'}>
                                        <Icon icon={'eos-icons:loading'} width={30} height={30}/>
                                    </div>
                                ) : (
                                    <Dropdown
                                        onChange={(e) => setSelectedService(e.value)}
                                        disabled={(!categroy)}
                                        options={services.map(item => {return { label: item.title, value: item.id }})}
                                        placeholder={(!categroy) ? "Select a category first" : "Select a service"}
                                    />
                                )
                        }
                    </div>
                    <div>
                        <label className={'label'}>Link</label>
                        <input
                            onChange={(e) => setLink(e.target.value)}
                            type="text"
                            className="input"
                            placeholder={'Type ...'}
                            required
                        />
                    </div>
                    <div>
                        <label className={'label'}>Quantity</label>
                        <input
                            disabled={(!selectedService)}
                            onChange={(e) => setQuantity(e.target.value)}
                            type="number"
                            className="input"
                            min={(servicesObj) ? servicesObj.min : 0}
                            max={(servicesObj) ? servicesObj.max : 0}
                            placeholder={'Type ...'}
                            required
                        />
                    </div>
                    <div>
                        <label className={'label'}>Runs</label>
                        <input
                            onChange={(e) => setRuns((e.target.value === '') ? undefined : e.target.value)}
                            type="number"
                            min={0}
                            className="input"
                            placeholder={'Type ...'}
                        />
                    </div>
                    <div>
                        <label className={'label'}>Interval</label>
                        <input
                            onChange={(e) => setInterval((e.target.value === '') ? undefined : e.target.value)}
                            type="number"
                            min={0}
                            className="input"
                            placeholder={'Type ...'}
                        />
                    </div>
                    <button disabled={formLoading} className={'submit-btn'}>Submit</button>
                </form>
            </div>
        </section>
    )
}

export default NewOrders
