import { Icon } from "@iconify/react"
import MaxLineText from "../../../../../../cutsome-components/Text/MaxLineText"
import { useFetch } from "../../../../../../../lib/useFetch"
import { API } from "../../../../../../../lib/envAccess"
import {Link} from "react-router-dom";











export default function SavedServices({data}) {
    return (

        <div className="services-offer">
            <div className="header">
                Your Saved Services
            </div>
            <div className="body">

                {
                    data.map((item, index) => {
                        return <div
                            key={index}
                            className="item">
                            <div className="item-header">
                                <MaxLineText
                                    maxLine={2}
                                    content={
                                        <h1>
                                            {item.title}
                                        </h1>
                                    } />
                            </div>
                            <div className="item-body">
                                <ul className="properties">
                                    <li>
                                        <div className="label">
                                            <Icon icon="eos-icons:service" />
                                            <span>
                                                ID
                                            </span>
                                        </div>
                                        <div className="value">
                                            {item.id}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="label">
                                            <Icon icon="tabler:math-min" />
                                            <span>
                                                Min Order
                                            </span>
                                        </div>
                                        <div className="value">
                                            {item.min}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="label">
                                            <Icon icon="tabler:math-max" />
                                            <span>
                                                Max Order
                                            </span>
                                        </div>
                                        <div className="value">
                                            {item.max}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="label">
                                            <Icon icon="mdi:wiper" />
                                            <span>
                                                Per 1k
                                            </span>
                                        </div>
                                        <div className="value">
                                            ${item.rate}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="label">
                                            <Icon icon="ic:baseline-auto-fix-normal" />
                                            <span>
                                                Avarage Time
                                            </span>
                                        </div>
                                        <div className="value">
                                            {"N/A"}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="item-buttons">
                                <Link to={`/user/dashboard/New-Order?service=${item.id}&category=${item.category_id}`}>
                                    <button className="buy">
                                        <span>
                                            Order
                                        </span>
                                        <Icon icon="el:ok"/>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    })
                }


            </div>
        </div>
    )
}
