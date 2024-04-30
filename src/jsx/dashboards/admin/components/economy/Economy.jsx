// Importing part
import {useFetch} from "../../../../../lib/useFetch";
import {useState} from "react";
import {Icon} from "@iconify/react";
import Swal from "sweetalert2";
import {showError} from "../../../../../lib/alertHandler";

// Creating and exporting settings tab of admin dashboard as default
export default function Economy() {
    // Getting data
    const [data, error, loading, setUrl, refresh] = useFetch(`https://utsmm.liara.run/api/admin/economy-configs`);

    // Defining states
    const [customLoading, setCustomLoading] = useState(false);
    const [rate, setRate] = useState('');

    // Returning JSX
    return (
        <div>
            <h1 className={'title'}>Economy Configs</h1>
            {
                (loading)
                    ? <h1>Loading</h1>
                    : (
                        <form onSubmit={(e) => {
                            e.preventDefault();

                            setCustomLoading(true);
                            fetch('https://utsmm.liara.run/api/admin/economy-configs', {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Accept": "application/json",
                                    "X-Requested-With": "XMLHttpRequest",
                                    "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                                },
                                body: JSON.stringify({
                                    "rate_increase_percent": rate
                                })
                            })
                                .then((resp) => resp.json())
                                .then(resp => {
                                    if (resp.message === "Unauthenticated.") {
                                        Swal.fire({
                                            icon: 'error',
                                            text: 'Unauthenticated.'
                                        });
                                    } else {
                                        Swal.fire({
                                            icon: 'success',
                                            text: 'The configs are changed'
                                        });
                                        refresh();
                                    }
                                    setCustomLoading(false);
                                })
                                .catch(err => {
                                    const errors = err?.response?.data
                                    showError(errors)
                                    setCustomLoading(false);
                                })
                        }} action="#" className={'form'}>
                            <div className={'loading'} data-loading={customLoading}>
                                <Icon icon={'eos-icons:loading'} width={40} href={40}/>
                            </div>
                            <div>
                                <label className={'label'} htmlFor="email">Rate</label>
                                <input defaultValue={data.entities['economy-configs'].rate_increase_percent} onChange={(e) => setRate(e.target.value)} required id={'rate'} name={'rate'} className={'input'} type="number" placeholder={'Email'} min={0} max={100} />
                            </div>
                            <button className={'submit-btn'}>Submit</button>
                        </form>
                    )
            }
        </div>
    );
}