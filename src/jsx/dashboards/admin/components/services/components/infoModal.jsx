// Importing part

// Creating and exporting information about categories modal as default
import {useFetch} from "../../../../../../lib/useFetch";
import {Icon} from "@iconify/react";
import {closePopUp} from "../../../../../../features/popUpReducer";
import {useDispatch} from "react-redux";

export default function InfoModal({id}) {
    // Getting data from the server
    const [data, error, loading, setUrl, refresh] = useFetch(`https://utsmm.liara.run/api/admin/services/${id}`)
    const dispatcher = useDispatch();

    // Returning JSX
    return (
        <div className="admin-panel-create-blog-pop-up">
            <button className="close-button" onClick={() => dispatcher(closePopUp())}>
                <Icon icon="mingcute:close-fill"/>
            </button>
            <div className="pop-up-header" style={{marginBottom: '20px'}}>
                <h1>
                    Info
                </h1>
            </div>
            {
                (loading)
                    ? (
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Icon icon={'eos-icons:loading'} width={40} href={40} />
                        </div>
                    ) : (error)
                        ? <h1>An error has happened</h1>
                        : (
                            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                                <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
                                    <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>ID</div>
                                    <div style={{
                                        fontSize: '16px',
                                        fontWeight: 'normal',
                                        color: 'black'
                                    }}>{data.entities.service.id}</div>

                                    <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Title</div>
                                    <div style={{
                                        fontSize: '16px',
                                        fontWeight: 'normal',
                                        color: 'black'
                                    }}>{data.entities.service.title}</div>
                                    <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Rate</div>
                                    <div style={{
                                        fontSize: '16px',
                                        fontWeight: 'normal',
                                        color: 'black'
                                    }}>{data.entities.service.rate}</div>
                                    <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Min-Max</div>
                                    <div style={{
                                        fontSize: '16px',
                                        fontWeight: 'normal',
                                        color: 'black'
                                    }}>${data.entities.service.min}-${data.entities.service.max}</div>
                                    <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Type</div>
                                    <div style={{
                                        fontSize: '16px',
                                        fontWeight: 'normal',
                                        color: 'black'
                                    }}>{data.entities.service.type}</div>
                                </div>
                            </div>
                        )
            }
        </div>
    );
}