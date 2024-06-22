
import axios from 'axios';
import {  SERVER } from '../../../lib/envAccess';



// Sections 
import Poster from "./sections/poster/Poster"
import Blogs from './sections/blogs/Blogs';
import Introduction from './sections/introduction/Introduction';
import Reviews from './sections/reviews/Reviews';
import Faqs from './sections/faqs/Faqs';
import WhyChooseUs from './sections/why-choose-us/WhyChooseUs';


const MainPage = () => {
    return (
        <main className="main-page">

            <Poster />

            {/* <MainBackground /> */}

            <WhyChooseUs />

            <Introduction />

            <Reviews />

            <Blogs />

            <Faqs />


        </main >
    )
}

export default MainPage