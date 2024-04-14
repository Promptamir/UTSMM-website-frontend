import Lottie from "react-lottie-player"
import blogsBackgroud from "../../../animations/main-page/blogs-wave.json"
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import '../../../css/pages/blog-page/BlogPageStyle.css';
import {useEffect, useState} from "react";

const BlogPage = () => {
    const [paginationNumber, setPaginationNumber] = useState(1);

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['Blog'],
        queryFn: async () => {
            const {data} = await axios.get(`https://utsmm.liara.run/api/blogs?page=${paginationNumber}`);
            return data.entities.blogs;
        }
    });

    return (
        <main className="blog-page">
            <div className="intro">
                <div className="background">
                    <Lottie
                        className="wave"
                        animationData={blogsBackgroud}
                        play
                        loop/>
                </div>
                <div className="left">
                    <img src={
                        window.location.origin + "/18.svg"
                    } alt=""/>

                </div>
                <div className="right">
                    <h1>SMM PANEL BLOGS</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis numquam sapiente harum
                        molestias? Architecto distinctio aperiam assumenda est minima numquam vero deserunt nobis, error
                        magni maiores recusandae, velit tempora. Esse.</p>
                </div>
            </div>
            <div>
                <div className={'blog-holder'}>
                    {
                        (isLoading)
                            ? <h1>Loading</h1>
                            : (isError)
                                ? <h1>An Error Has Happened</h1>
                                : data.slice((paginationNumber === 1) ? 0 : paginationNumber, 10*paginationNumber).map((item, index) => (
                                    <Link to={`/blog/${item.slug}`} key={index}>
                                        <img className={'blog-img'} src={`https://utsmm.liara.run/${item.image}`} alt={item.short_description} />
                                        <h1 className={'blog-title'}>{item.title}</h1>
                                        <p className={'blog-p'}>{item.short_description}</p>
                                    </Link>
                                ))
                    }
                </div>
            </div>
        </main>
    )
}

export default BlogPage