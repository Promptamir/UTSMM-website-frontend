
import { useDispatch } from "react-redux"
import { Icon } from "@iconify/react"
import { closePopUp } from "../../features/popUpReducer"
import AdminPanelFiledset from "../dashboards/admin/components/tools/fieldset/AdminPanelFiledset"
import Legend from "../dashboards/admin/components/tools/fieldset/Legend"
import FieldBody from "../dashboards/admin/components/tools/fieldset/FieldBody"
import {useState} from "react";
import Swal from "sweetalert2";


export default function CreateFaqsPopUp({ refresh }) {






    const dispatcher = useDispatch()

    const handleCloseButtonClick = () => {
        dispatcher(closePopUp())
    }


    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [tag, setTag] = useState('');
    const [order, setOrder] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault()

        fetch(`https://utsmm.liara.run/api/admin/faqs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json",
                "X-Requested-With" : "XMLHttpRequest",
                "Authorization" : `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            },
            body: JSON.stringify({
                "question": question,
                "answer": answer,
                "tag": tag,
                "order": order
            })
        })
            .then((data) => data.json())
            .then(resp => {
                if (resp.message === "Unauthenticated.") {
                    Swal.fire({
                        icon: 'error',
                        text: 'Unauthenticated.'
                    });
                } else {
                    Swal.fire({
                        icon: 'success',
                        text: 'The faq is added'
                    });
                    refresh();
                }
            })
            .catch(() => {
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
                            minLength={10}
                            type="text"
                            name="question"
                            defaultValue={""} />
                    </FieldBody>
                </AdminPanelFiledset>
                <AdminPanelFiledset className={"create-faq-field-box"}>
                    <Legend>
                        <Icon icon="ri:question-fill" />
                        <span>Tag</span>
                    </Legend>
                    <FieldBody>
                        <input
                            onChange={(e) => setTag(e.target.value)}
                            required
                            minLength={3}
                            maxLength={40}
                            type="text"
                            name="tag"
                            defaultValue={""} />
                    </FieldBody>
                </AdminPanelFiledset>
                <AdminPanelFiledset className={"create-faq-field-box"}>
                    <Legend>
                        <Icon icon="ri:question-fill" />
                        <span>Order</span>
                    </Legend>
                    <FieldBody>
                        <input
                            onChange={(e) => setOrder(e.target.value)}
                            required
                            minLength={1}
                            type="number"
                            name="order"
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
                            minLength={10}
                            name="answer"
                            defaultValue={""} />
                    </FieldBody>
                </AdminPanelFiledset>
                <button className="submit">
                    <span>Submit</span>
                    <Icon icon="iconamoon:send-fill" />
                </button>
            </div>
        </form>
    )
}
