// Importing part
import '../../../css/pages/comment/commentPageStyle.css';
import {useState} from "react";
import {useFetch} from "../../../lib/useFetch";
import ResponsivePagination from "react-responsive-pagination";
import TablePaginations from "../../cutsome-components/table/components/TablePaginations";
import {Icon} from "@iconify/react";
import BE_URL from "../../../lib/envAccess";

// Creating and exporting comment page as default
export default function CommentPage() {
    // Defining states of the component
    const [stars, setStars] = useState('');
    const [content, setContent] = useState('');
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState('');
    const [formSuccses, setFormSuccses] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [data, error, loading, setUrl, refresh] = useFetch(`${BE_URL}/comments?page=${currentPage}`);

    // Returning JSX
    return (
        <div className={'comment-page'}>
            <div className={'container'}>
                <form action="#" className={'form'} onSubmit={(event) => {
                    event.preventDefault();

                    setFormLoading(true);
                    fetch(`${BE_URL}/comments`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept" : "application/json",
                            "X-Requested-With" : "XMLHttpRequest",
                            "Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                        },
                        body: JSON.stringify({
                            "content": content,
                            "stars": Number(stars)
                        })
                    })
                        .then((data) => data.json())
                        .then((data) => {
                            if (data.message === 'Unauthenticated.') {
                                setFormLoading(false);
                                setFormError('Unauthenticated');
                                setFormSuccses('');
                            } else {
                                setFormLoading(false);
                                setFormError('');
                                setFormSuccses('Your comment has been submitted.');
                                refresh();
                            }
                        })
                        .catch(() => {
                            setFormLoading(false);
                            setFormError('An error happened while fetching the data');
                            setFormSuccses('');
                        })
                }}>
                    <h1 className={'form-title'}>Comment</h1>
                    <input required onChange={(e) => setStars(e.target.value)} className={'form-input'} placeholder={'Stars'} id={'stars'} type={'number'} max={5} min={1} />
                    <textarea required onChange={(e) => setContent(e.target.value)} name="content" className="form-input" id={'content'} placeholder={'Message'}/>
                    {formError !== '' && <div className={'form-input-error'}>{formError}</div>}
                    {formSuccses !== '' && <div className={'form-input-succses'}>{formSuccses}</div>}
                    <button disabled={formLoading} className={'form-submit-btn'}>submit</button>
                </form>
            </div>
            {
                (loading)
                    ? <h1>Loading</h1>
                    : (error)
                        ? <h1>Error</h1>
                        : (
                            <div className={'comment-table-holder'}>
                                <div className={'comment-table'}>
                                    <div className={'comment-table-row'}>
                                        <div className={'comment-table-item'}>Name</div>
                                        <div className={'comment-table-item'}>Comment</div>
                                        <div className={'comment-table-item'}>Stars</div>
                                    </div>
                                    {
                                        data.entities.comments.map((item, index) => (
                                            <div className={'comment-table-row'} key={index}>
                                                <div className={'comment-table-item'}>{item.user.name}</div>
                                                <div className={'comment-table-item'}>{item.content}</div>
                                                <div className={'comment-table-item stars'}>
                                                    {new Array(item.stars).fill('').map((item, index) => (
                                                        <Icon icon={'material-symbols:star'} width={30} height={30}
                                                              key={index} color={'currentColor'}/>
                                                    ))}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
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
                                                                setUrl(`${BE_URL}/comments?page=${pageNumber}`)
                                                                refresh();
                                                            }}
                                                        />
                                                    </TablePaginations>
                                                ) : false
                                }
                            </div>
                        )
            }
        </div>
    );
}