// Importing part
import {Icon} from "@iconify/react";
import Table from "../../../../cutsome-components/table/Table";
import TableHeader from "../../../../cutsome-components/table/components/TableHeader";
import ItemHeader from "../../../../cutsome-components/table/components/ItemHeader";
import TableBody from "../../../../cutsome-components/table/components/TableBody";
import Row from "../../../../cutsome-components/table/components/Row";
import Property from "../../../../cutsome-components/table/components/Property";
import TablePaginations from "../../../../cutsome-components/table/components/TablePaginations";
import ResponsivePagination from "react-responsive-pagination";
import {useFetch} from "../../../../../lib/useFetch";
import {useState} from "react";
import {showPopUp} from "../../../../../features/popUpReducer";
import {ADMIN_PANEL_CREATE_BLOG} from "../../../../pop-ups/Constaints";
import {useDispatch} from "react-redux";
import InfoModal from "./component/infoModal";
import Swal from "sweetalert2";

// Creating and exporting question section of admin panel as default
export default function Question() {
    // Defining states of component
    const [currentPage, setCurrentPage] = useState(1);
    const [customLoading, setCustomLoading] = useState(false);

    // Fetching data
    const [data, error, loading, setUrl, refresh] = useFetch(`https://utsmm.liara.run/api/admin/questions`)

    // Defining dispatcher of modals
    const dispatcher = useDispatch()

    // Defining headers to render
    const headerList = [
        "ID",
        "Name",
        "Email",
        "Created At",
        "Answered At",
        "info",
        "Controls",
    ]

    // Defining function for buttons which toggle modals
    const handleInfoClick = (id) => {
        dispatcher(showPopUp({
            type: ADMIN_PANEL_CREATE_BLOG,
            duration: 2000,
            component: <InfoModal id={id} />
        }))
    }

    const handleAnswerClick = (id) => {
        Swal.fire({
            input: "textarea",
            inputLabel: "Message",
            inputAttributes: {minLength: 10},
            inputPlaceholder: "Type your message here...",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: "green",
            denyButtonColor: "red"
        }).then(what => {
            if (what.isConfirmed) {
                setCustomLoading(true);
                const message = what.value;
                fetch(`https://utsmm.liara.run/api/admin/questions/${id}/answers`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept" : "application/json",
                        "X-Requested-With" : "XMLHttpRequest",
                        "Authorization" : `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                    },
                    body: JSON.stringify({"answer": message})
                })
                    .then((data) => data.json())
                    .then(resp => {
                        console.log(resp)
                        setCustomLoading(false);
                        if (resp.message === "Unauthenticated.") {
                            Swal.fire({
                                icon: 'error',
                                text: 'Unauthenticated.'
                            });
                        } else {
                            Swal.fire({
                                icon: 'success',
                                text: 'The question is answered now'
                            });

                            refresh();
                        }
                    })
                    .catch(() => {
                        setCustomLoading(false);
                        Swal.fire({
                            icon: 'error',
                            text: 'There was a problem fetching the data'
                        });
                    })
            }
        })
    }

    // Returning JSX
    return (
        <div className='admin-panel-blogs panel-section'>
            <h2 className="blogs-header">
                <h1 className="left">
                    Questions
                </h1>
            </h2>
            <div className="blogs-body relative">
                <div className={'loading'} data-loading={customLoading}>
                    <Icon icon={'eos-icons:loading'} width={40} href={40}/>
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
                            (!loading && !error) ? data?.entities.questions.map((item, index) => {
                                    return <Row key={index}>
                                        <Property>
                                            <div className="property-header">
                                                {headerList[0]}
                                            </div>
                                            <div className="property-body">
                                                {item.id}
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headerList[1]}
                                            </div>
                                            <div className="property-body">
                                                {item.full_name}
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headerList[2]}
                                            </div>
                                            <div className="property-body">
                                                {item.email}
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headerList[3]}
                                            </div>
                                            <div className="property-body">
                                                {new Date(item.created_at).toLocaleDateString()}
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headerList[4]}
                                            </div>
                                            <div className="property-body">
                                                {new Date(item.answered_at).toLocaleDateString()}
                                            </div>
                                        </Property>
                                        <Property>
                                            <div className="property-header">
                                                {headerList[5]}
                                            </div>
                                            <div className="property-body">
                                                <button onClick={() => handleInfoClick(item.id)} style={{
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
                                                <button onClick={() => handleAnswerClick(item.id)} style={{
                                                    display: 'block',
                                                    borderRadius: '45rem',
                                                    backgroundColor: 'orange',
                                                    color: 'white',
                                                    paddingBlock: '10px',
                                                    paddingInline: '15px',
                                                }}>
                                                    <Icon icon="material-symbols:info"/>
                                                    Answer
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
                                                total={Math.round(data.entities.count / 10)}
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
    );
}