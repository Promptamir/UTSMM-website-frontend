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
import {useLocation} from "react-router-dom";
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

    // Defining token
    const location = useLocation();
    const search = location.search?.slice(1, location.search.length);
    const serviceSearch = search?.split('&')[0]?.split('=')[1];
    const categorySearch = search?.split('&')[1]?.split('=')[1];

    const [categoriesSearchData, categoriesSearchError, categoriesSearchLoading] = useFetch(`${BE_URL}/categories/${categorySearch}/services`);
    const [selectedServiceFromFav, setSelectedServiceFromFav] = useState();

    useEffect(() => {
        if (serviceSearch && categorySearch) {
            if (!categoriesSearchLoading) {
                setSelectedServiceFromFav(categoriesSearchData.entities.services.find(item => item.id === Number(serviceSearch)));
            }
        }
    }, [categoriesSearchLoading]);

    useEffect(() => {
        if (categroy) {
            setServicesLoading(true);
            fetch(`${BE_URL}/categories/${categroy}/services`, {
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


    if (serviceSearch && categorySearch) {
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

                            setFormLoading(true);
                            fetch(`${BE_URL}/default-orders`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Accept" : "application/json",
                                    "X-Requested-With" : "XMLHttpRequest",
                                    "Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                                },
                                body: JSON.stringify({
                                    service: selectedServiceFromFav.id,
                                    link: link,
                                    quantity,
                                    interval,
                                    runs
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
                            <label className={'label'}>Service</label>
                            {
                                (categoriesSearchLoading)
                                    ? (
                                        <div style={{display: 'flex', alignItems: 'center', justifyContent: "center", width: '100%', padding: '20px'}}>
                                            <Icon icon={'eos-icons:loading'} width={40} href={40} />
                                        </div>
                                    ) : (categoriesSearchError)
                                        ? <h1>There was an error while fetching the data</h1>
                                        : (selectedServiceFromFav?.title)
                                            ? <h1>{selectedServiceFromFav.title}</h1>
                                            : false
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
                                onChange={(e) => setQuantity(e.target.value)}
                                type="number"
                                className="input"
                                min={(selectedServiceFromFav) ? Number(selectedServiceFromFav.min) : 0}
                                max={(selectedServiceFromFav) ? Number(selectedServiceFromFav.max) : 0}
                                placeholder={'Type ...'}
                                required
                            />
                        </div>
                        {
                            (!selectedServiceFromFav)
                                ? undefined
                                : (selectedServiceFromFav.dripfeedable === "1")
                                    ? (
                                        <>
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
                                        </>
                                    ) : false
                        }
                        <button disabled={formLoading} className={'submit-btn'}>Submit</button>
                    </form>
                </div>
            </section>
        )
    } else {
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

                            setFormLoading(true);
                            fetch(`${BE_URL}/default-orders`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Accept" : "application/json",
                                    "X-Requested-With" : "XMLHttpRequest",
                                    "Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                                },
                                body: JSON.stringify({
                                    "service": selectedService.id,
                                    "link": link,
                                    "quantity": quantity,
                                    "runs": runs,
                                    "interval": interval
                                })
                            })
                                .then((data) => data.json())
                                .then((data) => {
                                    console.log(data);
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
                                            disabled={!!(categorySearch)}
                                            value={(categorySearch) ? categorySearch : undefined}
                                            onChange={(e) => setCategory(e.value)}
                                            options={categoriesData.entities.categories.map(item => {return {
                                                label: item.title,
                                                value: item.id
                                            }})}
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
                                            disabled={!!(serviceSearch)}
                                            value={(serviceSearch) ? serviceSearch : undefined}
                                            onChange={(e) => setSelectedService(e.value)}
                                            disabled={(!categroy)}
                                            options={services.map(item => {return { label: item.title, value: item }})}
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
                                min={(selectedService) ? Number(selectedService.min) : 0}
                                max={(selectedService) ? Number(selectedService.max) : 0}
                                placeholder={'Type ...'}
                                required
                            />
                        </div>
                        {
                            (!selectedService)
                                ? undefined
                                : (selectedService.dripfeedable === "1")
                                    ? (
                                        <>
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
                                        </>
                                    ) : false
                        }
                        <button disabled={formLoading} className={'submit-btn'}>Submit</button>
                    </form>
                </div>
            </section>
        )
    }
}

export default NewOrders
