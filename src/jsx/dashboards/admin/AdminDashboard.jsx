import {useState} from "react"
import Dashboard from "./components/dashboard/Dashboard"
import {Icon} from "@iconify/react"
import Services from "./components/services/Services"
import Faqs from "./components/faqs/Faqs";
import Blogs from "./components/blogs/Blogs";
import Tickets from "./components/tickets/Tickets";
import Economy from "./components/economy/Economy";
import Orders from "./components/orders/Orders";
import Platforms from "./components/platforms/Platforms";
import CommentPage from './components/comment/commentPage';
import Settings from "./components/settings/Settings";
import Categories from "./components/categories/Categories";
import HotCategories from "./components/hot-categories/HotCategories";
import Question from "./components/question/Question";
import ExternalReviews from "./components/external-reviews/externalReviewsPage";
import RefileOrders from "./components/refile-orders/RefileOrders";
import {useFetch} from "../../../lib/useFetch";
import BE_URL from "../../../lib/envAccess";

const AdminDashboard = () => {
    const menu = [
        {
            title: "Dashboard",
            svg: <Icon icon="ri:dashboard-fill" />,
            component: <Dashboard />
        },
        {
            title: "Services",
            svg: <Icon icon="mdi:internet" />,
            component: <Services />
        },
        {
            title: "Orders",
            svg: <Icon icon="ri:dashboard-fill" />,
            component: <Orders />
        },
        {
            title: "Refiled Orders",
            svg: <Icon icon="ri:dashboard-fill" />,
            component: <RefileOrders />
        },
        {
            title: "Tickets",
            svg: <Icon icon="majesticons:tickets" />,
            component: <Tickets />
        },
        {
            title: "Blogs",
            svg: <Icon icon="fa-solid:blog" />,
            component: <Blogs />
        },
        {
            title: "FAQS",
            svg: <Icon icon="wpf:faq" />,
            component: <Faqs />
        },
        {
            title: "Economy",
            svg: <Icon icon="tdesign:money" />,
            component: <Economy />
        },
        {
            title: "Platforms",
            svg:<Icon icon="clarity:internet-of-things-solid" />,
            component: <Platforms/>
        },
        {
            title: "Setting",
            svg: <Icon icon="ant-design:setting-filled" />,
            component: <Settings />
        },
        {
            title: "Comment",
            svg: <Icon icon="ant-design:message-filled" />,
            component: <CommentPage />
        },
        {
            title: "Categories",
            svg: <Icon icon="bx:category-alt" />,
            component: <Categories />
        },{
            title: "Hot Categories",
            svg: <Icon icon="bx:category-alt" />,
            component: <HotCategories />
        },
        {
            title: "Questions",
            svg: <Icon icon="bi:question" />,
            component: <Question />
        },
        {
            title: 'External reviews',
            svg: <Icon icon="mage:preview-circle" />,
            component: <ExternalReviews />
        }
    ]
    const [selectedMenu, setSelectedMenu] = useState(menu[0])

    const [data, error, loading, setUrl, refreshData, refetch] = useFetch(`${BE_URL}/admin-index`);

    return (
        <main className="admin-dashboard">
            {
                (loading)
                    ? (
                        <div className={'loading-full-screen'}>
                            <Icon icon={'eos-icons:loading'} width={40} href={40}/>
                        </div>
                    ) : (error)
                        ? (
                            <div className={'error-full-screen'}>
                                <p>There was an error while fetching the data</p>
                            </div>
                        ) : (
                            <>
                                <nav>
                                    {
                                        menu.map((item, index) => {
                                            return <div
                                                onClick={() => {
                                                    setSelectedMenu(item)
                                                }}
                                                key={index}
                                                className={`item selected-${item.title === selectedMenu.title}`}
                                            >
                                                {item.svg}
                                                <span>
                                {item.title}
                            </span>
                                            </div>
                                        })
                                    }
                                </nav>
                                <section className="content">
                                    {selectedMenu.component}
                                </section>
                            </>
                        )
            }
        </main>
    )
}

export default AdminDashboard