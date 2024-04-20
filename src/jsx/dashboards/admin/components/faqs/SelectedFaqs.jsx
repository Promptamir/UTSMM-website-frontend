
import { Icon, loadIcon } from "@iconify/react"

import { deletE, useFetch } from "../../../../../lib/useFetch"
import { API } from "../../../../../lib/envAccess"
import { showError, showSuccess } from "../../../../../lib/alertHandler"
import FAQsAccordion from "../../../../cutsome-components/accordion/FAQsAccordion"
import { useDispatch } from "react-redux"
import { ADMIN_PANEL_CREATE_FAQS, ADMIN_PANEL_EDIT_FAQS } from "../../../../pop-ups/Constaints"
import { showPopUp } from "../../../../../features/popUpReducer"
import CreateFaqsPopUp from "../../../../pop-ups/CreateFaqsPopUp"
import EditFaqsPopUp from "../../../../pop-ups/EditFaqsPopUp"

import { useState } from "react"

export default function SelectedFaqs({refresh}) {



    const dispatcher = useDispatch()

    const openCreateFaqPopUp = () => {
        dispatcher(showPopUp({
            type: ADMIN_PANEL_CREATE_FAQS,
            duration: 2000,
            component: <CreateFaqsPopUp refresh={refresh} />
        }))
    }

    return (
        <div className="selected-faqs">
            <h2 className="header">
                <h1 className="left">
                    Selected Faqs
                </h1>
                <div className="right">
                    <button onClick={openCreateFaqPopUp}>
                        <Icon icon="wpf:create-new" />
                        <span>Create New</span>
                    </button>
                </div>
                <button onClick={refresh}>Refresh</button>
            </h2>
        </div>
    )
}
