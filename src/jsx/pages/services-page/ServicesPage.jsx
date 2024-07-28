



// Puzzle Man 
import { Icon } from "@iconify/react";
import puzzleMan from "../../../images/services-page/services/search/With Puzzle (Man).svg"



// Search
import {useEffect, useState} from 'react';
import Lottie from 'react-lottie-player';



// Animations 
import servicesPosterWave from "../../../animations/main-page/services-page-wave.json"
import servicesTextuareBackground from "../../../animations/main-page/services-page-background-animation.json"
import Wave from 'react-wavify';
import Table from '../../cutsome-components/table/Table';
import TableHeader from '../../cutsome-components/table/components/TableHeader';
import ItemHeader from '../../cutsome-components/table/components/ItemHeader';
import TableBody from '../../cutsome-components/table/components/TableBody';
import Row from '../../cutsome-components/table/components/Row';
import Property from '../../cutsome-components/table/components/Property';
import { useFetch } from '../../../lib/useFetch';
import BE_URL, { API, SERVER } from '../../../lib/envAccess';
import TableCategory from '../../cutsome-components/table/components/TableCategory';
import Select from 'react-select'
import PopularServices from './component/PopularServices';
import {showPopUp} from "../../../features/popUpReducer";
import {ADMIN_PANEL_CREATE_BLOG} from "../../pop-ups/Constaints";
import EditBlogPopUp from "../../pop-ups/EditBlogPopUp";
import {useDispatch} from "react-redux";
import ServicesDetailsView from "../../pop-ups/ServicesDetailsView";
import {Link, useNavigation} from "react-router-dom";








const headerList = [
    "ID",
    "Service",
    "Per 1000",
    "Min order",
    "Max order",
    "Controls"
]


servicesPosterWave.fr = 10
servicesTextuareBackground.fr = 5



