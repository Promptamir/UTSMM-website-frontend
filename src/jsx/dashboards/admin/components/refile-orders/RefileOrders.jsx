// Importing part

// Creating and exporting refiled orders component as default
import {Icon} from "@iconify/react";
import Table from "../../../../cutsome-components/table/Table";
import TableHeader from "../../../../cutsome-components/table/components/TableHeader";
import ItemHeader from "../../../../cutsome-components/table/components/ItemHeader";
import TableBody from "../../../../cutsome-components/table/components/TableBody";
import Row from "../../../../cutsome-components/table/components/Row";
import Property from "../../../../cutsome-components/table/components/Property";
import TablePaginations from "../../../../cutsome-components/table/components/TablePaginations";
import ResponsivePagination from "react-responsive-pagination";
import {useState} from "react";
import {useFetch} from "../../../../../lib/useFetch";
import BE_URL from "../../../../../lib/envAccess";

export default function RefileOrders() {
    // Defining states of component
    const [currentPage, setCurrentPage] = useState(1);
    const [data, error, loading, setUrl, refresh] = useFetch(`${BE_URL}/admin/refills?page=${currentPage}`)

    // Defining header list
    const headerList = [
        "ID",
        "Created at",
        "Status"
    ]

    // Returning JSX
    return (
        <div className='admin-panel-blogs panel-section'>
            <h2 className="blogs-header">
                Refiled orders
            </h2>
            <div className="blogs-body">
                <Table columnsStyle={"10rem 10rem 10rem"}>
                    <TableHeader>
                        {
                            headerList.map((reconrd, index) => {
                                return <ItemHeader
                                    key={index}>
                                    {reconrd}
                                </ItemHeader>
                            })
                        }
                    </TableHeader>
                    <TableBody>
                        {
                            (loading)
                                ? <h1>Loading</h1>
                                : (error)
                                    ? <h1>Error</h1>
                                    : data.entities.refills.refills.map((item) => (
                                        <Row key={item.id}>
                                            <Property>
                                                <div className="property-header">
                                                    {headerList[0]}
                                                </div>
                                                <div className="property-body">
                                                    {item.id}
                                                </div>
                                            </Property>
                                            <Property>
                                                <div className="property-header">
                                                    {headerList[1]}
                                                </div>
                                                <div className="property-body">
                                                    {new Date(item.created_at).toLocaleDateString()}
                                                </div>
                                            </Property>
                                            <Property>
                                                <div className="property-header">
                                                    {headerList[2]}
                                                </div>
                                                <div className="property-body">
                                                    {item.status}
                                                </div>
                                            </Property>
                                        </Row>
                                    ))
                        }

                    </TableBody>
                    {
                        (loading)
                            ? <h1>Loading...</h1>
                            : (error)
                                ? <h1>Error</h1>
                                : (data.entities.refills.count > 15)
                                    ? (
                                        <TablePaginations>
                                            <ResponsivePagination
                                                current={currentPage}
                                                total={Math.round(data.entities.refills.count/ 10)}
                                                onPageChange={(pageNumber) => {
                                                    setCurrentPage(pageNumber);
                                                    setUrl(`${BE_URL}/admin/refills?page=${pageNumber}`);
                                                    refresh();
                                                }}
                                            />
                                        </TablePaginations>
                                    ) : false
                    }
                </Table>
            </div>
        </div>
    );
}