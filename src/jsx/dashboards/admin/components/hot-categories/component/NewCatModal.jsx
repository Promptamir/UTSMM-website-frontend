// Importing part
import AdminPanelFiledset from "../../tools/fieldset/AdminPanelFiledset";
import Legend from "../../tools/fieldset/Legend";
import {Icon} from "@iconify/react";
import FieldBody from "../../tools/fieldset/FieldBody";
import {useState} from "react";
import {closePopUp} from "../../../../../../features/popUpReducer";
import {useDispatch} from "react-redux";
import Swal from "sweetalert2";
import BE_URL from "../../../../../../lib/envAccess";
import Modal from "../../../../../pop-ups/modal";
import Dropdown from "react-dropdown";
import {useFetch} from "../../../../../../lib/useFetch";
import HandleFetchError from "../../../../../../lib/handleFetchError";

// Creating and exporting new category modal as default
export default function NewCatModal({setCustomLoading, refresh, isOpened, closeFn}) {
    // Getting data of platforms
    const [data, error, loading, setUrl, refreshData, refetch] = useFetch(`${BE_URL}/admin/platforms`);

    // Defining states of component
    const [title, setTitle] = useState('');
    const [idState, setId] = useState();

    // Returning JSX
    return (
        <Modal isOpened={isOpened} title={'Create'} closeFn={closeFn}>
            <form onSubmit={(e) => {
                e.preventDefault();

                setCustomLoading(true);
                closeFn();
                fetch(`${BE_URL}/admin/hot-categories`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                    },
                    body: JSON.stringify({
                        "remote_category_title": title,
                        "local_category_id": idState
                    })
                })
                    .then((data) => data.json())
                    .then((data) => {
                        setCustomLoading(false);
                        HandleFetchError({
                            data: data,
                            lineBreak: false,
                            callbackSuccess: (message) => {
                                Swal.fire({icon: 'success', text: message})
                                refresh();
                            },
                            callbackError: (message) => Swal.fire({icon: 'error', text: message})
                        })
                    })
                    .catch(() => {
                        setCustomLoading(false);
                        Swal.fire({
                            icon: 'error',
                            title: 'There was an error while fetching the data'
                        })
                    })
            }} className="form w-full">
                <label htmlFor="title">Remote Category Title</label>
                <input
                    minLength={3}
                    maxLength={255}
                    required
                    onChange={(event) => setTitle(event.target.value)}
                    type="text"
                    name="title"
                    className={'input'}
                />
                <label htmlFor="platform_id">Local Category ID</label>
                {
                    (loading)
                        ? (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: '20px'
                            }}>
                                <Icon icon={'eos-icons:loading'} width={40} href={40}/>
                            </div>
                        ) : (error)
                            ? <h1>There was an error while fetching the data</h1>
                            : (
                                <Dropdown
                                    onChange={(item) => setId(item.value)}
                                    options={data.entities.platforms.map(item => {
                                        return {
                                            value: item.id,
                                            label : item.title
                                        }
                                    })}
                                />
                            )
                }
                <button className="submit-btn">submit</button>
            </form>
        </Modal>
    );
}