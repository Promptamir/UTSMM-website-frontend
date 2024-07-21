import { Icon } from '@iconify/react';
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
import MaxLineText from '../../../../cutsome-components/Text/MaxLineText';
import { useFetch } from '../../../../../lib/useFetch';
import BE_URL from "../../../../../lib/envAccess";
import {Link} from "react-router-dom";






export default function Blogs() {
    const [data, error, loading, setUrl, refreshData, refetch] = useFetch(`${BE_URL}/index`);


    return (
        <div className="blogs">
            <h1>
                Latest <span>Blogs</span> & Articles <br />
                Read & <span>Know Everything !</span>
            </h1>
            {
                (loading)
                    ? <Icon icon={'eos-icons:loading'} width={40} href={40} />
                    : (error)
                        ? <h1>There was an error while fetching the data</h1>
                        : <div className="items">
                        <Swiper
                            modules={[
                                Navigation,
                                Pagination,
                                Scrollbar,
                                A11y,
                                EffectCoverflow]}
                            spaceBetween={20}
                            pagination={
                                {
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
                                rotate: -5,
                                stretch: 0,
                                depth: 350,
                                modifier: 1,
                                slideShadows: false,
                            }}
                            breakpoints={{
                                380: {
                                    slidesPerView: 1,
                                },
                                500: {
                                    slidesPerView: 1.25,
                                },
                                639: {
                                    slidesPerView: 1.75,
                                },
                                865: {
                                    slidesPerView: 2
                                },
                                1000: {
                                    slidesPerView: 3
                                },
                                1500: {
                                    slidesPerView: 4
                                }
                            }}
                        >
                            {
                                data.entities.blogs.map((item, index) => {
                                    return <SwiperSlide
                                        key={index}>
                                        <Link className="item" to={`/blog/${item.slug}`}>
                                            <div className="item-header">
                                                <img
                                                    className='image'
                                                    src={item.image}/>
                                            </div>
                                            <div className="item-body">
                                                <MaxLineText content={item.title} maxLine={1} isMarquee={false}
                                                             targetClass={"title"}/>
                                                <MaxLineText content={item.short_description} maxLine={4}
                                                             targetClass={"excerpt"}/>
                                            </div>
                                            <div className="item-buttons">
                                                <div className="left">
                                                    <button>
                                                        <Icon icon="fa-solid:comments" color="orange"/>
                                                    </button>
                                                    <button>
                                                        <Icon icon="ic:sharp-share" color="green"/>
                                                    </button>
                                                    <button>
                                                        <Icon icon="fluent:thumb-like-16-filled" color="red"/>
                                                    </button>
                                                </div>
                                                <div className="right">
                                                    <button className="submit">
                                                <span>
                                                    Read More
                                                </span>
                                                        <Icon icon="iconamoon:send-fill"/>
                                                    </button>
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                })
                            }
                            <div className="swiper-controlls">
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
            }
        </div>
    )
}
