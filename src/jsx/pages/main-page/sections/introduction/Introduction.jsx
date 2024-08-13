import Lottie from "react-lottie-player"
import { Icon } from '@iconify/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from "react";
import itemOne from "../../../../../images/main-page/intro-2/svg/1.svg"
import itemTwo from "../../../../../images/main-page/intro-2/svg/2.svg"
import itemThree from "../../../../../images/main-page/intro-2/svg/3.svg"
import itemFour from "../../../../../images/main-page/intro-2/svg/4.svg"
import services from "../../../../../animations/main-page/services.json"
import Marquee from "react-fast-marquee";
import stepArrowAnimation from "../../../../../animations/main-page/main-page-steps-arrow.json"
import CompanyStaticsItem from "./components/CompanyStaticsItem";
import {Link} from "react-router-dom";
import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    EffectCards,
    EffectCoverflow,
    Autoplay,
} from 'swiper/modules';

export default function Introduction({data, error, loadingAPI}) {
    const [currentSelected, setCurrentSelected] = useState({
        svg: itemOne,
        title: "Users",
        value: '0',
        description: `With an incredible count of 0 users, our platform has become a thriving community where individuals connect, engage, and explore a world of possibilities.`,
        animation: window.location.origin + '/2.svg'
    });


    // Defining inner function to render statisitic from api
    function Statics({users, tickets, services, orders}) {
        // Defining states of component
        const companyStaticsItems = [
            {
                svg: itemOne,
                title: "Users",
                value: users,
                description: `With an incredible count of ${(users) ? users.toLocaleString('en-US') : 0} users, our platform has become a thriving community where individuals connect, engage, and explore a world of possibilities.`,
                animation: window.location.origin + '/2.svg'
            },
            {
                svg: itemTwo,
                title: "Orders",
                value: orders,
                description: `A staggering ${(orders) ? orders.toLocaleString('en-US') : 0} orders have been placed, showcasing the trust our customers have in us. Each order signifies a unique story of satisfaction and reliability.`,
                animation: window.location.origin + '/3.svg'

            },
            {
                svg: itemThree,
                title: "Tickets",
                value: tickets,
                description: `As we prioritize customer support, our resolved ticket count stands at an impressive ${tickets.toLocaleString('en-US')}. This signifies not just a number, but the countless meaningful interactions we've had with our valued clients.`,
                animation: window.location.origin + '/4.svg'

            },
            {
                svg: itemFour,
                title: "Services",
                value: services,
                description: `Our dedication to excellence shines through the provision of ${(services) ? services.toLocaleString('en-US') : 0} top-notch services. Each service represents our unwavering commitment to delivering quality solutions.`,
                animation: window.location.origin + '/5.svg'
            }
        ];

        // Returning JSX
        return companyStaticsItems.map((item, index) => {
            return <CompanyStaticsItem
                key={index}
                selected={currentSelected.title === item.title}
                setSelected={setCurrentSelected}
                item={item}
            />
        })
    }

    return (
        <section className="introduction">
            <div className="our-services">
                <div className="header">
                    <h1>Our Platforms</h1>
                    <p>
                        We have solution for everything you can imagine to help you reach new heights with our expert services.
                    </p>
                </div>
                <div className="body">
                    <div className="background">
                        <Lottie className='animation' animationData={services} play loop />
                    </div>
                    {
                        (loadingAPI)
                            ? <Icon icon={'eos-icons:loading'} width={40} href={40} />
                            : (error)
                                ? <h1>There was an error while fetching the data</h1>
                                :  (
                                    <Swiper
                                        modules={[
                                            Navigation,
                                            Pagination,
                                            Scrollbar,
                                            A11y,
                                            EffectCoverflow]}
                                        spaceBetween={20}
                                        pagination={{
                                            clickable: true,
                                            el: ".bullet-container"
                                        }}
                                        onSwiper={(swiper) => swiper.slideTo(2)}
                                        effect={'coverflow'}
                                        grabCursor={true}
                                        centeredSlides
                                        navigation={{
                                            prevEl: ".prev-arrow",
                                            nextEl: ".next-arrow",
                                            disabledClass: "false",

                                        }}
                                        coverflowEffect={{
                                            rotate: -10,
                                            stretch: 0,
                                            depth: 350,
                                            modifier: 1,
                                            slideShadows: false,
                                        }}
                                        breakpoints={{
                                            0: {
                                                slidesPerView: 1,
                                            },
                                            400: {
                                                slidesPerView: 2,
                                            },
                                            639: {
                                                slidesPerView: 3,
                                            },
                                            865: {
                                                slidesPerView: 4
                                            },
                                            1000: {
                                                slidesPerView: 5
                                            },
                                            1500: {
                                                slidesPerView: 4.5
                                            }
                                        }}
                                    >
                                        {
                                            data.entities.platforms.slice(0,5).map((item, index) => {
                                                return <SwiperSlide key={index}>
                                                    <div className="item">
                                                        <div className="item-header"><img src={item.image} alt="" />
                                                        </div>
                                                        <div className="item-body">
                                                            <div>
                                                                <h1>{item.title}</h1>
                                                                <small>{item.description}</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            })
                                        }
                                    </Swiper>
                                )
                    }
                </div>
            </div>
            <div className="our-popular-services">
                <img src={require("../../../../../images/main-page/intro-2/our-popular-services/rocket.png")} alt="" className="rocket" />
                <div className="header">
                    <h1>
                        Our Popular
                        <span>Services</span>
                    </h1>
                    <p>
                        Unleash the power of social media with us
                    </p>
                </div>
                <div className="body">
                    {
                        (loadingAPI)
                            ? <Icon icon={'eos-icons:loading'} width={40} href={40} />
                            : (error)
                                ? <h1>There was an error while fetching the data</h1>
                                : (
                                    <div className={'popular-services-holder'}>
                                        {
                                            data.entities.popular_services.slice(0,3).map((item, index) => (
                                                <Link key={index} to={`/user/dashboard/New-Order?service=${item.id}&category=${item.category_id}`} className="item">
                                                    <div className="item-header">
                                                        <img src={require("../../../../../images/main-page/intro-2/our-popular-services/1.png")} alt="" />
                                                    </div>
                                                    <div className="item-body">
                                                        <h2>{item.title}</h2>
                                                    </div>
                                                    <div className="item-buttons">
                                                        <button className='arrow-up'>
                                                            <Icon icon="icon-park-solid:up-one" />
                                                        </button>
                                                        <button className='see-more'>
                                                            <span>See More</span>
                                                            <Icon icon="mingcute:right-fill" />
                                                        </button>
                                                    </div>
                                                </Link>
                                            ))
                                        }
                                    </div>
                                )
                    }</div>
            </div>
            <div className="service-step-guidance">
                <div className="header">
                    <h1>
                        <span>Its Eazy ! </span>
                        Just Follow The Steps Blow
                    </h1>
                </div>
                <Marquee
                    className='guidance-marquee'
                    gradient={true}
                    gradientColor='rgb(255,255,255)'
                    speed={30}
                >
                    <div className="body">
                        <div className="item">
                            <div className="item-header">
                                <img src={
                                    window.location.origin + "/11.svg"} alt="" />
                            </div>
                            <div className="item-body">
                                <h1>Sign Up</h1>
                                <small>
                                    Create an account to get started on our platform.
                                </small>
                            </div>
                        </div>
                        <div className="item">
                            <div className="item-header">
                                <img src={
                                    window.location.origin + "/12.svg"} alt="" />
                            </div>
                            <div className="item-body">
                                <h1>Go Dashboard</h1>
                                <small>
                                    Access your personalized dashboard with all the tools you need.
                                </small>
                            </div>
                        </div>
                        <div className="item">
                            <div className="item-header">
                                <img src={
                                    window.location.origin + "/13.svg"} alt="" />
                            </div>
                            <div className="item-body">
                                <h1>Choese  Service </h1>
                                <small>Browse through our wide range of services and select what you need.</small>
                            </div>
                        </div>
                        <div className="item">
                            <div className="item-header">
                                <img src={
                                    window.location.origin + "/14.svg"} alt="" />
                            </div>
                            <div className="item-body">
                                <h1>Order</h1>
                                <small>
                                    Place an order for the service you've chosen and proceed.
                                </small>
                            </div>
                        </div>
                        <div className="item">
                            <div className="item-header">
                                <img src={
                                    window.location.origin + "/10.svg"} alt="" />
                            </div>
                            <div className="item-body">
                                <h1> Enjoy & Peace !</h1>
                                <small>Sit back, relax, and enjoy the benefits of our services. Peace of mind included!</small>
                            </div>
                        </div>


                    </div>
                </Marquee>



                <div className="step-guidance-background">
                    <Lottie
                        animationData={stepArrowAnimation}
                        play
                        loop
                    />
                </div>

            </div>
            <div className="world-map fade-in" key={Math.random()}>
                {/* <Lottie
                    className='animation '
                    animationData={currentSelected.animation}
                    play
                    loop
                /> */}

                <img src={currentSelected.animation} />

                <div className='company-statics-description '>
                    <h1>
                        <span>Total</span>
                        <div className="accent-color">
                            {currentSelected.title}
                        </div>
                    </h1>
                    <p>
                        {currentSelected.description}
                    </p>
                </div>
            </div>
            <div className="company-statics">
                <div className="statics">
                    {
                        (loadingAPI)
                            ? <Icon icon={'eos-icons:loading'} width={40} href={40} />
                            : (error)
                                ? <h1>There was an error while fetching the data</h1>
                                : <Statics
                                    services={data.entities.statistics.total_services}
                                    orders={data.entities.statistics.total_orders}
                                    tickets={data.entities.statistics.total_tickets}
                                    users={data.entities.statistics.total_users}
                                />
                    }
                </div>
            </div>
            <div className="our-activities">
                <div className="left">
                    <h1>
                        Our
                        <div className="accent-color">
                            Activities
                        </div>
                    </h1>
                    <p>
                        At UTSMM, we're committed to providing a wide range of dynamic social media marketing services provided to elevate your social media presence. We provide +5000 different services for different platforms. We specialize in platforms like Instagram, Telegram, Facebook, Twitter, and other platforms... ensuring your brand gets the spotlight it deserves. With UTSMM, your social media success is our priority!
                    </p>
                </div>
                <div className="right">

                    <div className="animation">


                        <img src={window.location.origin + '/1.svg'} />
                    </div>

                </div>
            </div>
        </section>
    )
}
