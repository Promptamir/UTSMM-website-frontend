import { useDispatch } from "react-redux"
import { closePopUp } from "../../features/popUpReducer"
import { Icon } from "@iconify/react"
import BE_URL, { SERVER } from "../../lib/envAccess"
import TablePaginations from "../cutsome-components/table/components/TablePaginations";
import ResponsivePagination from "react-responsive-pagination";
import {useState} from "react";






const SelectPaymentPopup = ({ methods, loading, error, resultFunction, currentSelected, count, setUrl, refresh }) => {
    const [currentPage, setCurrentPage] = useState(1);


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

                {
                    (loading)
                        ? <h1>Loading...</h1>
                        : (error)
                            ? <h1>Error</h1>
                            : (count > 15)
                                ? (
                                    <TablePaginations>
                                        <ResponsivePagination
                                            current={currentPage}
                                            total={Math.round(count/10)}
                                            onPageChange={(pageNumber) => {
                                                setCurrentPage(pageNumber);
                                                setUrl(`${BE_URL}/payments?page=${pageNumber}`);
                                                refresh();
                                            }}
                                        />
                                    </TablePaginations>
                                ) : false
                }
            </div>
        </div>
    )
}

export default SelectPaymentPopup