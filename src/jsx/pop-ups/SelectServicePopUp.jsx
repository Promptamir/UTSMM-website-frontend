import { Icon } from "@iconify/react"
import { useDispatch } from "react-redux"
import { closePopUp } from "../../features/popUpReducer"
import FiledSet from "../cutsome-components/Fieldset/FiledSet"
import { useCallback, useState } from "react"
import { useMemo } from "react"
import { FAKE_SERVICES } from "../fakeData/FAKE_DATA"

const SelectServicePopUp = ({ currentSelected, resultFunction }) => {


    const [searchValue, setSearchValue] = useState();

    const allCategoires = FAKE_SERVICES

    const [visibleCategories, setVisibleCategories] = useState(allCategoires)



    const dispatcher = useDispatch()


    const handleCloseButtonClick = () => {
        dispatcher(closePopUp())
    }


    const handleServiceClick = (itemAndCategory) => {
        resultFunction(itemAndCategory)
        dispatcher(closePopUp())

    }




    const CategoryComponent = (category, index) => {
        return <div
            className="category-component"
            key={index}  >
            <div className="header">
                <h1>{category.categoryName}</h1>
            </div>
            <div className="body">
                {
                    category.services.map((service, index) => {
                        return <div
                            className="service"
                            key={index}
                            onClick={() => handleServiceClick(service)}
                        >
                            <div className="service-header">
                                <p>
                                    {service.Service}
                                </p>
                            </div>
                            <div className="service-body">
                                <div className="property">
                                    <div className="left">
                                        <Icon icon="mingcute:time-fill" />                                        <span>Start Time</span>
                                    </div>
                                    <div className="right">
                                        <span>
                                            {` 0 - ${service["Average time"]} `}
                                        </span>
                                    </div>
                                </div>
                                <div className="property">
                                    <div className="left">
                                        <Icon icon="material-symbols:avg-time-sharp" />
                                        <span>Avg. Time</span>
                                    </div>
                                    <div className="right">
                                        <span>
                                            {` ${(Math.random() * 20).toFixed()} Minutes`}
                                        </span>
                                    </div>
                                </div>
                                <div className="property">
                                    <div className="left">
                                        <Icon icon="ion:rocket" />
                                        <span>Speed</span>
                                    </div>
                                    <div className="right">
                                        <span>
                                            {` ${(Math.random() * 10).toFixed()} Minutes Stable`}
                                        </span>
                                    </div>
                                </div>

                                <div className="property">
                                    <div className="left">
                                        <Icon icon="game-icons:hand-ok" />
                                        <span>Gurentee</span>
                                    </div>
                                    <div className="right">
                                        <span>
                                            Refill
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    }


    const hugeProccess = useMemo(() => {
        return visibleCategories.map((category, index) => {
            return CategoryComponent(category, index)
        })

    }, [])


    return (
        <div className="select-service-pop-up">
            <button className="close-button"
                onClick={handleCloseButtonClick}>
                <Icon icon="mingcute:close-fill" />
            </button>
            <div className="pop-up-header">
                <h1>All Services</h1>
                <FiledSet
                    legend={
                        {
                            title: "Search Services",
                            svg: <Icon icon="iconamoon:search" />

                        }
                    }
                    inputName={"search-query"}
                />
            </div>
            <div className="pop-up-body">
                {
                    hugeProccess
                }
            </div>

        </div >
    )
}

export default SelectServicePopUp