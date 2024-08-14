import { Icon } from '@iconify/react'
import Table from '../../../../cutsome-components/table/Table'
import TableHeader from '../../../../cutsome-components/table/components/TableHeader'
import TableBody from '../../../../cutsome-components/table/components/TableBody'
import ItemHeader from '../../../../cutsome-components/table/components/ItemHeader'
import Row from '../../../../cutsome-components/table/components/Row'
import Property from '../../../../cutsome-components/table/components/Property'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import MaxLineText from '../../../../cutsome-components/Text/MaxLineText'
import Switch from "react-switch"
import { useDispatch } from 'react-redux'
import { showPopUp } from '../../../../../features/popUpReducer'
import { ADMIN_PANEL_CREATE_BLOG } from '../../../../pop-ups/Constaints'
import CreateNewBlogPopUp from '../../../../pop-ups/CreateNewBlogPopUp'
import EditBlogPopUp from '../../../../pop-ups/EditBlogPopUp'
import { deletE, put, useFetch } from "../../../../../lib/useFetch"
import BE_URL, { API, SERVER } from '../../../../../lib/envAccess'
import TablePaginations from "../../../../cutsome-components/table/components/TablePaginations";
import ResponsivePagination from 'react-responsive-pagination';
import { showError, showSuccess } from '../../../../../lib/alertHandler'
import Swal from "sweetalert2";
import Pagination from "../../../../primaries/pagination";
import HandleFetchError from "../../../../../lib/handleFetchError";


export default function Blogs() {


    const [currentPage, setCurrentPage] = useState(1);
    const [customLoading, setCustomLoading] = useState(false);


    const [data, error, loading, setUrl, refresh, refetch] = useFetch(`${BE_URL}/admin/blogs?page=${currentPage}`)

    const dispatcher = useDispatch()




    const headerList = [
        "ID",
        "Image",
        "Title",
        "Description",
        "Controlls"
    ]

    const [createBlogOpened, setCreateBlogOpened] = useState(false);
    const [editBlogOpened, setEditBlogOpened] = useState(false);
    const [editBlog, setEditBlog] = useState(undefined);



    const handleCreateNewBlogClick = () => setCreateBlogOpened(true)
    const handleOnEditBlogClick = (blog) => {
        setEditBlog(blog);
        setEditBlogOpened(true);
    }

    const handleOnDelete = (blog) => {
        setCustomLoading(true);
        fetch(`${BE_URL}/admin/blogs/${blog.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json",
                "X-Requested-With" : "XMLHttpRequest",
                "Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
            .then((data) => data.json())
            .then(() => {
                setCustomLoading(false);
                HandleFetchError({
                    data: data,
                    lineBreak: false,
                    callbackSuccess: (message) => {
                        Swal.fire({icon: 'success', text: 'The blog was deleted'})
                        refresh();
                    },
                    callbackError: (message) => Swal.fire({icon: 'error', text: message})
                })
            })
            .catch(() => {
                setCustomLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'There was an error while fetching the data'
                })
            })
    }

    return (
        <div className='admin-panel-blogs panel-section'>
            {
                (editBlog)
                    ? <EditBlogPopUp
                        setLoading={setCustomLoading}
                        blog={editBlog}
                        refresh={refresh}
                        isOpened={editBlogOpened}
                        closeFn={() => setEditBlogOpened(false)}
                    /> : false
            }
            <CreateNewBlogPopUp
                setLoading={setCustomLoading}
                refresh={refresh}
                isOpened={createBlogOpened}
                closeFn={() => setCreateBlogOpened(false)}
            />
            <h2 className="blogs-header">
                <h1 className="left">
                    Blogs
                </h1>
                <div className="right">
                    <button onClick={handleCreateNewBlogClick}>
                        <Icon icon="wpf:create-new" />
                        <span>Create New</span>
                    </button>
                </div>
            </h2>
            <div className="blogs-body relative">
                <div className={'loading'} data-loading={customLoading}>
                    <Icon icon={'eos-icons:loading'} width={40} href={40} />
                </div>
                <Table columnsStyle={"7rem 10rem 10rem 1fr  7rem 7rem 7rem"}>
                    <TableHeader>
                        {
                            headerList.map((reconrd, index) => {
                                return <ItemHeader
                                    key={index}>
                                    {reconrd}
                                </ItemHeader>
                            })
                        }
                    </TableHeader>
                    <TableBody>
                        {
                            (!loading && !error) ? data?.entities.blogs.map(blog => {
                                    return <Row key={blog.id}>
                                        <Property>
                                            <div className="property-header">
                                                {headerList[0]}
                                            </div>
                                            <div className="property-body">
                                                {blog.id}
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headerList[1]}
                                            </div>
                                            <div className="property-body" style={{width: '100%'}}>
                                                <img
                                                    src={blog.image}
                                                    style={{
                                                        width: '100%',
                                                        objectFit: 'cover',
                                                        borderRadius: '20px',
                                                        height: '100px',
                                                        maxWidth: 'none'
                                                    }}
                                                />
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headerList[2]}
                                            </div>
                                            <div className="property-body">
                                                <MaxLineText
                                                    maxLine={3}
                                                    content={blog.title}/>
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headerList[3]}
                                            </div>
                                            <div className="property-body">
                                                <span style={{
                                                    width: '250px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    display: 'block',
                                                    textOverflow: 'ellipsis'
                                                }}>{blog.short_description}</span>
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headerList[4]}
                                            </div>
                                            <div className="property-body controlls-property">
                                                <button
                                                    onClick={() => {
                                                        handleOnEditBlogClick(blog)
                                                    }}>
                                                    <Icon icon="bxs:edit"/>
                                                    <span>Edit</span>
                                                </button>
                                                <button
                                                    onClick={() => handleOnDelete(blog)}
                                                >
                                                    <Icon icon="fluent:delete-48-filled"/>
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        </Property>
                                    </Row>
                                }) :
                                (loading)
                                    ? <h1>Loading...</h1>
                                    : (error)
                                        ? <h1>Error</h1>
                                        : false
                        }

                    </TableBody>
                    <Pagination
                        error={error}
                        refetch={refetch}
                        setUrl={setUrl}
                        count={data?.entities?.count}
                        loading={loading}
                        apiEndpoint={'admin/blogs'}
                    />
                </Table>
            </div>
        </div>
    )
}
