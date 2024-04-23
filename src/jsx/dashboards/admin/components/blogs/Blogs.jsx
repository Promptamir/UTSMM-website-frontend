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
import { API, SERVER } from '../../../../../lib/envAccess'
import TablePaginations from "../../../../cutsome-components/table/components/TablePaginations";
import ResponsivePagination from 'react-responsive-pagination';
import { showError, showSuccess } from '../../../../../lib/alertHandler'
import Swal from "sweetalert2";


export default function Blogs() {


    const [currentPage, setCurrentPage] = useState(1)


    const [data, error, loading, setUrl, refresh] = useFetch(`https://utsmm.liara.run/api/blogs?page=${currentPage}`)

    const dispatcher = useDispatch()




    const headerList = [
        "ID",
        "Image",
        "Title",
        "Description",
        "Likes",
        "Published",
        "Controlls"
    ]





    const handleCreateNewBlogClick = () => {
        dispatcher(showPopUp({
            type: ADMIN_PANEL_CREATE_BLOG,
            duration: 2000,
            component: <CreateNewBlogPopUp refresh={refresh} />
        }))
    }

    const handleOnEditBlogClick = (blog) => {
        dispatcher(showPopUp({
            type: ADMIN_PANEL_CREATE_BLOG,
            duration: 2000,
            component: <EditBlogPopUp blog={blog} refresh={refresh} />
        }))
    }

    const onPublishedClick = (blog, published) => {
        fetch(`https://utsmm.liara.run/api/admin/blogs/${blog.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json",
                "X-Requested-With" : "XMLHttpRequest",
                "Authorization" : `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            },
            body: JSON.stringify({
                "title": blog.title,
                "short_description": blog.short_description,
                "content": blog.content,
                "keywords": blog.keywords,
                "status": (published) ? 1 : 0
            })
        })
            .then((data) => data.json())
            .then((data) => {
                Swal.fire({
                    icon: 'success',
                    title: 'The blog is published now.'
                })

                refresh();
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'There was an error while fetching the data'
                })
            })
    }


    const handleOnDelete = (blog) => {
        fetch(`https://utsmm.liara.run/api/admin/blogs/${blog.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json",
                "X-Requested-With" : "XMLHttpRequest",
                "Authorization" : `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        })
            .then((data) => data.json())
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'The blog is deleted now.'
                })

                refresh();
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'There was an error while fetching the data'
                })
            })
    }


    return (
        <div className='admin-panel-blogs panel-section'>
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
            <div className="blogs-body">
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
                                                src={SERVER.BASE_URL + blog.image}
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
                                                content={blog.title} />
                                        </div>
                                    </Property>
                                    <Property>
                                        <div className="property-header">
                                            {headerList[3]}
                                        </div>
                                        <div className="property-body">
                                            <MaxLineText
                                                maxLine={4}
                                                content={blog.short_description} />
                                        </div>
                                    </Property>
                                    <Property>
                                        <div className="property-header">
                                            {headerList[4]}
                                        </div>
                                        <div className="property-body">
                                            <MaxLineText
                                                maxLine={4}
                                                content={blog.likes} />
                                        </div>
                                    </Property>
                                    <Property>
                                        <div className="property-header">
                                            {headerList[5]}
                                        </div>
                                        <div className="property-body">
                                            <Switch
                                                checked={blog.status === 1}
                                                onChange={() => {
                                                    onPublishedClick(blog, (blog.status !== 1))
                                                }} />
                                        </div>
                                    </Property>
                                    <Property>
                                        <div className="property-header">
                                            {headerList[6]}
                                        </div>
                                        <div className="property-body controlls-property">
                                            <button
                                                onClick={() => { handleOnEditBlogClick(blog) }}>
                                                <Icon icon="bxs:edit" />
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                onClick={() => handleOnDelete(blog)}
                                            >
                                                <Icon icon="fluent:delete-48-filled" />
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
                    {
                        (loading)
                            ? <h1>Loading...</h1>
                            : (error)
                                ? <h1>Error</h1>
                                : (data.entities.count && data.entities.count/15 !== 1)
                                ? (
                                    <TablePaginations>
                                        <ResponsivePagination
                                            current={currentPage}
                                            total={data.entities.count/15}
                                            onPageChange={(pageNumber) => {
                                                setCurrentPage(pageNumber);
                                                refresh();
                                            }}
                                        />
                                    </TablePaginations>
                                ) : false
                    }
                </Table>
            </div>
        </div>
    )
}
