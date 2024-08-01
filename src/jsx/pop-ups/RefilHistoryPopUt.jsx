// Importing part
import {useFetch} from "../../lib/useFetch";
import BE_URL from "../../lib/envAccess";
import {Icon} from "@iconify/react";
import {useDispatch} from "react-redux";
import {closePopUp} from "../../features/popUpReducer";

// Creating and exporting Refile history modal as default
export default function RefilHistoryPopUt({id}) {
    const [data, error, loading] = useFetch(`${BE_URL}/orders/${id}/refills`);

    const dispatcher = useDispatch()

    // Returning JSX
    return (
        <form action="#" className='admin-panel-create-faq-pop-up'>
            <button className="close-button"
                    onClick={() => dispatcher(closePopUp())}>
                <Icon icon="mingcute:close-fill"/>
            </button>
            <h1 style={{marginBottom: '20px'}}>Refill</h1>
            {
                (loading)
                    ? <h1>Loading</h1>
                    : (error)
                        ? <h1>There was an error while fetching the data</h1>
                        : (
                            <div style={{marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px'}}>
                                {
                                    (data.entities.refills.length === 0)
                                        ? <h1 style={{textAlign: 'center', marginTop: '20px', color: 'black'}}>There is nothing to show</h1>
                                        : data.entities.refills.map((item, index) => (
                                            <span style={{
                                                fontSize: '16px',
                                                fontWeight: 'normal',
                                                color: 'black'
                                            }} key={index}>{item}</span>
                                        ))
                                }
                            </div>
                        )
            }
        </form>
    );
}