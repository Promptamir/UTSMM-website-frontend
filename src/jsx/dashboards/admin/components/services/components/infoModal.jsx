// Importing part

// Creating and exporting information about categories modal as default
import {useFetch} from "../../../../../../lib/useFetch";
import {Icon} from "@iconify/react";
import BE_URL from "../../../../../../lib/envAccess";
import Modal from "../../../../../pop-ups/modal";
import {useEffect} from "react";

export default function InfoModal({isOpened, closeFn, id}) {
    // Getting data from the server
    const [data, error, loading, setUrl, refresh] = useFetch(`${BE_URL}/admin/services/${id}`)

    useEffect(() => {
        setUrl(`${BE_URL}/admin/services/${id}`);
        refresh();
    }, [id]);

    // Returning JSX
    return (
        <Modal title={'Info'} isOpened={isOpened} closeFn={closeFn}>
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
        </Modal>
    );
}