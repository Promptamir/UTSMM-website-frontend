// Importing part
import {Icon} from "@iconify/react";
import BE_URL from "../../lib/envAccess";
import ResponsivePagination from "react-responsive-pagination";
import {useEffect, useRef, useState} from "react";

// Creating and exporting pagination component as default
export default function Pagination({loading, error, count, apiEndpoint, refetch, setUrl, apiAppend}) {
    // Defining states of component
    const [currentPage, setCurrentPage] = useState(1);
    const [initialCount , setInitialCount] = useState(count);

    // Using useEffect to set initialCount
    useEffect(() => {if (initialCount === undefined) {setInitialCount(count);}}, [count, initialCount])

    // Updating data based on change of apiAppend prop (for Filtering stuff)
    useEffect(() => {
        if (apiAppend) {
            setCurrentPage(1);
            setUrl(`${BE_URL}/${apiEndpoint}?page=1${apiAppend}`);
            refetch();
        }
    }, [apiAppend])

    useEffect(() => {
        if (!loading && currentPage === 1 && apiAppend) {
            setInitialCount(count);
        }
    }, [loading]);

    // Conditional Rendering
    if (loading) {
        return (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px'}}>
                <Icon icon={'eos-icons:loading'} width={40} href={40}/>
            </div>
        );
    } else if (error) {return <p className={'pagination-error'}>There was an error while fetching the data for showing the pagination.</p>}
    else {
        if (initialCount === 0) {return <p className={'pagination-error'}>There is nothing to show</p>}
        else if (initialCount <= 15) {return false;}
        else {
            return <ResponsivePagination
                current={currentPage}
                total={Math.round(initialCount/15)}
                onPageChange={(pageNumber) => {
                    setCurrentPage(pageNumber);
                    setUrl(`${BE_URL}/${apiEndpoint}?page=${pageNumber}${(apiAppend) ? apiAppend : ''}`);
                    refetch();
                }}
            />
        }
    }
}
