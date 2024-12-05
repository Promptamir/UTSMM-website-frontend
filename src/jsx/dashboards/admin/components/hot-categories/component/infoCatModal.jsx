// Importing part
import {useFetch} from "../../../../../../lib/useFetch";
import {Icon} from "@iconify/react";
import BE_URL from "../../../../../../lib/envAccess";
import Modal from "../../../../../pop-ups/modal";
import {useEffect} from "react";

// Creating and exporting information about categories modal as default
export default function InfoCatModal({id, closeFn, isOpened}) {
    // Getting data from the server
    const [data, error, loading, setUrl, refresh] = useFetch(`${BE_URL}/admin/hot-categories/${id}`)

    // Using useEffect to refetch data
    useEffect(() => {
        setUrl(`${BE_URL}/admin/hot-categories/${id}`);
        refresh();
    }, [id]);

    // Returning JSX
    return (
        <Modal title={'Info'} closeFn={closeFn} isOpened={isOpened}>
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
        </Modal>
    );
}