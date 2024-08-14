import { Icon } from "@iconify/react"
import MaxLineText from "../../../../../../cutsome-components/Text/MaxLineText"
import { useFetch } from "../../../../../../../lib/useFetch"
import BE_URL, { API } from "../../../../../../../lib/envAccess"
import {Link} from "react-router-dom";
import {useState} from "react";
import swal from "sweetalert2";
import HandleFetchError from "../../../../../../../lib/handleFetchError";


export default function SavedServices({data, refresh}) {
    // Creating inner component
    function InnerComponent({item}) {
        const [loading, setLoading] = useState(false);

        return (
            <div className="item">
                <div className="item-header">
                    <MaxLineText
                        maxLine={2}
                        content={
                            <h1>
                                {item.title}
                            </h1>
                        }/>
                </div>
                <div className="item-body">
                    <ul className="properties">
                        <li>
                            <div className="label">
                                <Icon icon="eos-icons:service"/>
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
                                <Icon icon="tabler:math-min"/>
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
                                <Icon icon="tabler:math-max"/>
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
                                <Icon icon="mdi:wiper"/>
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
                                <Icon icon="ic:baseline-auto-fix-normal"/>
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
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        width: '100%'
                    }}>
                        <Link
                            to={`/user/dashboard/New-Order?service=${item.id}&category=${item.category_id}`}>
                            <button tabIndex={-1} className="buy">
                                                <span>
                                                    Order
                                                </span>
                                <Icon icon="el:ok"/>
                            </button>
                        </Link>
                        <button
                            onClick={() => {
                                setLoading(true);
                                fetch(`${BE_URL}/user/favorite-services/${item.id}`, {
                                    method: 'DELETE',
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Accept": "application/json",
                                        "X-Requested-With": "XMLHttpRequest",
                                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                                    }
                                })
                                    .then((data) => data.json())
                                    .then((data) => {
                                        setLoading(false);
                                        HandleFetchError({
                                            data: data,
                                            lineBreak: true,
                                            callbackSuccess: (message) => {
                                                swal.fire({icon: 'success', text: message})
                                                refresh()
                                            },
                                            callbackError: (message) => swal.fire({icon: 'error', text: message})
                                        })
                                    })
                                    .catch(() => {
                                        setLoading(false);
                                        swal.fire({
                                            icon: 'error',
                                            text: 'There was an error while fetching the data'
                                        })
                                    })

                            }}
                            style={{
                                display: 'flex',
                                gap: '10px',
                                borderRadius: '50rem',
                                color: 'white',
                                background: 'red',
                                opacity: (loading) ? '50%' : '100%'
                            }}
                            disabled={loading}
                        >
                            <Icon icon={'material-symbols:delete'}/>
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (

        <div className="services-offer">
            <div className="header">
                Your Saved Services
            </div>
            <div className="body">
                {
                    (data.length === 0)
                        ? <h1>There is nothing to show</h1>
                        : data.map((item, index) => {
                            return <InnerComponent key={index} item={item} />
                        })
                }


            </div>
        </div>
    )
}
