import { Icon } from '@iconify/react'
import Table from '../../../../cutsome-components/table/Table'
import TableHeader from '../../../../cutsome-components/table/components/TableHeader'
import TableBody from '../../../../cutsome-components/table/components/TableBody'
import ItemHeader from '../../../../cutsome-components/table/components/ItemHeader'
import Row from '../../../../cutsome-components/table/components/Row'
import Property from '../../../../cutsome-components/table/components/Property'
import {useState} from 'react'
import { useDispatch } from 'react-redux'
import {useFetch} from "../../../../../lib/useFetch";
import NewHotCatModal from "./component/NewCatModal";
import EditHotCatModal from "./component/EditCatModal";
import Swal from "sweetalert2";
import InfoHotCatModal from "./component/infoCatModal";
import BE_URL from "../../../../../lib/envAccess";
import Pagination from "../../../../primaries/pagination";
import HandleFetchError from "../../../../../lib/handleFetchError";

export default function HotCategories() {
    const [currentPage, setCurrentPage] = useState(1);
    const [customLoading, setCustomLoading] = useState(false);
    const [data, error, loading, setUrl, refresh, refetch] = useFetch(`${BE_URL}/admin/hot-categories?page=${currentPage}`)
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

    // Defining states of modals
    const [newHotCatModalOpened, setNewHotCatModalOpened] = useState(false);
    const [editModalOpened, setEditModalOpened] = useState(false);
    const [infoModalOpened, setInfoModalOpened] = useState(false);

    const [editModalItem, setEditModalItem] = useState(undefined);
    const [infoModalID, setInfoModalID] = useState(undefined);

    const handleCreateNewCatClick = () => setNewHotCatModalOpened(true);

    const handleEditNewCatClick = (cat) => {
        setEditModalOpened(true);
        setEditModalItem(cat);
    }

    const handleInfoNewCatClick = (id) => {
        setInfoModalOpened(true);
        setInfoModalID(id);
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
                HandleFetchError({
                    data: data,
                    lineBreak: false,
                    callbackSuccess: (message) => {
                        Swal.fire({icon: 'success', text: message})
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
            <NewHotCatModal
                isOpened={newHotCatModalOpened}
                closeFn={() => setNewHotCatModalOpened(false)}
                setCustomLoading={setCustomLoading}
                refresh={refresh}
            />
            {
                (editModalItem)
                    ? (
                        <EditHotCatModal
                            cat={editModalItem}
                            setCustomLoading={setCustomLoading}
                            refresh={refresh}
                            isOpened={editModalOpened}
                            closeFn={() => setEditModalOpened(false)}
                        />
                    ) : false
            }
            {
                (infoModalID)
                    ? (
                        <InfoHotCatModal
                            id={infoModalID}
                            isOpened={infoModalOpened}
                            closeFn={() => setInfoModalOpened(false)}
                        />
                    ) : false
            }
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
                                                    onClick={() => handleEditNewCatClick(category)}
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
                    <Pagination
                        error={error}
                        refetch={refetch}
                        setUrl={setUrl}
                        count={data?.entities?.count}
                        loading={loading}
                        apiEndpoint={'admin/hot-categories'}
                    />
                </Table>
            </div>
        </div>
    )
}
