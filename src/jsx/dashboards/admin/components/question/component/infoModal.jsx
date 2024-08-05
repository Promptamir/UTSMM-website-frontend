// Importing part
import {Icon} from "@iconify/react";
import {useFetch} from "../../../../../../lib/useFetch";
import BE_URL from "../../../../../../lib/envAccess";
import Modal from "../../../../../pop-ups/modal";

// Creating and exporting info modal as default
export default function InfoModal({id, isOpened, closeFn}) {
    // Defining states of component
    const [data, error, loading, setUrl, refreshData, refetch] = useFetch(`${BE_URL}/admin/questions/${id}`)

    // Using useEffect to refetch the data
    useFetch(() => {
        console.log(id);
    }, [id])

    // Returning JSX
    return (
        <Modal isOpened={isOpened} closeFn={closeFn} title={'Info'}>
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
        </Modal>
    );
}