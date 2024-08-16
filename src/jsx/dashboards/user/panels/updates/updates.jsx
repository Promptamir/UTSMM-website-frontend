// Importing part
import {useEffect, useState} from "react";
import ReactDropdown from "react-dropdown";
import {useFetch} from "../../../../../lib/useFetch";
import BE_URL from "../../../../../lib/envAccess";
import {Icon} from "@iconify/react";
import Pagination from "../../../../primaries/pagination";

// Creating and exporting updates panel of user dashboard as default
export default function Updates() {
    // Defining states of component
    const [sort, setSort] = useState(0);
    const [serviceID, setServiceID] = useState('');

    // Fetching the api
    const [data, error, loading, setUrl, refresh, refetch] = useFetch(`${BE_URL}/service-updates?page=1&type=${sort}&service_id=${serviceID}`);

    // Returning JSX
    return (
        <main className='user-panel-updates'>
            <form action={'#'} onSubmit={(e) => {
                e.preventDefault();

                setUrl(`${BE_URL}/service-updates?page=1&type=${sort}&service_id=${serviceID}`);
                refetch();
            }} className={'filter-divider'}>
                <ReactDropdown
                    placeholder={'Filter ...'}
                    onChange={(e) => setSort(e.value)}
                    controlClassName={'dropdown-control'}
                    options={[
                        {label: "All", value: 0},
                        {label: "Rate decreased", value: 1},
                        {label: "Rate increased", value: 2},
                        {label: "Service disabled", value: 3},
                        {label: "Service enabled", value: 4},
                        {label: "New service", value: 5}
                    ]}
                />
                <input
                    onChange={(e) => setServiceID(e.target.value)}
                    placeholder={'Search ..'}
                    type="number"
                    min={1}
                    className={'filter-input'}
                />
                <button className={'submit-btn'}>Filter</button>
            </form>
            {
                (loading)
                    ? (
                        <div className={'centred-div'}>
                            <Icon icon={'eos-icons:loading'} width={40} href={40} />
                        </div>
                    ) : (error)
                        ? <h1 style={{fontSize: '20px', textAlign: 'center', color: 'white', marginBottom: '20px'}}>There was an error while fetching the data</h1>
                        : (data.entities.updates.length === 0)
                            ? <h1 style={{fontSize: '20px', textAlign: 'center', color: 'white', marginBottom: '20px'}}>There is nothing to show</h1>
                            : (
                                <div className={'list'}>
                                    <div className={'head'}>
                                        <div className={'item'}>ID</div>
                                        <div className={'item'}>Title</div>
                                        <div className={'item'}>Description</div>
                                        <div className={'item'}>Created At</div>
                                    </div>
                                    <ul className="body">
                                        {
                                            data.entities.updates.map((item , index) => (
                                                <li key={index} className={'service-update-item'}>
                                                    <div className={'service-update-col'}>{item.service.id}</div>
                                                    <div className={'service-update-col'}>{item.service.title}</div>
                                                    <div className={'service-update-col'}>{item.description}</div>
                                                    <div className={'service-update-col'}>{new Date(item.created_at).toLocaleDateString()}</div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            )
            }
            <Pagination
                error={error}
                refetch={refetch}
                setUrl={setUrl}
                count={data?.entities?.count}
                loading={loading}
                apiEndpoint={'service-updates'}
                apiAppend={`&type=${sort}&service_id=${serviceID}`}
            />
        </main>
    );
}