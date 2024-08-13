
// Swiper Js
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Icon } from "@iconify/react";
import { useState } from 'react';
import { useFetch } from '../../../../lib/useFetch';
import BE_URL, { API, SERVER } from '../../../../lib/envAccess';
import {Link} from "react-router-dom";


export default function PopularServices() {
    // Fetching the data
    const [data, error, loading] = useFetch(`${BE_URL}/popular-services`);

    // Returning JSX
    return (
        <section className="suggested-services">
            {
                (loading)
                    ? (
                        <div style={{padding: '20px'}}>
                            <h1 style={{textAlign: 'center'}}>Loading</h1>
                        </div>
                    )  : (error)
                        ? (
                            <div style={{padding: '20px'}}>
                                <h1 style={{textAlign: 'center'}}>There was an error while fetching the data</h1>
                            </div>
                        ) : (
                            <Swiper
                                modules={[Navigation, Pagination, A11y]}
                                spaceBetween={20}
                                slidesPerView={4}
                                navigation={{
                                    nextEl: ".arrow-right",
                                    prevEl: ".arrow-left",
                                    disabledClass: "arrow-disabled"
                                }}
                                pagination={{clickable: true, el: ".swiper-custom-pagination"}}
                                breakpoints={{
                                    0: {slidesPerView: 1.25,},
                                    400: {slidesPerView: 2,},
                                    600: {slidesPerView: 2.5,},
                                    800: {slidesPerView: 3},
                                    1000: {slidesPerView: 3.5},
                                    1200: {slidesPerView: 4},
                                    1400: {slidesPerView: 5},
                                    1600: {slidesPerView: 5.5},
                                    1800: {slidesPerView: 6},
                                    1900: {slidesPerView: 6.5}
                                }}

                            >
                                {
                                    Object.values(data?.entities)[0].map((item, index) => (
                                        <SwiperSlide className='first-slide slide' key={index}>
                                            <Link to={`/user/dashboard/New-Order?service=${item.id}&category=${item.category_id}`}
                                                  className="card">
                                                <div className="header">
                                                    <img
                                                        src={require("../../../../images/services-page/services/suggestions-offers/2.png")}/>
                                                </div>
                                                <div className="body">
                                                    <h1 style={{
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}>{item.title}</h1>
                                                </div>
                                                <div className="button">
                                                    <button>
                                                        Order
                                                    </button>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        )
            }
        </section>
    )
}
