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
import NewCatModal from "./component/NewCatModal";
import EditCatModal from "./component/EditCatModal";
import Swal from "sweetalert2";
import InfoCatModal from "./component/infoCatModal";
import BE_URL from "../../../../../lib/envAccess";
import Pagination from "../../../../primaries/pagination";
import HandleFetchError from "../../../../../lib/handleFetchError";

export default function Categories() {
    const [currentPage, setCurrentPage] = useState(1);
    const [customLoading, setCustomLoading] = useState(false);
    const [data, error, loading, setUrl, refresh, refetch] = useFetch(`${BE_URL}/admin/categories?page=${currentPage}`)
    const dispatcher = useDispatch()
    const headerList = [
        "ID",
        "Title",
        "Platform",
        "",
        "",
        "info",
        "Controls",
    ]

    // Defining states of component
    const [createModalOpened, setCreateModalOpened] = useState(false);
    const [editModalOpened, setEditModalOpened] = useState(false);
    const [infoModalOpened, setInfoModalOpened] = useState(false);

    const [editModalItem, setEditModalItem] = useState(undefined);
    const [infoModalID, setInfoModalID] = useState(undefined);

    const handleCreateNewCatClick = () => setCreateModalOpened(true);

    const handleEditNewCatClick = (cat) => {
        setEditModalItem(cat);
        setEditModalOpened(true);
    }

    const handleInfoNewCatClick = (id) => {
        setInfoModalOpened(true);
        setInfoModalID(id);
    }

    const handleOnDelete = (id) => {
        setCustomLoading(true);
        fetch(`${BE_URL}/admin/categories/${id}`, {
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
            <NewCatModal
                isOpened={createModalOpened}
                closeFn={() => setCreateModalOpened(false)}
                setCustomLoading={setCustomLoading}
                refresh={refresh}
            />
            {
                (editModalItem)
                    ? (
                        <EditCatModal
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
                    ? <InfoCatModal
                        id={infoModalID}
                        isOpened={infoModalOpened}
                        closeFn={() => setInfoModalOpened(false)}
                    /> : false
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
                    <Icon icon={'eos-icons:loading'} width={40} height={40} />
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
                            (loading)
                                ? <h1>Loading</h1>
                                : (error)
                                    ? <h1>There was an error while fetching the data</h1>
                                    : data?.entities.categories.map(category => {
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
                                                    {category.title}
                                                </div>
                                            </Property>
                                            <Property>
                                                <div className="property-header">
                                                    {headerList[2]}
                                                </div>
                                                <div className="property-body">
                                                    {category.platform_id}
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
                                    })
                        }
                    </TableBody>
                    <Pagination
                        error={error}
                        refetch={refetch}
                        setUrl={setUrl}
                        count={data?.entities?.count}
                        loading={loading}
                        apiEndpoint={'admin/categories'}
                    />
                </Table>
            </div>
        </div>
    )
}
