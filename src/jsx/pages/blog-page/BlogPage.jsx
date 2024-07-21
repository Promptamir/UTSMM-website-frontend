import Lottie from "react-lottie-player"
import blogsBackgroud from "../../../animations/main-page/blogs-wave.json"
import '../../../css/pages/blog-page/BlogPageStyle.css';
import {useState} from "react";
import BE_URL from '../../../lib/envAccess';
import TablePaginations from "../../cutsome-components/table/components/TablePaginations";
import ResponsivePagination from "react-responsive-pagination";
import {useFetch} from "../../../lib/useFetch";
import {Link} from "react-router-dom";
import Pagination from "../../primaries/pagination";

const BlogPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, error, loading, setUrl, refreshData, refetch] = useFetch(`${BE_URL}/blogs?page=${currentPage}`);

    return (
        <main className="blog-page">
            <div className="intro">
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
                                : (data.entities.blogs.length === 0)
                                    ? <h1>There is nothing to show</h1>
                                    : data.entities.blogs.map((item, index) => (
                                        <Link className={'blog-card'} to={`/blog/${item.slug}`} key={index}>
                                            <img className={'blog-img'} src={item.image} alt={item.title} />
                                            <div className={'blog-content'}>
                                                <h1 className={'blog-title'}>{item.title}</h1>
                                                <p className={'blog-p'}>{item.short_description}</p>
                                                <p className={'blog-date'}>{new Date(item.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </Link>
                                ))
                    }
                </div>
                <Pagination
                    error={error}
                    refetch={refetch}
                    setUrl={setUrl}
                    count={data?.entities?.count}
                    loading={loading}
                    apiEndpoint={'blogs'}
                />
            </div>
        </main>
    )
}

export default BlogPage