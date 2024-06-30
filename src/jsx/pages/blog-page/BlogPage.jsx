import Lottie from "react-lottie-player"
import blogsBackgroud from "../../../animations/main-page/blogs-wave.json"
import '../../../css/pages/blog-page/BlogPageStyle.css';
import {useState} from "react";
import BE_URL from '../../../lib/envAccess';
import TablePaginations from "../../cutsome-components/table/components/TablePaginations";
import ResponsivePagination from "react-responsive-pagination";
import {useFetch} from "../../../lib/useFetch";
import {Link} from "react-router-dom";

const BlogPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, error, loading, setUrl, refreshData, refetch] = useFetch(`${BE_URL}/blogs?page=${currentPage}`);

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
                        (loading)
                            ? <h1>Loading</h1>
                            : (error)
                                ? <h1>An Error Has Happened</h1>
                                : data.entities.blogs.map((item, index) => (
                                    <Link to={`/blog/${item.slug}`} key={index}>
                                        <img className={'blog-img'} src={item.image} alt={item.title} />
                                        <h1 className={'blog-title'}>{item.title}</h1>
                                        <p className={'blog-p'}>{item.short_description}</p>
                                    </Link>
                                ))
                    }
                    {
                        (loading)
                            ? <h1>Loading...</h1>
                            : (error)
                                ? <h1>Error</h1>
                                : (data.entities.count > 15)
                                    ? (
                                        <TablePaginations>
                                            <ResponsivePagination
                                                current={currentPage}
                                                total={Math.round(data.entities.count/10)}
                                                onPageChange={(pageNumber) => {
                                                    setCurrentPage(pageNumber);
                                                    setUrl(`${BE_URL}/blogs?page=${pageNumber}`);
                                                    refetch();
                                                }}
                                            />
                                        </TablePaginations>
                                    ) : false
                    }
                </div>
            </div>
        </main>
    )
}

export default BlogPage