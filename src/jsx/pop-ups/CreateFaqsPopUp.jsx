
import { useDispatch } from "react-redux"
import { Icon } from "@iconify/react"
import { closePopUp } from "../../features/popUpReducer"
import AdminPanelFiledset from "../dashboards/admin/components/tools/fieldset/AdminPanelFiledset"
import Legend from "../dashboards/admin/components/tools/fieldset/Legend"
import FieldBody from "../dashboards/admin/components/tools/fieldset/FieldBody"
import { post } from "../../lib/useFetch"
import { API } from "../../lib/envAccess"
import { showError, showSuccess } from "../../lib/alertHandler"
import {useState} from "react";
import Swal from "sweetalert2";



export default function CreateFaqsPopUp({ refresh }) {






    const dispatcher = useDispatch()

    const handleCloseButtonClick = () => {
        dispatcher(closePopUp())
    }


    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault()

        fetch(`https://utsmm.liara.run/api/admin/faqs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json",
                "X-Requested-With" : "XMLHttpRequest",
                "Authorization" : `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({
                "question": question,
                "answer": answer,
                "tag": "",
                "order": ""
            })
        })
            .then(resp => {
                Swal.fire({
                    icon: 'success',
                    text: 'The faq is added'
                });
                refresh();
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    text: 'There was a problem fetching the data'
                });
            })

    }


    return (
        <form
            className='admin-panel-create-faq-pop-up'
            onSubmit={handleFormSubmit}>
            <button className="close-button"
                onClick={handleCloseButtonClick}>
                <Icon icon="mingcute:close-fill" />
            </button>

            <div className="pop-up-header">
                <h1>
                    Create Faqs
                </h1>
            </div>
            <div className="pop-up-body">
                <AdminPanelFiledset className={"create-faq-field-box"}>
                    <Legend>
                        <Icon icon="ri:question-fill" />
                        <span>Question</span>
                    </Legend>
                    <FieldBody>
                        <input
                            onChange={(e) => setQuestion(e.target.value)}
                            required
                            type="text"
                            name="question"
                            defaultValue={""} />
                    </FieldBody>
                </AdminPanelFiledset>

                <AdminPanelFiledset className={"create-faq-field-box"}>
                    <Legend>
                        <Icon icon="fluent:text-12-filled" />
                        <span>Answer</span>
                    </Legend>
                    <FieldBody>
                        <textarea
                            onChange={(e) => setAnswer(e.target.value)}
                            required
                            cols={10}
                            rows={10}
                            type="number"
                            name="answer"
                            defaultValue={""} />
                    </FieldBody>
                </AdminPanelFiledset>
                <button className="submit">
                    <span>Submit </span>
                    <Icon icon="iconamoon:send-fill" />
                </button>
            </div>
        </form>
    )
}
