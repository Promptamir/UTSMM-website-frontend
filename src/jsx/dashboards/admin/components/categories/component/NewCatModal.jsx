// Importing part
import AdminPanelFiledset from "../../tools/fieldset/AdminPanelFiledset";
import Legend from "../../tools/fieldset/Legend";
import {Icon} from "@iconify/react";
import FieldBody from "../../tools/fieldset/FieldBody";
import {useState} from "react";
import {closePopUp} from "../../../../../../features/popUpReducer";
import {useDispatch} from "react-redux";
import Swal from "sweetalert2";

// Creating and exporting new category modal as default
export default function NewCatModal({setCustomLoading, refresh}) {
    // Defining states of component
    const [title, setTitle] = useState('');
    const [platform_id, setPlatformID] = useState();
    const dispatcher = useDispatch();

    // Returning JSX
    return (
        <form onSubmit={(e) => {
            e.preventDefault();

            setCustomLoading(true);
            fetch(`https://utsmm.liara.run/api/admin/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`,
                },
                body: JSON.stringify({
                    "title": title,
                    "platform_id": platform_id
                })
            })
                .then((data) => data.json())
                .then((data) => {
                    setCustomLoading(false);
                    if (data.message === "Unauthenticated.") {
                        Swal.fire({
                            icon: 'error',
                            text: 'Unauthenticated.'
                        });
                    } else {
                        Swal.fire({
                            icon: 'success',
                            text: 'The Category is added.'
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
                    Create category
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
                            onChange={(event) => setPlatformID(event.target.value)}
                            type="number"
                            name="platform_id"
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