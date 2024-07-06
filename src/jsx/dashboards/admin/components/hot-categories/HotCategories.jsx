import { Icon } from '@iconify/react'
import Table from '../../../../cutsome-components/table/Table'
import TableHeader from '../../../../cutsome-components/table/components/TableHeader'
import TableBody from '../../../../cutsome-components/table/components/TableBody'
import ItemHeader from '../../../../cutsome-components/table/components/ItemHeader'
import Row from '../../../../cutsome-components/table/components/Row'
import Property from '../../../../cutsome-components/table/components/Property'
import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { showPopUp } from '../../../../../features/popUpReducer'
import { ADMIN_PANEL_CREATE_BLOG } from '../../../../pop-ups/Constaints'
import TablePaginations from "../../../../cutsome-components/table/components/TablePaginations";
import ResponsivePagination from 'react-responsive-pagination';
import {useFetch} from "../../../../../lib/useFetch";
import NewHotCatModal from "./component/NewCatModal";
import EditHotCatModal from "./component/EditCatModal";
import Swal from "sweetalert2";
import InfoHotCatModal from "./component/infoCatModal";
import BE_URL from "../../../../../lib/envAccess";

export default function HotCategories() {
    const [currentPage, setCurrentPage] = useState(1);
    const [customLoading, setCustomLoading] = useState(false);
    const [data, error, loading, setUrl, refresh] = useFetch(`${BE_URL}/admin/hot-categories?page=${currentPage}`)
    const dispatcher = useDispatch()
    const headerList = [
        "ID",
        "Title",
        "Local ID",
        "",
        "",
        "info",
        "Controls",
    ]

    const handleCreateNewCatClick = () => {
        dispatcher(showPopUp({
            type: ADMIN_PANEL_CREATE_BLOG,
            duration: 2000,
            component: <NewHotCatModal setCustomLoading={setCustomLoading} refresh={refresh} />
        }))
    }

    const handleEditNewCatClick = (id) => {
        dispatcher(showPopUp({
            type: ADMIN_PANEL_CREATE_BLOG,
            duration: 2000,
            component: <EditHotCatModal id={id} setCustomLoading={setCustomLoading} refresh={refresh} />
        }))
    }

    const handleInfoNewCatClick = (id) => {
        dispatcher(showPopUp({
            type: ADMIN_PANEL_CREATE_BLOG,
            duration: 2000,
            component: <InfoHotCatModal id={id} />
        }))
    }

    const handleOnDelete = (id) => {
        setCustomLoading(true);
        fetch(`${BE_URL}/admin/hot-categories/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json",
                "X-Requested-With" : "XMLHttpRequest",
                "Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
            .then((data) => data.json())
            .then((data) => {
                setCustomLoading(false);
                if (data.message === "Unauthenticated.") {
                    Swal.fire({
                        icon: 'error',
                        text: 'Unauthenticated.'
                    });
                } else {
                    Swal.fire({
                        icon: 'success',
                        text: data.message
                    });
                    refresh();
                }

                refresh();
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
            <h2 className="blogs-header">
                <h1 className="left">
                    Categories
                </h1>
                <div className="right">
                    <button onClick={handleCreateNewCatClick}>
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
                            (!loading && !error) ? data?.entities.hot_categories.map(category => {
                                    return <Row key={category.id}>
                                        <Property>
                                            <div className="property-header">
                                                {headerList[0]}
                                            </div>
                                            <div className="property-body">
                                                {category.id}
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headerList[1]}
                                            </div>
                                            <div className="property-body">
                                                {category.remote_category_title}
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headerList[2]}
                                            </div>
                                            <div className="property-body">
                                                {category.local_category_id}
                                            </div>
                                        </Property>
                                        <Property />
                                        <Property />
                                        <Property>
                                            <div className="property-header">
                                                {headerList[5]}
                                            </div>
                                            <div className="property-body">
                                                <button onClick={() => handleInfoNewCatClick(category.id)} style={{
                                                    display: 'block',
                                                    borderRadius: '45rem',
                                                    backgroundColor: 'blueviolet',
                                                    color: 'white',
                                                    paddingBlock: '10px',
                                                    paddingInline: '15px'
                                                }}>
                                                    <Icon icon="material-symbols:info"/>
                                                    Info
                                                </button>
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headerList[6]}
                                            </div>
                                            <div className="property-body">
                                                <button onClick={() => handleOnDelete(category.id)} style={{
                                                    display: 'block',
                                                    borderRadius: '45rem',
                                                    backgroundColor: 'red',
                                                    color: 'white',
                                                    paddingBlock: '10px',
                                                    paddingInline: '15px',
                                                    marginBottom: '10px'
                                                }}>
                                                    <Icon icon="fluent:delete-48-filled"/>
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() => handleEditNewCatClick(category.id)}
                                                    style={{
                                                        display: 'block',
                                                        borderRadius: '45rem',
                                                        backgroundColor: 'orange',
                                                        color: 'white',
                                                        paddingBlock: '10px',
                                                        paddingInline: '15px',
                                                    }}
                                                >
                                                    <Icon icon="bxs:edit"/>
                                                    Edit
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
                                : (data.entities.count > 15)
                                    ? (
                                        <TablePaginations>
                                            <ResponsivePagination
                                                current={currentPage}
                                                total={Math.round(data.entities.count/10)}
                                                onPageChange={(pageNumber) => {
                                                    setCurrentPage(pageNumber);
                                                    setUrl(`${BE_URL}/admin/hot-categories?page=${currentPage}`)
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
