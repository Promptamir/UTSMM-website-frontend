import React, {useState} from 'react'
import Table from "../../../../cutsome-components/table/Table"
import ItemHeader from "../../../../cutsome-components/table/components/ItemHeader"
import Row from "../../../../cutsome-components/table/components/Row"
import TableBody from "../../../../cutsome-components/table/components/TableBody"
import TableHeader from "../../../../cutsome-components/table/components/TableHeader"
import Property from "../../../../cutsome-components/table/components/Property"
import { deletE, useFetch } from '../../../../../lib/useFetch'
import BE_URL, { API, SERVER } from '../../../../../lib/envAccess'
import { Icon } from '@iconify/react'
import { useDispatch } from 'react-redux'
import CreatePlatformPopUp from '../../../../pop-ups/CreatePlatformPopUp'
import { ADMIN_PANEL_CREATE_PLATFORM } from '../../../../pop-ups/Constaints'
import { showPopUp } from '../../../../../features/popUpReducer'
import { showError, showSuccess } from '../../../../../lib/alertHandler'
import EditPlatformPopUp from '../../../../pop-ups/EditPlatformPopUp'
import InfoModal from "./components/infoModal";
import Swal from "sweetalert2";
import HandleFetchError from "../../../../../lib/handleFetchError";

export default function Platforms() {


    const [platforms, error, loading, setUrl, refresh] = useFetch(`${BE_URL}/platforms`)
    const dispatcher = useDispatch()
    const [customLoading, setCustomLoading] = useState(false);
    const headersList = [
        "Service ID",
        "Image",
        "Name",
        "",
        "Info",
        "Controls",
    ]

    const onDeleteClick = (platform) => {
        setCustomLoading(true);
        fetch(`${BE_URL}/admin/platforms/${platform.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json",
                "X-Requested-With" : "XMLHttpRequest",
                "Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
            .then((resp) => resp.json())
            .then(resp => {
                setCustomLoading(false);
                HandleFetchError({
                    data: resp,
                    lineBreak: false,
                    callbackSuccess: (message) => {
                        Swal.fire({icon: 'success', text: message})
                        refresh();
                    },
                    callbackError: (message) => Swal.fire({icon: 'error', text: message})
                })
            })
            .catch(err => {
                const errors = err?.response?.data
                showError(errors)
                setCustomLoading(false);
            })
    }

    // Defining states of modals
    const [createModalOpened, setCreateModalOpened] = useState(false);
    const [infoModalOpened, setInfoModalOpened] = useState(false);
    const [editModalOpened, setEditModalOpened] = useState(false);

    const [editModalPlatform, setEditModalPlatform] = useState(undefined);
    const [infoModalID, setInfoModalID] = useState(undefined);

    return (
        <main className='admin-panel-platforms'>
            <CreatePlatformPopUp
                refresh={refresh}
                customLoading={setCustomLoading}
                isOpened={createModalOpened}
                closeFn={() => setCreateModalOpened(false)}
            />
            {
                (infoModalID)
                    ? (
                        <InfoModal
                            id={infoModalID}
                            isOpened={infoModalOpened}
                            closeFn={() => setInfoModalOpened(false)}
                        />
                    ) : false
            }
            {
                (editModalPlatform)
                    ? (
                        <EditPlatformPopUp
                            refresh={refresh}
                            platform={editModalPlatform}
                            customLoading={setCustomLoading}
                            isOpened={editModalOpened}
                            closeFn={() => setEditModalOpened(false)}
                        />
                    ) : false
            }
            <h2 className="platforms-header">
                <h1 className="left">
                    Platform
                </h1>
                <div className="right">
                    <button onClick={() => setCreateModalOpened(true)}>
                        <Icon icon="wpf:create-new" />
                        <span>Create New</span>
                    </button>
                </div>
            </h2>
            <div className="platform-body relative">
                <div className={'loading'} data-loading={customLoading}>
                    <Icon icon={'eos-icons:loading'} width={40} href={40}/>
                </div>
                <Table columnsStyle={"7rem 5rem 5rem 30rem 1fr 8rem"}>
                    <TableHeader>
                        {
                            headersList.map((record, index) => {
                                return <ItemHeader key={index}>
                                    {record}
                                </ItemHeader>
                            })
                        }
                    </TableHeader>
                    {
                        <TableBody>
                            {
                                (loading)
                                    ? <h1>Loading</h1>
                                    : (error)
                                        ? <h1>There was an error</h1>
                                        : platforms.entities.platforms.map((item, index) => (
                                            <Row key={index}>
                                                <Property>
                                                    <div className="property-header">
                                                        {headersList[0]}
                                                    </div>
                                                    <div className="property-body">
                                                        {item.id}
                                                    </div>
                                                </Property>
                                                <Property>
                                                    <div className="property-header">
                                                        {headersList[1]}
                                                    </div>
                                                    <div className="property-body image">
                                                        <img src={item.image}/>
                                                    </div>
                                                </Property>
                                                <Property>
                                                    <div className="property-header">
                                                        {headersList[2]}
                                                    </div>
                                                    <div className="property-body ">
                                                        {item.title}
                                                    </div>
                                                </Property>
                                                <Property>
                                                    <div className="property-header">
                                                        {headersList[3]}
                                                    </div>
                                                    <div className="property-body"/>
                                                </Property>
                                                <Property>
                                                    <div className="property-header">
                                                        {headersList[4]}
                                                    </div>
                                                    <div className="property-body">
                                                        <button
                                                            className="edit"
                                                            onClick={() => {
                                                                setInfoModalOpened(true)
                                                                setInfoModalID(item.id)
                                                            }}
                                                            style={{
                                                                display: 'block',
                                                                borderRadius: '45rem',
                                                                backgroundColor: 'blueviolet',
                                                                color: 'white',
                                                                paddingBlock: '10px',
                                                                paddingInline: '15px'
                                                            }}
                                                        >
                                                            <span>Info</span>
                                                        </button>
                                                    </div>
                                                </Property>
                                                <Property>
                                                    <div className="property-header">
                                                        {headersList[5]}
                                                    </div>
                                                    <div className="property-body buttons">
                                                        <button
                                                            className="edit"
                                                            onClick={() => {
                                                                setEditModalOpened(true);
                                                                setEditModalPlatform(item);
                                                            }}
                                                        >
                                                            <Icon icon="fluent:delete-32-filled"/>
                                                            <span>
                                                        Edit
                                                    </span>
                                                        </button>
                                                        <button
                                                            className="delete"
                                                            onClick={() => onDeleteClick(item)}
                                                        >
                                                            <Icon icon="icon-park-outline:transaction-order"/>
                                                            <span>Delete</span>
                                                        </button>
                                                    </div>
                                                </Property>

                                            </Row>
                                        ))
                            }

                        </TableBody>
                    }


                </Table>
            </div>

        </main>
    )
}
