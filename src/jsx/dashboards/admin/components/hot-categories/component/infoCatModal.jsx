// Importing part

// Creating and exporting information about categories modal as default
import {useFetch} from "../../../../../../lib/useFetch";
import {Icon} from "@iconify/react";
import {closePopUp} from "../../../../../../features/popUpReducer";
import {useDispatch} from "react-redux";

export default function InfoCatModal({id}) {
    // Getting data from the server
    const [data, error, loading, setUrl, refresh] = useFetch(`https://utsmm.liara.run/api/admin/hot-categories/${id}`)
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
                                    }}>{data.entities.hot_category.id}</div>

                                    <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Remote Category Title</div>
                                    <div style={{
                                        fontSize: '16px',
                                        fontWeight: 'normal',
                                        color: 'black'
                                    }}>{data.entities.hot_category.remote_category_title}</div>

                                    <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Local Category Id</div>
                                    <div style={{
                                        fontSize: '16px',
                                        fontWeight: 'normal',
                                        color: 'black'
                                    }}>{data.entities.hot_category.local_category_id}</div>
                                </div>
                            </div>
                        )
            }
        </div>
    );
}