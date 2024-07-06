import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import { useState } from 'react';
import {Link, useFetcher, useLocation, useNavigate} from 'react-router-dom';
const Header = (
    {
        userPanelMenuState,
        setUserPanelMenuState,
        mainMenuState,
        setMainMenuState
    }

) => {

    const tokenExists = sessionStorage.getItem('token') && sessionStorage.getItem('token') !== '';


    const menuList = [
        {
            title: (tokenExists) ? 'Dashboard' : 'Account',
            route: (tokenExists) ? "/user/dashboard/Statics" : '/auth/login',
            icon: <Icon icon="mdi:account" />
        },
        {
            title: "FAQS",
            route: "/faqs",
            icon: <Icon icon="wpf:faq" />
        },
        {
            title: "Blog",
            route: "/blog",
            icon: <Icon icon="uil:blogger" />
        },
        {
            title: "About Us",
            route: "/about-us",
            icon: <Icon icon="mdi:about" />
        },
        {
            title: "Services",
            route: "/services",
            icon: <Icon icon="fluent:data-pie-24-filled" />
        },
        {
            title: "Admin-panel",
            route: "/admin/dashboard",
            icon: <Icon icon="fluent:data-pie-24-filled" />
        }
    ]



    const [currentPage, setCurrentPage] = useState("main-page")
    const navigator = useNavigate()


    const [scrollPosition, setScrollPosition] = useState(menuList[0]);


    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    };



    useEffect(
        () => {
            window.addEventListener("scroll", handleScroll, { passive: true })
        },
        [])

    useEffect(() => {
        setMainMenuState(false)
    }, [
        currentPage
    ])


    function changePage(item) {
        navigator(item.route)
        setCurrentPage(item.title)
    }



    const headerStyle = {
        borderRadius: scrollPosition > 100 ? "0 0 10rem 10rem" : "0",
        backgroundColor: scrollPosition > 100 ? "#3165f3 " : "#3165f3"
    }



    const location = useLocation().pathname;

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [
        location
    ])


    const toggleMenu = () => {
        if (location === "/user/dashboard") {
            setUserPanelMenuState(!userPanelMenuState)
        }
        else {
            setMainMenuState(!mainMenuState)
        }

    }




    return (
        <header style={headerStyle}>
            <div className="left">
                <Link to={'/'}>
                    <img src={require("../../../images/header/logo.png")} className="logo"/>
                </Link>
            </div>
            <div className={`right right-${mainMenuState}`}>
                <ul onClick={toggleMenu} className={`menu`}>
                    {
                        menuList.reverse().map((item, index) => {
                            return <li
                                className=
                                {currentPage === item.title ? "selected" : ""}
                                key={index}
                                onClick={() => { changePage(item) }}
                            >
                                {item.icon}
                                <span>
                                    {item.title}
                                </span>
                            </li>
                        })
                    }
                </ul>
            </div>
            <Icon
                onClick={toggleMenu}
                className='menu-icon'
                icon="ep:menu" />
        </header>
    )
}

export default Header