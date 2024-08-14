import { useState } from "react"
import BE_URL from "../../../lib/envAccess";
import Statics from "./panels/statics/Statics"
import PanelsItem from "./Components/PanelsItem"
import { Icon } from "@iconify/react"
import Orders from "./panels/orders/Orders"
import { useEffect } from "react"
import AddFounds from "./panels/add-found/AddFounds"
import Tickets from "./panels/tickets/Tickets"
import Affliates from "./panels/affliates/Affliates"
import PanelNestedItem from "./Components/PanelNestedItem"
import MassOrders from "./panels/mass-orders/MassOrders"
import NewOrders from "./panels/new-order/NewOrders"
import { useNavigate, useParams } from "react-router-dom"
import FreeCredits from "./panels/free-credits/FreeCredits"
import '../../../css/dashboard/user/menu.css';
import Setting from './panels/setting/Setting';
import Updates from "./panels/updates/updates";
import ApiPanel from "../../primaries/apiPanel";
import {useFetch} from "../../../lib/useFetch";

const UserDashboard = (
    {
        userDashboardMenuState,
        setUserDashboardMenuState
    }
) => {
    const navigator = useNavigate()
    const params = useParams()
    const panelMenuOptions = [
        {
            type: "normal",
            title: "Statics",
            icon: <Icon icon="ri:dashboard-fill" />,
            component: <Statics />
        },
        {
            type: "normal",

            title: "Add-Founds",
            icon: <Icon icon="solar:dollar-bold" />,
            component: <AddFounds />
        },
        {
            title: "Orders",
            icon: <Icon icon="ph:bag-fill" />,
            type: "nested",
            items: [
                {
                    type: "normal",
                    title: "New-Order",
                    icon: <Icon icon="fluent:tab-new-24-filled" />,
                    component: <NewOrders />,
                },
                {
                    title: "Mass-Order",
                    icon: <Icon icon="material-symbols:order-play" />,
                    component: <MassOrders />,
                },
                {
                    title: "Orders-History",
                    icon: <Icon icon="ph:bag-fill" />,
                    component: <Orders />,
                },
            ],
        },
        {
            type: "normal",
            title: "Tickets",
            icon: <Icon icon="ion:ticket-sharp" />,
            component: <Tickets />
        },
        {
            type: "normal",
            title: "Updates",
            icon: <Icon icon="dashicons:update-alt" /> ,
            component: <Updates />
        },
        {
            type: "normal",
            title: "API",
            icon: <Icon icon="ant-design:api-filled" />,
            component: <ApiPanel />
        },
        {
            type: "normal",
            title: "Free-Credit",
            icon: <Icon icon="mdi:credit-card" />,
            component: <FreeCredits />
        },
        {
            type: "normal",
            title: "Affiliates",
            icon: <Icon icon="dashicons:update-alt" />,
            component: <Affliates />
        },
        {
            type: "normal",
            title: "Setting",
            icon: <Icon icon="ant-design:setting-filled" />,
            component: <Setting />
        },
        {
            type: "click",
            title: "Home",
            icon: <Icon icon="material-symbols:home" />
        },
    ]
    const [selectedPanel, selectPanel] = useState(panelMenuOptions[0])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        setUserDashboardMenuState(false)

        window.history.replaceState(null, selectedPanel.title, `/user/dashboard/${selectedPanel.title}`)


    }, [selectedPanel])

    useEffect(() => {
        const page = params?.page?.toLocaleLowerCase()?.trim()

        panelMenuOptions.forEach(menu => {
            menu?.items?.forEach(nestedMenu => {
                const targetMenuTitle = nestedMenu.title.toLowerCase().trim()
                if (targetMenuTitle === page) {
                    selectPanel(nestedMenu)
                    return
                }
            })
            const targetMenuTitle = menu.title.toLowerCase().trim()
            if (targetMenuTitle === page) {
                selectPanel(menu)
                return
            }
        })

    }, [params])

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setloading] = useState(false);

    const [data, fetchError, fetchLoading, setUrl, refreshData, refetch] = useFetch(`${BE_URL}/user-index`);

    return (
        <main className="user-dashboard">
            {
                (fetchLoading)
                    ? (
                        <div className={'loading-full-screen'}>
                            <Icon icon={'eos-icons:loading'} width={40} href={40}/>
                        </div>
                    ) : (fetchError)
                        ? (
                            <div className={'error-full-screen'}>
                                <p>There was an error while fetching the data</p>
                            </div>
                        ) : (
                            <>
                                <ul className={`panel-menu panel-menu-${userDashboardMenuState}`}>
                                    <div className="menu-items">
                                        {
                                            panelMenuOptions.map((panel, index) => {
                                                {
                                                    if (panel.type === "nested") {
                                                        return <PanelNestedItem
                                                            key={index}
                                                            data={panel}
                                                            selectPanel={selectPanel}
                                                            selectedPanel={selectedPanel}
                                                        />
                                                    }
                                                }

                                                {
                                                    if (panel.type === "click") {
                                                        return <PanelsItem
                                                            key={index}
                                                            title={panel.title}
                                                            icon={panel.icon}
                                                            currentActivePanel={selectedPanel.title}
                                                            clickEvent={() => navigator("/")}
                                                        />
                                                    }
                                                }

                                                {
                                                    if (panel.type === "normal") {
                                                        return <PanelsItem
                                                            key={index}
                                                            title={panel.title}
                                                            icon={panel.icon}
                                                            currentActivePanel={selectedPanel.title}
                                                            clickEvent={() => selectPanel(panel)}
                                                        />
                                                    }
                                                }

                                            })
                                        }
                                        <button disabled={loading} className={'log-out'} onClick={() => {
                                            setError('');
                                            setloading(true);

                                            fetch(`${BE_URL}/current-auth-token`, {
                                                method: "DELETE",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                    "Accept": "application/json",
                                                    "X-Requested-With": "XMLHttpRequest",
                                                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                                                }
                                            })
                                                .then(() => {
                                                    setloading(false);
                                                    setError('');

                                                    localStorage.removeItem('token');
                                                    navigate('/');
                                                })
                                                .catch((err) => {
                                                    setloading(false);
                                                    setError('There was an unexpected error. Please try again.');
                                                })

                                        }}>Log out
                                        </button>
                                        {error !== '' && <div className={'error'}>{error}</div>}
                                    </div>
                                </ul>
                                <div className="panel">
                                    {selectedPanel?.component}
                                </div>
                            </>
                        )
            }
        </main>
    )
}

export default UserDashboard