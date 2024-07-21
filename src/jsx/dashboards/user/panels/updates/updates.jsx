// Importing part
import {useEffect, useState} from "react";
import ReactDropdown from "react-dropdown";
import {useFetch} from "../../../../../lib/useFetch";
import BE_URL from "../../../../../lib/envAccess";
import {Icon} from "@iconify/react";
import TablePaginations from "../../../../cutsome-components/table/components/TablePaginations";
import ResponsivePagination from "react-responsive-pagination";
import Pagination from "../../../../primaries/pagination";

// Creating and exporting updates panel of user dashboard as default
export default function Updates() {
    // Defining states of component
    const [sort, setSort] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchStr, setSearchStr] = useState('');
    const [sortedByInput, setSortedByInput] = useState([]);

    // Fetching the api
    const [data, error, loading, setUrl, refresh, refetch] = useFetch(`${BE_URL}/service-updates?page=${currentPage}&type=${sort}`);

    // Using useEffect to sort items
    useEffect(() => {
        if (searchStr !== '') {
            const obj = data.entities.updates;
            setSortedByInput(obj.filter(item => item.service.title.toLowerCase().includes(searchStr.toLowerCase())))
        }
    }, [searchStr]);

    // Returning JSX
    return (
        <main className='user-panel-updates'>
            <div className={'filter-divider'}>
                <ReactDropdown
                    placeholder={'Filter ...'}
                    onChange={(e) => {
                        setSort(e.value);
                        setUrl(`${BE_URL}/service-updates?page=${currentPage}&type=${e.value}`);
                        refetch();
                    }}
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
                    onChange={(e) => setSearchStr(e.target.value)}
                    placeholder={'Search ..'}
                    type="text"
                    className={'filter-input'}
                />
            </div>
            {
                (loading)
                    ? (
                        <div className={'centred-div'}>
                            <Icon icon={'eos-icons:loading'} width={40} href={40} />
                        </div>
                    ) : (error)
                        ? <h1>There was an error while fetching the data</h1>
                        : (
                            <ul className={'list'}>
                                {
                                    (searchStr === '')
                                        ? data.entities.updates.map((item , index) => (
                                            <li key={index} className={'service-update-item'}>
                                                <div className={'service-update-col'}>{item.service.id}</div>
                                                <div className={'service-update-col'}>{item.service.title}</div>
                                                <div className={'service-update-col'}>{item.description}</div>
                                                <div className={'service-update-col'}>{new Date(item.created_at).toLocaleDateString()}</div>
                                            </li>
                                        )) : sortedByInput.map((item , index) => (
                                            <li key={index} className={'service-update-item'}>
                                                <div className={'service-update-col'}>{item.service.id}</div>
                                                <div className={'service-update-col'}>{item.service.title}</div>
                                                <div className={'service-update-col'}>{item.description}</div>
                                                <div className={'service-update-col'}>{new Date(item.created_at).toLocaleDateString()}</div>
                                            </li>
                                        ))
                                }
                            </ul>
                        )
            }
            <Pagination
                error={error}
                refetch={refetch}
                setUrl={setUrl}
                count={data?.entities?.count}
                loading={loading}
                apiEndpoint={'blogs'}
            />
        </main>
    );
}