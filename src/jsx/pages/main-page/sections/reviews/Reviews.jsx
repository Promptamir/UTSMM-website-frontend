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






const getRandomColors = () => {
    let all = [];
    for (let i = 0; i < 2; i++) {
        const red = Math.random() * 250;
        const green = Math.random() * 250;
        const blue = Math.random() * 250;
        all.push({ red, green, blue })
    }
    return all

}



export default function Reviews() {

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
                        {getRandomColors().map(color => {
                            return <SwiperSlide>
                                <div className="item"
                                    style={
                                        {
                                            backgroundColor:
                                                `rgb(${color.red},${color.green},${color.blue})`
                                        }}>
                                    <div className="item-header">
                                        <img src={require("../../../../../images/main-page/customers-reviews/comments/1.png")} className="avatar" />
                                        <div className="info">
                                            <h1>Anita</h1>
                                            <small>2 Year Customer</small>
                                        </div>
                                    </div>
                                    <div className="item-body">
                                        <h1>
                                            Best Supporting
                                        </h1>
                                        <p>
                                            It is a long established fact that a reader will be distracted by
                                            the readable content of a page when looking at its layout.
                                        </p>

                                        <div className="rating">
                                            <Icon icon="ph:star-fill" />
                                            <span>5 Star</span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        })}


                        <div className="swiper-controlls ">
                            <div className="prev-arrow arrow">
                                <Icon icon="raphael:arrowleft" />
                            </div>
                            <div className="bullet-container">

                            </div>
                            <div className="next-arrow arrow">
                                <Icon icon="raphael:arrowleft" rotate={2} />
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

                        <SwiperSlide>

                            <div className="progressers">
                                <h1>
                                    <span> Anita </span>
                                    Reviewed Our Services
                                </h1>
                                <div className="item">
                                    <h2 className='header'>
                                        <Icon icon="fluent:thumb-like-24-filled" />
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
                                        <Icon icon="carbon:view-filled" />
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
                                        <Icon icon="material-symbols:amp-stories" />
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
                                        <Icon icon="mdi:comment" />
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
                                        <Icon icon="icon-park-solid:effects" />
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


                        <SwiperSlide>

                            <div className="progressers">
                                <h1>
                                    <span> Anita </span>
                                    Reviewed Our Services
                                </h1>
                                <div className="item">
                                    <h2 className='header'>
                                        <Icon icon="fluent:thumb-like-24-filled" />
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
                                        <Icon icon="carbon:view-filled" />
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
                                        <Icon icon="material-symbols:amp-stories" />
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
                                        <Icon icon="mdi:comment" />
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
                                        <Icon icon="icon-park-solid:effects" />
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



                    </Swiper>

                </div>
            </div>

        </section>
    )
}

