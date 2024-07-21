import BE_URL, { API } from "../../../../../lib/envAccess"
import { useFetch } from "../../../../../lib/useFetch"
import Table from "../../../../cutsome-components/table/Table"
import ItemHeader from "../../../../cutsome-components/table/components/ItemHeader"
import Row from "../../../../cutsome-components/table/components/Row"
import TableBody from "../../../../cutsome-components/table/components/TableBody"
import TableHeader from "../../../../cutsome-components/table/components/TableHeader"
import Property from "../../../../cutsome-components/table/components/Property"
import {useState} from "react";
import TablePaginations from "../../../../cutsome-components/table/components/TablePaginations";
import ResponsivePagination from "react-responsive-pagination";
import {Icon} from "@iconify/react";
import {showPopUp} from "../../../../../features/popUpReducer";
import {ADMIN_PANEL_CREATE_BLOG} from "../../../../pop-ups/Constaints";
import {useDispatch} from "react-redux";
import InfoModal from "./components/infoModal";
import EditModal from "./components/editModal";
import Pagination from "../../../../primaries/pagination";

export default function Services() {

  const [customLoading, setCustomLoading] = useState(false);
  const [data, error, loading, setUrl, refreshData, refetch] = useFetch(`${BE_URL}/admin/services?page=1`)

  const dispatcher = useDispatch()

  const headersList = [
    "ID",
    "Title",
    "Rate",
    "Min",
    "Max",
    "Status",
    "Category",
    "Actions",
  ]


  const handleInfoButtonClick = (id) => {
    dispatcher(showPopUp({
      type: ADMIN_PANEL_CREATE_BLOG,
      duration: 2000,
      component: <InfoModal id={id} />
    }))
  }

  const handleEditClick = (id) => {
    dispatcher(showPopUp({
      type: ADMIN_PANEL_CREATE_BLOG,
      duration: 2000,
      component: <EditModal setCustomLoading={setCustomLoading} refresh={refreshData} id={id} />
    }))
  }


  return (
    <div className="admin-services-panel">
      <Table columnsStyle={"5rem 1fr 0.5fr 4rem 4rem 5rem 5rem 5rem"}>
        <TableHeader>
          {
            headersList.map((record, index) => {
              return <ItemHeader key={index}>
                {record}
              </ItemHeader>
            })
          }
        </TableHeader>
        {
          <TableBody>
            {
              (loading)
                ? <h1>Loading</h1>
                : (error)
                    ? <h1>Error</h1>
                    : data.entities.services.map((record) => {
                        return <Row key={record.id}>
                          <Property>
                            <div className="property-header">
                              {headersList[0]}
                            </div>
                            <div className="property-body">
                              {record.id}
                            </div>
                          </Property>
                          <Property>
                            <div className="property-header">
                              {headersList[1]}
                            </div>
                            <div className="property-body">
                              {record.title}
                            </div>
                          </Property>
                          <Property>
                            <div className="property-header">
                              {headersList[2]}
                            </div>
                            <div className="property-body ">
                              ${record.rate}
                            </div>
                          </Property>
                          <Property>
                            <div className="property-header">
                              {headersList[3]}
                            </div>
                            <div className="property-body">
                              ${record.min}
                            </div>
                          </Property>
                          <Property>
                            <div className="property-header">
                              {headersList[4]}
                            </div>
                            <div className="property-body">
                              ${record.max}
                            </div>
                          </Property>
                          <Property>
                            <div className="property-header">
                              {headersList[5]}
                            </div>
                            <div className="property-body">
                              {record.status}
                            </div>
                          </Property>
                          <Property>
                            <div className="property-header">
                              {headersList[6]}
                            </div>
                            <div className="property-body">
                              ${record.category.title}
                            </div>
                          </Property>
                          <Property>
                            <div className="property-header">
                              {headersList[7]}
                            </div>
                            <div className="property-body">
                              <button onClick={() => handleInfoButtonClick(record.id)} style={{
                                display: 'block',
                                borderRadius: '45rem',
                                backgroundColor: 'blueviolet',
                                color: 'white',
                                paddingBlock: '10px',
                                paddingInline: '15px',
                                marginBottom: '10px'
                              }}>
                                <Icon icon="material-symbols:info"/>
                                Info
                              </button>
                              <button
                                  onClick={() => handleEditClick(record.id)}
                                  style={{
                                    display: 'block',
                                    borderRadius: '45rem',
                                    backgroundColor: 'orange',
                                    color: 'white',
                                    paddingBlock: '10px',
                                    paddingInline: '15px',
                                  }}
                              >
                                <Icon icon="bxs:edit"/>
                                Edit
                              </button>
                            </div>
                          </Property>
                        </Row>
                      })
            }
          </TableBody>
        }
        <Pagination
            error={error}
            refetch={refetch}
            setUrl={setUrl}
            count={data?.entities?.count}
            loading={loading}
            apiEndpoint={'services'}
        />
      </Table>
    </div>
  )
}
