import { useState } from "react"
import Dashboard from "./components/dashboard/Dashboard"
import { Icon } from "@iconify/react"
import Services from "./components/services/Services"
import Users from "./components/users/Users";
import ContactsUs from "./components/contact-us/ContactsUs";
import Faqs from "./components/faqs/Faqs";
import Blogs from "./components/blogs/Blogs";
import Tickets from "./components/tickets/Tickets";
import Economy from "./components/economy/Economy";
import Orders from "./components/orders/Orders";
import Platforms from "./components/platforms/Platforms";
import PaymentMethods from "./components/payment-methods/PaymentMethods";
import CommentPage from './components/comment/commentPage';
import Settings from "./components/settings/Settings";
import Categories from "./components/categories/Categories";

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
            title: "Tickets",
            svg: <Icon icon="majesticons:tickets" />,
            component: <Tickets />
        },
        {
            title: "Users",
            svg: <Icon icon="mdi:users" />,
            component: <Users />
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
            title: "Contact Us",
            svg: <Icon icon="mdi:support" />,
            component: <ContactsUs />
        },
        {
            title: "Economy",
            svg: <Icon icon="tdesign:money" />,
            component: <Economy />
        },
        {
            title: "Payment Methods",
            svg:<Icon icon="fluent:payment-48-filled" />,
            component: <PaymentMethods/>
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
        },
    ]

    const [selectedMenu, setSelectedMenu] = useState(menu[0])


    return (
        <main className="admin-dashboard">
            <nav>
                {
                    menu.map((item, index) => {
                        return <div
                            onClick={() => { setSelectedMenu(item) }}
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
        </main>
    )
}

export default AdminDashboard