const ServicesPage = () => {
    // Fetching data
    const [categoryFetch, categoryFetchError, categoryFetchLoading] = useFetch(`${BE_URL}/categories`);

    // Defining states of component
    const [category, setCategory] = useState(undefined);
    const [service, setService] = useState(undefined);
    const [serviceFetch, setServiceFetch] = useState(undefined);
    const [serviceFetchLoading, setServiceFetchLoading] = useState(false);
    const [serviceFetchError, setServiceFetchError] = useState(undefined);

    // Using useEffect to fetch services
    useEffect(() => {
        if (category) {
            setServiceFetchLoading(true);
            fetch(`${BE_URL}/categories/${category}/services`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-Requested-With": "XMLHttpRequest"
                }
            })
                .then((data) => data.json())
                .then((data) => {
                    setServiceFetchLoading(false);
                    setServiceFetch(data.entities.services);
                })
                .catch(() => {
                    setServiceFetchLoading(false);
                    setServiceFetchError('There was an error while fetching the data')
                })
        }
    }, [category]);

    const customStyles = {
        container: provided => ({
            ...provided,
            width: 300
        })
    };

    const dispatcher = useDispatch()

    return (
        <main className="services-page">
            <section className="poster">
                <div className="left">
                    <img src={window.location.origin + "/8.svg"} alt="" />
                </div>
                <div className="right">
                    <h1>
                        UNLEASH YOUR <br />
                        <span> SOCIAL MEDIA</span> POTENTIAL <br />
                        WITH OUR <br />
                        <span>PREMIUM</span> SERVICES
                    </h1>
                    <p>
                        Ignite your social media potential with our expert services. Choose from a wide range of options to amplify your brand, connect with your audience, and unlock limitless opportunities. Take charge of your online presence and harness the unparalleled power of social media today.
                    </p>
                </div>
                <div className="poster-background">
                    <Lottie
                        className='primary-aniamtion'
                        animationData={servicesTextuareBackground}
                        play
                        loop />
                    <Wave fill='#f79902'
                        paused={false}
                        className='wave'
                        options={{
                            height: 100,
                            amplitude: 50,
                            speed: 0.1,
                            points: 5
                        }}
                    />
                </div>
            </section>
            <PopularServices />
            <section className="search" style={{marginTop: '20px'}}>
                <form className="right" action="#">
                    <div className="form-select-box">
                        {
                            (categoryFetchLoading)
                                ? <h1>Loading ...</h1>
                                : (categoryFetchError)
                                    ? <h1>There was an error while fetching the data</h1>
                                    : (
                                        <Select
                                            styles={customStyles}
                                            placeholder={"------- Select Category ------- "}
                                            isSearchable={true}
                                            onChange={(item) => {
                                                setCategory(item.value);
                                                setServiceFetch(undefined);
                                                setService(undefined);
                                            }}
                                            options={categoryFetch.entities.categories.map(item => {
                                                return {
                                                    value: item.id,
                                                    label: item.title
                                                };
                                            })}
                                        />
                                    )
                        }
                    </div>
                </form>
            </section>
            <section className='avilable-services'>
                {
                    (serviceFetchLoading)
                        ? <h1>Loading</h1>
                        : (serviceFetchError)
                            ? <h1>There was an error while fetching the data</h1>
                            : (serviceFetch === undefined)
                                ? false
                                : (
                                    <Table columnsStyle={"5rem 1fr 5rem 5rem 5rem 5rem 5rem"}>
                                        <TableHeader>
                                            {headerList.map((item, index) => {
                                                return <ItemHeader key={index}>
                                                    {item}
                                                </ItemHeader>
                                            })}
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                serviceFetch.map((cat, index) => (
                                                    <TableCategory key={index}>
                                                        <Row headerList={headerList}>
                                                            <Property >
                                                                <div className="property-header">
                                                                    {headerList[0]}
                                                                </div>
                                                                <div className="property-body">
                                                                    {cat.id}
                                                                </div>
                                                            </Property>
                                                            <Property >
                                                                <div className="property-header">
                                                                    {headerList[1]}
                                                                </div>
                                                                <div className="property-body long">
                                                                    <p>
                                                                        {cat.title}
                                                                    </p>
                                                                </div>
                                                            </Property>
                                                            <Property >
                                                                <div className="property-header">
                                                                    {headerList[2]}
                                                                </div>
                                                                <div className="property-body">
                                                                    ${cat.rate}
                                                                </div>
                                                            </Property>
                                                            <Property >
                                                                <div className="property-header">
                                                                    {headerList[3]}
                                                                </div>
                                                                <div className="property-body">
                                                                    {cat.min}
                                                                </div>
                                                            </Property>
                                                            <Property >
                                                                <div className="property-header">
                                                                    {headerList[4]}
                                                                </div>
                                                                <div className="property-body">
                                                                    {cat.max}
                                                                </div>
                                                            </Property>
                                                            <Property >
                                                                <div className="property-header">
                                                                    {headerList[5]}
                                                                </div>
                                                                <div className="property-body">
                                                                    <button style={{
                                                                        display: 'block',
                                                                        background: '#4976f3',
                                                                        color: "white",
                                                                        padding: '.5rem 1rem',
                                                                        borderRadius: '.5rem'
                                                                    }} onClick={() => {
                                                                        dispatcher(showPopUp({
                                                                            type: "SERVICES_DETAILS_VIEW",
                                                                            duration: 2000,
                                                                            component: <ServicesDetailsView
                                                                                service={serviceFetch.filter(item => item.id === cat.id)[0]}/>
                                                                        }))
                                                                    }}>
                                                                        <Icon icon={'mdi:eye'}/>
                                                                    </button>
                                                                    <Link to={`/user/dashboard/New-Order?service=${cat.id}&category=${category}`} style={{
                                                                        display: 'block',
                                                                        marginTop: '20px',
                                                                        background: 'blueviolet',
                                                                        color: "white",
                                                                        padding: '.5rem 1rem',
                                                                        borderRadius: '.5rem'
                                                                    }}>
                                                                        <Icon
                                                                            icon={"fluent:select-all-off-16-regular"}/>
                                                                    </Link>
                                                                </div>
                                                            </Property>
                                                        </Row>
                                                    </TableCategory>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                )
                }
            </section>
        </main>
    )
}

export default ServicesPage