import { useDispatch } from "react-redux"
import { closePopUp } from "../../features/popUpReducer"
import { Icon } from "@iconify/react"
import { SERVER } from "../../lib/envAccess"






const SelectPaymentPopup = ({ methods, loading, error, resultFunction, currentSelected }) => {



    const dispatcher = useDispatch()

    const handleCloseButtonClick = () => {
        dispatcher(closePopUp())
    }

    const handleItemClick = (item) => {
        resultFunction(item)
        dispatcher(closePopUp())

    }








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
            <div className="pop-up-body">
                {
                    (loading)
                        ? <h1>Loading</h1>
                        : (error)
                            ? <h1>Error</h1>
                            : methods.entities.payments.map((item, index) => {
                                return <div
                                    className={`item ${item?.name === currentSelected?.name}`}
                                    key={index}
                                    onClick={() => handleItemClick(item)}
                                >
                                    <span>{index} - </span>
                                    <p>
                                        {item.payment_method}
                                    </p>
                                </div>
                            })
                }
            </div>
        </div>
    )
}

export default SelectPaymentPopup