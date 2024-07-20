import { useDispatch } from "react-redux"
import { closePopUp } from "../../features/popUpReducer"
import { Icon } from "@iconify/react"
import BE_URL, { SERVER } from "../../lib/envAccess"
import TablePaginations from "../cutsome-components/table/components/TablePaginations";
import ResponsivePagination from "react-responsive-pagination";
import {useState} from "react";






const SelectPaymentPopup = ({resultFunction, currentSelected}) => {
    const [currentPage, setCurrentPage] = useState(1);


    const dispatcher = useDispatch()

    const handleCloseButtonClick = () => {
        dispatcher(closePopUp())
    }

    const handleItemClick = (item) => {
        resultFunction(item)
        dispatcher(closePopUp())

    }



    const methods = [
        "Payeer",
        "Cryptomus",
        "NowPayments",
        "PerfectMoney",
        "WebMoney"
    ];




    return (
        <div className='select-payment-method-pop-up'>
            <button className="close-button"
                onClick={handleCloseButtonClick}>
                <Icon icon="mingcute:close-fill" />
            </button>

            <div className="pop-up-header">
                <h1>
                    Select Payment Method
                </h1>
            </div>
            <div className="pop-up-body" style={{
                height: '25vh',
                overflow: 'auto'
            }}>
                {
                    methods.map((item, index) => {
                        return <div
                            className={`item ${item === currentSelected}`}
                            key={index}
                            onClick={() => handleItemClick(item)}
                        >
                            <span>{index} - </span>
                            <p>
                                {item}
                            </p>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default SelectPaymentPopup