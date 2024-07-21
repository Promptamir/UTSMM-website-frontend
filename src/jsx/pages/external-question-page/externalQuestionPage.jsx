// Importing part
import {useFetch} from "../../../lib/useFetch";
import {Icon} from "@iconify/react";
import '../../../css/pages/external-question-page/extenralQuestionStyle.css';
import {useState} from "react";
import BE_URL from "../../../lib/envAccess";
import Pagination from "../../primaries/pagination";

// Creating and exporting external question page as default
export default function ExternalQuestionPage() {
    // Defining states of component
    const [currentPage, setCurrentPage] = useState(1);

    // Retrieving data from database
    const [data, error, loading, setUrl, refreshData, refetch] = useFetch(`${BE_URL}/external-reviews?page=${currentPage}`);

    // Returning JSX
    return (
        <div className={'external-question-page'}>
            <h1 style={{marginBottom: '20px'}}>External Questions</h1>
            {
                (loading)
                    ? (
                        <div className={'centred-container'}>
                            <Icon icon={'eos-icons:loading'} width={40} href={40}/>;
                        </div>
                    ) : (error)
                        ? (<h1>There was an error while fetching the data</h1>)
                        : <div className={'custom-table'}>
                            <div className={'header'}>
                                <div className={'item'}>ID</div>
                                <div className={'item'}>Image</div>
                                <div className={'item'}>Type</div>
                                <div className={'item'}>Free credit</div>
                                <div className={'item'}>Created At</div>
                            </div>
                            <div className={'body'}>
                                {
                                    data.entities.reviews.map((item, index) => (
                                        <div className={'row'} key={index}>
                                            <div className={'item'}><div className={'id'}>{item.id}</div></div>
                                            <div className={'item'}><img src={item.image} width={50} height={50} className={'img'} /></div>
                                            <div className={'item'}>{item.type}</div>
                                            <div className={'item'}>{item.free_credit}</div>
                                            <div className={'item'}>{new Date(item.created_at).toLocaleDateString()}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
            }
            <Pagination
                error={error}
                refetch={refetch}
                setUrl={setUrl}
                count={data?.entities?.count}
                loading={loading}
                apiEndpoint={'blogs'}
            />
        </div>
    );
}