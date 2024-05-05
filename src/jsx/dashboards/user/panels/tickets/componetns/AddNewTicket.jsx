import { useState } from "react"
import FiledSet from "../../../../../cutsome-components/Fieldset/FiledSet"
import { Icon } from "@iconify/react"
import Swal from "sweetalert2"

const AddNewTicket = () => {
    const [loading, setLoading] = useState(false);
    const [subject, setSubject] = useState('');
    const [id, setId] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault()
        let errArray = [];

        setError('');

        if (
            (10 <= subject.length) && (subject.length <= 100) &&
            (10 <= content.length) && (content.length <= 350)
        ) {
            setError('');
            errArray = [];

            console.log({
                "subject": subject,
                "anything_id": id,
                "content": content
            })

            setLoading(true);
            fetch('https://utsmm.liara.run/api/tickets', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                },
                body: JSON.stringify({
                    "subject": subject,
                    "anything_id": id,
                    "content": content
                })
            })
                .then((data) => data.json())
                .then(resp => {
                    console.log(resp)
                    setLoading(false);
                    if (resp.message === "Unauthenticated.") {
                        setError('Unauthenticated')
                    } else {
                        Swal.fire({
                            icon: 'success',
                            text: 'The Ticket is Send'
                        });
                    }
                })
                .catch(() => {
                    setLoading(false);
                    setError('There was a problem fetching the data')
                })
        } else {
            if (subject.length <= 10) {errArray.push('Minimum length of subject is 10 characters.')}
            else if (subject.length >= 100) {errArray.push('Maximum length of subject is 100 characters.')}

            if (content.length <= 10) {errArray.push('Minimum length of content is 10 characters.')}
            else if (content.length >= 350) {errArray.push('Maximum length of content is 350 characters.')}

            if (errArray.length === 1) {setError(errArray[0]);}
            else {setError(errArray.join(' & '))}
        }
    }

    return (
        <form className="add-new-teicket" onSubmit={handleFormSubmit}>

            <FiledSet
                isRequired={true}
                fieldClassName={"add-new-ticket-field"}
                legend={
                    {
                        title: "Subject",
                        svg: <Icon icon="fluent:document-header-20-filled" />
                    }
                }
                onChange={(e) => setSubject(e.target.value)}
                inputName={"subject"} />

            <FiledSet
                isRequired={true}
                fieldClassName={"add-new-ticket-field"}
                legend={{ title: "order-id / Anything ID", svg: <Icon icon="fluent-mdl2:product" /> }}
                inputName={"orderID"}
                onChange={(e) => setId(e.target.value)}
            />


            <FiledSet
                isRequired={true}
                fieldClassName={"add-new-ticket-field"}
                legend={{ title: "Message", svg: <Icon icon="ant-design:message-filled" /> }}
                inputName={"message"}
                inputType={"textarea"}
                onChange={(e) => setContent(e.target.value)}
            />

            {error !== '' && <div className={'input-error'}>{error}</div>}

            <button disabled={loading} className="submit-button">
                <span>
                    Submit Ticket
                </span>
                <Icon icon="formkit:submit" />
            </button>


        </form>
    )
}

export default AddNewTicket