// Importing part
import {closePopUp} from "../../../../../../features/popUpReducer";
import {Icon} from "@iconify/react";
import {useDispatch} from "react-redux";
import {useFetch} from "../../../../../../lib/useFetch";
import BE_URL from "../../../../../../lib/envAccess";

// Creating and exporting info modal as default
export default function InfoModal({id}) {
    // Defining states of component
    const [data, error, loading, setUrl, refresh] = useFetch(`${BE_URL}/admin/questions/${id}`)

    // Defining modal dispatcher
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
            <div className="pop-up-body">
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
                                        <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>{data.entities.question.id}</div>
                                        <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Name</div>
                                        <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>{data.entities.question.full_name}</div>
                                        <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>email</div>
                                        <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>{data.entities.question.email}</div>
                                        <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Content</div>
                                        <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>{data.entities.question.content}</div>
                                        <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Content</div>
                                        <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>{data.entities.question.content}</div>
                                        <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Answer</div>
                                        <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>{data.entities.question.answer}</div>
                                        <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>Answered at</div>
                                        <div style={{fontSize: '16px', fontWeight: 'normal', color: 'black'}}>{new Date(data.entities.question.answered_at).toLocaleDateString()}</div>
                                    </div>
                                </div>
                            )
                }
            </div>
        </div>
    );
}