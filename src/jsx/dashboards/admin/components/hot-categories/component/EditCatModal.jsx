// Importing part
import AdminPanelFiledset from "../../tools/fieldset/AdminPanelFiledset";
import Legend from "../../tools/fieldset/Legend";
import {Icon} from "@iconify/react";
import FieldBody from "../../tools/fieldset/FieldBody";
import {useState} from "react";
import {closePopUp} from "../../../../../../features/popUpReducer";
import {useDispatch} from "react-redux";
import Swal from "sweetalert2";

// Creating and exporting edit category modal as default
export default function EditCatModal({setCustomLoading, refresh, id}) {
    // Defining states of component
    const [title, setTitle] = useState('');
    const [idState, setID] = useState();
    const dispatcher = useDispatch();

    // Returning JSX
    return (
        <form onSubmit={(e) => {
            e.preventDefault();

            setCustomLoading(true);
            fetch(`https://utsmm.liara.run/api/admin/hot-categories/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`,
                },
                body: JSON.stringify({
                    "remote_category_title": title,
                    "local_category_id": idState
                })
            })
                .then((data) => data.json())
                .then((data) => {
                    console.log(data);
                    setCustomLoading(false);
                    if (data.message === "Unauthenticated.") {
                        Swal.fire({
                            icon: 'error',
                            text: 'Unauthenticated.'
                        });
                    } else {
                        Swal.fire({
                            icon: 'success',
                            text: 'The Category is edited.'
                        });
                        refresh();
                    }

                    refresh();
                })
                .catch(() => {
                    setCustomLoading(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'There was an error while fetching the data'
                    })
                })
        }} className="admin-panel-create-blog-pop-up">
            <button className="close-button" onClick={() => dispatcher(closePopUp())}>
                <Icon icon="mingcute:close-fill"/>
            </button>
            <div className="pop-up-header">
                <h1>
                    Edit category
                </h1>
            </div>
            <div className="pop-up-body">
                <AdminPanelFiledset className={"create-faq-field-box"}>
                    <Legend>
                        <Icon icon="pajamas:title"/>
                        <span>Title</span>
                    </Legend>
                    <FieldBody>
                        <input
                            minLength={5}
                            maxLength={255}
                            required
                            onChange={(event) => setTitle(event.target.value)}
                            type="text"
                            name="title"
                        />
                    </FieldBody>
                </AdminPanelFiledset>
                <AdminPanelFiledset className={"create-faq-field-box"}>
                    <Legend>
                        <Icon icon="pajamas:title"/>
                        <span>Platform ID</span>
                    </Legend>
                    <FieldBody>
                        <input
                            min={1}
                            required
                            onChange={(event) => setID(event.target.value)}
                            type="number"
                            name="id"
                        />
                    </FieldBody>
                </AdminPanelFiledset>
                <button className="submit">
                    <span>Submit </span>
                    <Icon icon="iconamoon:send-fill"/>
                </button>
            </div>
        </form>
    );
}