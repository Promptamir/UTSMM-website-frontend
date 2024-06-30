
// Swiper Js
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Icon } from "@iconify/react";
import { useState } from 'react';
import { useFetch } from '../../../../lib/useFetch';
import { API, SERVER } from '../../../../lib/envAccess';
import {Link} from "react-router-dom";


export default function PopularServices() {
    return (
        <section className="suggested-services">
            <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={20}
                slidesPerView={4}
                navigation={{
                    nextEl: ".arrow-right",
                    prevEl: ".arrow-left",
                    disabledClass: "arrow-disabled"
                }}
                pagination={
                    {
                        clickable: true,
                        el: ".swiper-custom-pagination"
                    }
                }


                breakpoints={{
                    0: {
                        slidesPerView: 1.25,
                    },
                    400: {
                        slidesPerView: 2,
                    },
                    600: {
                        slidesPerView: 2.5,
                    },
                    800: {
                        slidesPerView: 3
                    },
                    1000: {
                        slidesPerView: 3.5
                    },
                    1200: {
                        slidesPerView: 4
                    },
                    1400: {
                        slidesPerView: 5
                    },
                    1600: {
                        slidesPerView: 5.5
                    },
                    1800: {
                        slidesPerView: 6
                    },
                    1900: {
                        slidesPerView: 6.5
                    }
                }}

            >
                <SwiperSlide className='first-slide slide'>
                    <Link to={'#'} className="card">
                        <div className="header">
                            <img
                                src={require("../../../../images/services-page/services/suggestions-offers/2.png")} />
                        </div>
                        <div className="body">
                            <h1>POPULAR SERVICES</h1>
                            <small>
                                New Upcoming Services , Ready For Boosting Your Account
                            </small>
                        </div>
                        <div className="button">
                            <button>
                                See all
                            </button>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide className='first-slide slide'>
                    <Link to={'#'} className="card">
                        <div className="header">
                            <img
                                src={require("../../../../images/services-page/services/suggestions-offers/2.png")} />
                        </div>
                        <div className="body">
                            <h1>POPULAR SERVICES</h1>
                            <small>
                                New Upcoming Services , Ready For Boosting Your Account
                            </small>
                        </div>
                        <div className="button">
                            <button>
                                See all
                            </button>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide className='first-slide slide'>
                    <Link to={'#'} className="card">
                        <div className="header">
                            <img
                                src={require("../../../../images/services-page/services/suggestions-offers/2.png")} />
                        </div>
                        <div className="body">
                            <h1>POPULAR SERVICES</h1>
                            <small>
                                New Upcoming Services , Ready For Boosting Your Account
                            </small>
                        </div>
                        <div className="button">
                            <button>
                                See all
                            </button>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide className='first-slide slide'>
                    <Link to={'#'} className="card">
                        <div className="header">
                            <img
                                src={require("../../../../images/services-page/services/suggestions-offers/2.png")} />
                        </div>
                        <div className="body">
                            <h1>POPULAR SERVICES</h1>
                            <small>
                                New Upcoming Services , Ready For Boosting Your Account
                            </small>
                        </div>
                        <div className="button">
                            <button>
                                See all
                            </button>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide className='first-slide slide'>
                    <Link to={'#'} className="card">
                        <div className="header">
                            <img
                                src={require("../../../../images/services-page/services/suggestions-offers/2.png")} />
                        </div>
                        <div className="body">
                            <h1>POPULAR SERVICES</h1>
                            <small>
                                New Upcoming Services , Ready For Boosting Your Account
                            </small>
                        </div>
                        <div className="button">
                            <button>
                                See all
                            </button>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide className='first-slide slide'>
                    <Link to={'#'} className="card">
                        <div className="header">
                            <img
                                src={require("../../../../images/services-page/services/suggestions-offers/2.png")} />
                        </div>
                        <div className="body">
                            <h1>POPULAR SERVICES</h1>
                            <small>
                                New Upcoming Services , Ready For Boosting Your Account
                            </small>
                        </div>
                        <div className="button">
                            <button>
                                See all
                            </button>
                        </div>
                    </Link>
                </SwiperSlide>
            </Swiper>
        </section>
    )
}
