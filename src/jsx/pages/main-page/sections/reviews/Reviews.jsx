import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    EffectCards,
    EffectCoverflow,
    Autoplay,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';




import { Icon } from '@iconify/react'
import { Progress } from 'react-sweet-progress';


import cBackground from "../../../../../images/main-page/customers-reviews/first-part/background.svg"
import Lottie from 'react-lottie-player'

import customersReviews from "../../../../../animations/main-page/main-page-comments.json"
import { useState } from 'react';
import FiledSet from '../../../../cutsome-components/Fieldset/FiledSet';
import {Link} from "react-router-dom";
import {useFetch} from "../../../../../lib/useFetch";

import BE_URL from "../../../../../lib/envAccess";




function getRandomHexColor() {
    // Generate random R, G, and B values
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);

    // Convert decimal to hex
    const hexR = randomR.toString(16).padStart(2, '0');
    const hexG = randomG.toString(16).padStart(2, '0');
    const hexB = randomB.toString(16).padStart(2, '0');

    // Concatenate and return the hex color string
    return `#${hexR}${hexG}${hexB}`;
}



export default function Reviews({data, error, loading}) {

    const [rightSwiper, setRightSwiper] = useState(null)
    return (
        <section className="customers-reviews">
            <img src={cBackground} className="background" />
            <div className="first-section">
                <div className="left">
                    <Lottie
                        className='animation'
                        animationData={customersReviews}
                        play
                        loop />
                </div>
                <div className="right">
                    <h1>
                        OUR CUSTOMERS <br />
                        <span>REVIEWS</span>  <br />
                        ABOUT  <br />
                        SERVICES <br />

                    </h1>
                    <Link to={'#'}>
                        <span>See More</span>
                        <Icon icon="icon-park-outline:right" />
                    </Link>
                </div>
            </div>
            <div className="comments">
                {
                    (loading)
                        ? <Icon icon={'eos-icons:loading'} width={40} href={40} />
                        : (error)
                            ? <h1>There was an error while fetching the data</h1>
                            : (
                                <>
                                    <div className="left">
                                        <Swiper
                                            className="mySwiper"
                                            effect={'cards'}
                                            grabCursor={true}
                                            autoplay={{
                                                delay: 5000,
                                                disableOnInteraction: false,
                                            }}
                                            onSlideChange={(swiper) => {
                                                rightSwiper.slideTo(swiper.activeIndex)
                                            }}
                                            modules={[
                                                EffectCards,
                                                Navigation,
                                                Pagination,
                                                Scrollbar,
                                                A11y,
                                                Autoplay,
                                                EffectCoverflow]}
                                            navigation={{
                                                prevEl: ".prev-arrow",
                                                nextEl: ".next-arrow",
                                                disabledClass: "false",

                                            }}
                                            pagination={
                                                {
                                                    clickable: true,
                                                    el: ".bullet-container"
                                                }}
                                        >
                                            {data.entities.comments.map(item => {
                                                return <SwiperSlide>
                                                    <div className="item"
                                                         style={{backgroundColor: getRandomHexColor()}}
                                                    >
                                                        <div className="item-header">
                                                            <img
                                                                src={item.user.avatar}
                                                                className="avatar"/>
                                                            <div className="info">
                                                                <h1>{item.user.name}</h1>
                                                            </div>
                                                        </div>
                                                        <div className="item-body">
                                                            <h1>{new Date(item.created_at).toLocaleDateString()}</h1>
                                                            <p>{item.content}</p>
                                                            <div className="rating">
                                                                <Icon icon="ph:star-fill"/>
                                                                <span>{item.stars} Star</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            })}


                                            <div className="swiper-controlls ">
                                                <div className="prev-arrow arrow">
                                                    <Icon icon="raphael:arrowleft"/>
                                                </div>
                                                <div className="bullet-container">

                                                </div>
                                                <div className="next-arrow arrow">
                                                    <Icon icon="raphael:arrowleft" rotate={2}/>
                                                </div>
                                                <div className="next-click"></div>
                                            </div>


                                        </Swiper>
                                    </div>
                                    <div className="right">
                                        <Swiper
                                            spaceBetween={0}
                                            modules={[
                                                Scrollbar,
                                                A11y]}
                                            className="mySwiper"
                                            onSwiper={swiper => setRightSwiper(swiper)}
                                        >
                                            {
                                                data.entities.comments.map((item, index) => (
                                                    <SwiperSlide kye={index}>
                                                        <div className="progressers">
                                                            <h1>
                                                                <span>{item.user.name}</span>
                                                                Reviewed Our Services
                                                            </h1>
                                                            <div className="item">
                                                                <h2 className='header'>
                                                                    <Icon icon="fluent:thumb-like-24-filled"/>
                                                                    <span>Likes</span>

                                                                </h2>
                                                                <div className="body">
                                                                    <Progress
                                                                        percent={50}
                                                                    />

                                                                </div>
                                                            </div>
                                                            <div className="item">
                                                                <h2 className='header'>
                                                                    <Icon icon="carbon:view-filled"/>
                                                                    <span>Views</span>

                                                                </h2>
                                                                <div className="body">
                                                                    <Progress
                                                                        percent={70}
                                                                    />

                                                                </div>
                                                            </div>
                                                            <div className="item">
                                                                <h2 className='header'>
                                                                    <Icon icon="material-symbols:amp-stories"/>
                                                                    <span>Stories</span>

                                                                </h2>
                                                                <div className="body">
                                                                    <Progress
                                                                        percent={70}
                                                                    />

                                                                </div>
                                                            </div>
                                                            <div className="item">
                                                                <h2 className='header'>
                                                                    <Icon icon="mdi:comment"/>
                                                                    <span>Comments</span>

                                                                </h2>
                                                                <div className="body">
                                                                    <Progress
                                                                        percent={70}
                                                                    />

                                                                </div>
                                                            </div>
                                                            <div className="item">
                                                                <h2 className='header'>
                                                                    <Icon icon="icon-park-solid:effects"/>
                                                                    <span>Effective</span>

                                                                </h2>
                                                                <div className="body">
                                                                    <Progress
                                                                        percent={70}
                                                                    />

                                                                </div>
                                                            </div>

                                                        </div>

                                                    </SwiperSlide>
                                                ))
                                            }
                                        </Swiper>

                                    </div>
                                </>
                            )
                }
            </div>

        </section>
    )
}

