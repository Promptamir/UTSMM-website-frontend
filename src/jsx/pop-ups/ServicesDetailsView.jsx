
import { useDispatch } from "react-redux"
import { Icon } from "@iconify/react"
import { closePopUp } from "../../features/popUpReducer"
import '../../css/pages/services-page/ServicesPageStyle.css';


export default function ServicesDetailsView({service}) {
    const dispatcher = useDispatch()
    const handleCloseButtonClick = () => {dispatcher(closePopUp())}

    return (
        <div className='admin-panel-create-faq-pop-up'>
            <button className="close-button" onClick={handleCloseButtonClick}>
                <Icon icon="mingcute:close-fill" />
            </button>
            <div className="pop-up-header">
                <h1>
                    View Service Details
                </h1>
            </div>
            <div className="pop-up-body" style={{marginTop: '20px'}}>
                <div className={'modal-row'}>
                    <span>ID</span>
                    <span>{service.id}</span>
                </div>
                <div className={'modal-row'}>
                    <span>Title</span>
                    <span>{service.title}</span>
                </div>
                <div className={'modal-row'}>
                    <span>Description</span>
                    <span>{(service.description) ? service.description : '-'}</span>
                </div>
                <div className={'modal-row'}>
                    <span>Rate</span>
                    <span>{service.rate}</span>
                </div>
                <div className={'modal-row'}>
                    <span>Min</span>
                    <span>{service.min}</span>
                </div>
                <div className={'modal-row'}>
                    <span>Max</span>
                    <span>{service.max}</span>
                </div>
            </div>
        </div>
    )
}