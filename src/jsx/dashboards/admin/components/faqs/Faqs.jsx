// Importing part
import Table from "./Table";

// Creating and exporting faqs panel in admin dashboard as default
export default function Faqs() {
    // Returning JSX
    return (
        <div className={'faq-page'}>
            <Table modalType={'order'} apiEndpoint={'admin/order-faqs'}/>
            <Table modalType={'ticket'} apiEndpoint={'admin/ticket-faqs'}/>
            <Table modalType={'general'} apiEndpoint={'admin/general-faqs'}/>
            <Table modalType={'payment'} apiEndpoint={'admin/payment-faqs'}/>
        </div>
    )
}
