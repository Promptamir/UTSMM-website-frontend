// Importing part
import {useEffect, useState} from "react";
import {Icon} from "@iconify/react";
import BE_URL from "../../../../../lib/envAccess";
import Swal from "sweetalert2";
import {showError} from "../../../../../lib/alertHandler";
import Modal from "../../../../pop-ups/modal";
import HandleFetchError from "../../../../../lib/handleFetchError";

// Creating and exporting table component of faqs panel in admin dashboard as deafult
export default function Table({apiEndpoint, open = true, modalType}) {
    // Defining states of component
    const [isOpened, setOpened] = useState(open);
    const [data, setData] = useState([]);
    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState((open));
    const [val, setVal] = useState(0);
    const [editModalOpened, setEditModalOpened] = useState(false);

    const [selectedFaq, setSelectedFaq] = useState(undefined);
    const [question, setQuestion] = useState(undefined);
    const [answer, setAnswer] = useState(undefined);
    const [order, setOrder] = useState(undefined);

    const [modalOpened, setModalOpened] = useState(false);
    const [questionPOST, setQuestionPOST] = useState(undefined);
    const [answerPOST, setAnswerPOST] = useState(undefined);
    const [orderPOST, setOrderPOST] = useState(undefined);

    // Defining a function to refetch the data
    const refetch = () => setVal(prevState => prevState + 1);

    // Using useEffect to set defaultValues of form in modal
    useEffect(() => {
        if (selectedFaq) {
            setQuestion(selectedFaq.question);
            setAnswer(selectedFaq.answer);
            setOrder(selectedFaq.order);
        }
    }, [selectedFaq])

    // Using useEffect hook to fetch data
    useEffect(() => {
        if (!isOpened) {
            fetch(`${BE_URL}/${apiEndpoint}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    setLoading(false);
                    setData(data);
                    setError(undefined);
                })
                .catch(() => {
                    setLoading(false);
                    setData([]);
                    setError('There was an error while fetching the data')
                })
        }
    }, [isOpened, val]);

    // Defining headers of tables to render
    const tableHeader = ['ID', 'Question', 'Answer', 'Type', 'Order', 'Action'];

    // Returning JSX
    return (
        <div>
            <Modal
                closeFn={() => setModalOpened(false)}
                title={'Add New Faq'}
                isOpened={modalOpened}
            >
                <form onSubmit={(e) => {
                    e.preventDefault();

                    fetch(`${BE_URL}/admin/${modalType}-faqs`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "X-Requested-With": "XMLHttpRequest",
                            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                        },
                        body: JSON.stringify({
                            "question": questionPOST,
                            "answer": answerPOST,
                            "order": orderPOST
                        })
                    })
                        .then((resp) => resp.json())
                        .then(resp => {
                            setModalOpened(false);
                            HandleFetchError({
                                data: resp,
                                lineBreak: false,
                                callbackSuccess: (message) => {
                                    Swal.fire({icon: 'success', text: message})
                                    refetch();
                                },
                                callbackError: (message) => Swal.fire({icon: 'error', text: message})
                            })
                        })
                        .catch(() => {
                            setModalOpened(false);
                            Swal.fire({
                                icon: 'error',
                                text: 'There was an error while fetching the data'
                            })
                        })
                }} className={'form w-full'} action="#">
                    <label htmlFor="question" className={'label'}>Question</label>
                    <textarea
                        onChange={(e) => setQuestionPOST(e.target.value)}
                        id={'question'}
                        name={'question'}
                        required
                        placeholder={'Write your question here'}
                        minLength={10}
                        className={'input'}
                    />
                    <label htmlFor="answer" className={'label'}>Answer</label>
                    <textarea
                        onChange={(e) => setAnswerPOST(e.target.value)}
                        id={'answer'}
                        name={'answer'}
                        required
                        placeholder={'Write your answer here'}
                        minLength={10}
                        className={'input'}
                    />
                    <label htmlFor="order" className={'label'}>Order</label>
                    <input
                        onChange={(e) => setOrderPOST(e.target.value)}
                        type={'number'}
                        id={'order'}
                        name={'order'}
                        required
                        placeholder={'Write your order here'}
                        minLength={1}
                        className={'input'}
                    />
                    <button className={'submit-btn'}>Submit</button>
                </form>
            </Modal>
            <div className={'text-row'}>
                <h1 className={'title'}>{modalType.toString().toUpperCase()} FAQs</h1>
                <button
                    className={'add-btn'}
                    onClick={() => setModalOpened(true)}
                >
                    Add
                </button>
            </div>
            <div>
                <Modal isOpened={editModalOpened} title={'Edit'} closeFn={() => setEditModalOpened(false)}>
                    <form onSubmit={(e) => {
                        e.preventDefault();

                        setLoading(true);
                        setEditModalOpened(false);

                        fetch(`${BE_URL}/admin/faqs/${selectedFaq.id}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json",
                                "X-Requested-With": "XMLHttpRequest",
                                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                            },
                            body: JSON.stringify({
                                "_method": "PUT",
                                "question": question,
                                "answer": answer,
                                "order": order
                            })
                        })
                            .then((resp) => resp.json())
                            .then(resp => {
                                setLoading(false);
                                HandleFetchError({
                                    data: resp,
                                    lineBreak: false,
                                    callbackSuccess: (message) => {
                                        Swal.fire({icon: 'success', text: message})
                                        refetch();
                                    },
                                    callbackError: (message) => Swal.fire({icon: 'error', text: message})
                                })
                            })
                            .catch(() => {
                                setLoading(false);
                                Swal.fire({
                                    icon: 'error',
                                    text: 'There was an error while fetching the data'
                                })
                            })
                    }} className={'form w-full'} action="#">
                        <label htmlFor="question" className={'label'}>Question</label>
                        <textarea
                            onChange={(e) => setQuestion(e.target.value)}
                            defaultValue={question}
                            id={'question'}
                            name={'question'}
                            required
                            placeholder={'Write your question here'}
                            minLength={10}
                            className={'input'}
                        />
                        <label htmlFor="answer" className={'label'}>Answer</label>
                        <textarea
                            onChange={(e) => setAnswer(e.target.value)}
                            defaultValue={answer}
                            id={'answer'}
                            name={'answer'}
                            required
                            placeholder={'Write your answer here'}
                            minLength={10}
                            className={'input'}
                        />
                        <label htmlFor="order" className={'label'}>Order</label>
                        <input
                            onChange={(e) => setOrder(e.target.value)}
                            defaultValue={order}
                            type={'number'}
                            id={'order'}
                            name={'order'}
                            required
                            placeholder={'Write your order here'}
                            minLength={1}
                            className={'input'}
                        />
                        <button className={'submit-btn'}>Submit</button>
                    </form>
                </Modal>
                <div className={'table'}>
                    <div data-open={isOpened} className={'custom-loading'}>
                        <button onClick={() => setOpened(false)} className={'result-btn'}>Click Here to show the
                            results
                        </button>
                    </div>
                    <div className={'header'}>
                        {
                            tableHeader.map((item, index) => (
                                <div className={'item'} key={index}>{item}</div>
                            ))
                        }
                    </div>
                    {
                        (loading)
                            ? (
                                <div className={'table-loading'}>
                                    <Icon icon={'eos-icons:loading'} width={40} height={40}/>
                                </div>
                            ) : (error)
                                ? (
                                    <div className={'table-error'}>
                                        <p>There was an error while fetching the data</p>
                                    </div>
                                ) : (
                                    <div className={'body'}>
                                        {
                                            data?.entities?.faqs.map((item, index) => (
                                                <div className="row" key={index}>
                                                    <div className={'item text id'}>{item.id}</div>
                                                    <div className={'item text'}>{item.question}</div>
                                                    <div className={'item text'}>{item.answer}</div>
                                                    <div className={'item text'}>{item.type}</div>
                                                    <div className={'item text'}>{item.order}</div>
                                                    <div className={'item'}>
                                                        <button
                                                            className="change"
                                                            onClick={() => {
                                                                setEditModalOpened(true);
                                                                setSelectedFaq(item);
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setLoading(true)
                                                                fetch(`${BE_URL}/admin/faqs/${item.id}`, {
                                                                    method: "DELETE",
                                                                    headers: {
                                                                        "Content-Type": "application/json",
                                                                        "Accept": "application/json",
                                                                        "X-Requested-With": "XMLHttpRequest",
                                                                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                                                                    }
                                                                })
                                                                    .then((resp) => resp.json())
                                                                    .then(resp => {
                                                                        setLoading(false);
                                                                        HandleFetchError({
                                                                            data: resp,
                                                                            lineBreak: false,
                                                                            callbackSuccess: (message) => {
                                                                                Swal.fire({icon: 'success', text: message})
                                                                                refetch();
                                                                            },
                                                                            callbackError: (message) => Swal.fire({icon: 'error', text: message})
                                                                        })
                                                                    })
                                                                    .catch(() => {
                                                                        setLoading(false);
                                                                        Swal.fire({
                                                                            icon: 'error',
                                                                            text: 'There was an error while fetching the data'
                                                                        })
                                                                    })
                                                            }}
                                                            className="delete"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                    }
                </div>
            </div>
        </div>
    );
}