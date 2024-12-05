
import axios from 'axios';
import BE_URL, {  SERVER } from '../../../lib/envAccess';



// Sections 
import Poster from "./sections/poster/Poster"
import Blogs from './sections/blogs/Blogs';
import Introduction from './sections/introduction/Introduction';
import Reviews from './sections/reviews/Reviews';
import Faqs from './sections/faqs/Faqs';
import WhyChooseUs from './sections/why-choose-us/WhyChooseUs';
import {useFetch} from "../../../lib/useFetch";


const MainPage = () => {

    const [data, error, loading] = useFetch(`${BE_URL}/index`);

    return (
        <main className="main-page">
            <Poster />
            <WhyChooseUs />
            <Introduction data={data} error={error} loadingAPI={loading} />
            <Reviews data={data} error={error} loading={loading} />
            <Blogs data={data} error={error} loading={loading} />
            <Faqs data={data} error={error} loading={loading} />
        </main >
    )
}

export default MainPage