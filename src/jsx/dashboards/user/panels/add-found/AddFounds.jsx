import React, { useState } from 'react'
import payAniamtion from "../../../../../animations/pay.json"
import amountOfMoneyAnimation from "../../../../../animations/amount-money.json"
import paymentMethodsAnimation from "../../../../../animations/payment-methods.json"
import Lottie from 'react-lottie-player'
import { Icon } from '@iconify/react'
import { useDispatch } from 'react-redux'
import { showPopUp } from '../../../../../features/popUpReducer'
import { SELECT_PAYMENT_METHOD_POP_UP } from '../../../../pop-ups/Constaints'
import SelectPaymentPopup from '../../../../pop-ups/SelectPaymentPopup'
import { useEffect } from 'react'
import SelectAmountOfMoney from '../../../../pop-ups/SelectAmountOfMoney'
import {useFetch} from '../../../../../lib/useFetch'
import Swal from "sweetalert2"
import BE_URL from "../../../../../lib/envAccess";
import parse from 'html-react-parser';
import Modal from "../../../../pop-ups/modal";

const AddFounds = () => {
    const [selectedMethod, setSelectedMethod] = useState()
    const [currentStep, setStep] = useState(1)
    const dispatcher = useDispatch()
    const [amountOfMoney, setAmountOfMoney] = useState({
        amount: 0,
        fee: 0,
        total: 0
    })

    const openSelectPaymentPopup = () => {

        const resultFunction = (item) => {
            setSelectedMethod(item)
        }

        dispatcher(showPopUp({
            type: SELECT_PAYMENT_METHOD_POP_UP,
            duration: 2000,
            component: <SelectPaymentPopup
                resultFunction={resultFunction}
                currentSelected={selectedMethod} />
        }))
    }

    const openAddAmountMoneyPopUp = () => {

        const resultFunction = (item) => {
            setAmountOfMoney(item)
        }

        dispatcher(showPopUp({
            type: SELECT_PAYMENT_METHOD_POP_UP,
            duration: 2000,
            component: <SelectAmountOfMoney
                resultFunction={resultFunction}
                feePercentage={0.02}
            />
        }))
    }

    const stepIcon = (counter) => {
        if (counter < currentStep) {
            return <Icon icon="flat-color-icons:ok" />
        } else {
            return counter
        }


    }
    const isCompleted = (stepIndex) => {
        if (stepIndex < currentStep) {
            return "completed"
        }
        else {
            return ""
        }
    }
    const isCurrentStep = (stepIndex) => {
        if (stepIndex === currentStep) {
            return "currnet-step"
        } else {
            return ""
        }
    }
    useEffect(() => {

        if (selectedMethod) setStep(2)
        if (amountOfMoney.total > 0) setStep(3)

    }, [selectedMethod, amountOfMoney])

    async function handlePayButtonSubmit() {
        Swal.fire({
            title: "Continue for paying?",
            text: "click yes for continue!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "green",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, continue"
        }).then((result) => {
            if (result.isConfirmed) {
                if (selectedMethod === "Payeer") {
                    fetch(`${BE_URL}/payeer-payments`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "X-Requested-With": "XMLHttpRequest",
                            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                        },
                        body: JSON.stringify({"amount": amountOfMoney.total})
                    })
                        .then((data) => data.json())
                        .then((data) => window.open(data.entities.payment_page_url, '_self').focus())
                        .catch(() => {
                            Swal.fire({
                                icon: 'error',
                                text: 'There was an error while fetching the data'
                            })
                        })
                } else if (selectedMethod === "Cryptomus") {
                    fetch(`${BE_URL}/cryptomus-payments`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "X-Requested-With": "XMLHttpRequest",
                            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                        },
                        body: JSON.stringify({"amount": amountOfMoney.total})
                    })
                        .then((data) => data.json())
                        .then((data) => window.open(data.entities.payment_page_url, '_self').focus())
                        .catch(() => {
                            Swal.fire({
                                icon: 'error',
                                text: 'There was an error while fetching the data'
                            })
                        })
                } else if (selectedMethod === "NowPayments") {
                    fetch(`${BE_URL}/nowpayments-payments`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "X-Requested-With": "XMLHttpRequest",
                            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                        },
                        body: JSON.stringify({"amount": amountOfMoney.total})
                    })
                        .then((data) => data.json())
                        .then((data) => window.open(data.entities.payment_page_url, '_self').focus())
                        .catch(() => {
                            Swal.fire({
                                icon: 'error',
                                text: 'There was an error while fetching the data'
                            })
                        })
                } else if (selectedMethod === "PerfectMoney") {
                    fetch(`${BE_URL}/perfectmoney-payments`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "X-Requested-With": "XMLHttpRequest",
                            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                        },
                        body: JSON.stringify({"amount": amountOfMoney.total})
                    })
                        .then((data) => data.json())
                        .then((data) => {
                            const formStr = data.entities.payment_form;
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(formStr, 'text/html');
                            const form  = doc.querySelector('form');
                            const formData = new FormData(form);

                            fetch(form.action, {
                                method: form.method.toUpperCase(),
                                body: formData,
                                mode: 'no-cors',
                                headers: {
                                    'Accept-Charset': form.getAttribute('accept-charset'),
                                    'Content-Type': form.getAttribute('content-type')
                                }
                            })
                                .then(() => window.location.reload())
                                .catch(() => {
                                    Swal.fire({
                                        icon: 'error',
                                        text: 'There was an error while fetching the data'
                                    })
                                })
                        })
                        .catch(() => {
                            Swal.fire({
                                icon: 'error',
                                text: 'There was an error while fetching the data'
                            })
                        })
                } else if (selectedMethod === "WebMoney") {
                    fetch(`${BE_URL}/webmoney-payments`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "X-Requested-With": "XMLHttpRequest",
                            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                        },
                        body: JSON.stringify({"amount": amountOfMoney.total})
                    })
                        .then((data) => data.json())
                        .then((data) => {
                            const formStr = data.entities.payment_form;
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(formStr, 'text/html');
                            const form  = doc.querySelector('form');
                            const formData = new FormData(form);

                            fetch(form.action, {
                                method: form.method.toUpperCase(),
                                body: formData,
                                mode: 'no-cors',
                                headers: {
                                    'Accept-Charset': form.getAttribute('accept-charset'),
                                    'Content-Type': form.getAttribute('content-type')
                                }
                            })
                                .then(() => window.location.reload())
                                .catch(() => {
                                    Swal.fire({
                                        icon: 'error',
                                        text: 'There was an error while fetching the data'
                                    })
                                })
                        })
                        .catch(() => {
                            Swal.fire({
                                icon: 'error',
                                text: 'There was an error while fetching the data'
                            })
                        })
                }
            }
        });
    }

    return (
        <section className='panel-add-founds'>
            <div className="road-map">
                <div className={`item ${isCurrentStep(1)}
                 ${isCompleted(1)}`}>
                    <div className="left">
                        <span className={'circle-ripple--animation'}>
                            {
                                stepIcon(1)
                            }
                        </span>
                        <div className="arrow">
                            <Icon icon="cil:arrow-bottom" />
                        </div>
                    </div>
                    <div className="right">
                        <div className="item-animation">
                            <Lottie
                                className='animation'
                                animationData={paymentMethodsAnimation}
                                play={currentStep === 1}
                                loop
                            />
                        </div>
                        <div className="item-info">
                            <h2>Choose payment Method</h2>
                            <p>
                                Choose The Payment gatway from method
                            </p>
                        </div>
                        <div className="item-input">
                            <fieldset
                                onClick={openSelectPaymentPopup}>
                                <legend>
                                    <Icon icon="ph:contactless-payment-fill" />
                                    <span>Select Method</span>
                                </legend>
                                <div className="content">
                                    <h1>
                                        {selectedMethod || "Click Here"}
                                    </h1>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <div className={`item ${isCurrentStep(2)}
                 ${isCompleted(2)}`}>
                    <div className="left">

                        <span className={'circle-ripple--animation'}>
                            {
                                stepIcon(2)
                            }
                        </span>
                        <div className="arrow">
                            <Icon icon="cil:arrow-bottom" />
                        </div>
                    </div>
                    <div className="right">
                        <div className="item-animation">
                            <Lottie
                                className='animation'
                                animationData={amountOfMoneyAnimation}
                                play={currentStep === 2}
                                loop
                            />
                        </div>
                        <div className="item-info">
                            <h2>Enter Your Amonut</h2>
                            <p>
                                Please add ammount
                            </p>
                        </div>
                        <div className="item-input">
                            <fieldset
                                onClick={openAddAmountMoneyPopUp}>
                                <legend>
                                    <Icon icon="healthicons:money-bag" />
                                    <span>Add Amount</span>
                                </legend>
                                <div className="content">
                                    <h1>${amountOfMoney.total}</h1>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <div className={`item ${isCurrentStep(3)}
                 ${isCompleted(3)}`}>
                    <div className="left">
                        <span className={'circle-ripple--animation'}>
                            {
                                stepIcon(3)
                            }
                        </span>
                        <div className="arrow">
                            <Icon icon="cil:arrow-bottom" />
                        </div>
                    </div>
                    <div className="right">
                        <div className="item-animation">
                            <Lottie
                                className='animation'
                                animationData={payAniamtion}
                                play={currentStep === 3}
                                loop
                            />
                        </div>
                        <div className="item-info">
                            <h2>Pay The Payment</h2>
                            <p>
                                Congratulations! You Are In Last Step!
                            </p>
                        </div>
                        <div className="item-input">
                            <button
                                onClick={
                                    () =>
                                        handlePayButtonSubmit()}
                                className='pay-button'>
                                <span>Click To Pay</span>
                                <Icon icon="formkit:submit" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddFounds
