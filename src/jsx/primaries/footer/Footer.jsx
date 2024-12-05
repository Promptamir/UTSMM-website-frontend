import { Icon } from "@iconify/react"


import avatar from "../../../images/footer/avatar.svg"
import Lottie from "react-lottie-player"



import footerAnimation from "../../../animations/main-page/footer-animation.json"
import {Link, useNavigate} from "react-router-dom"


const Footer = () => {

  footerAnimation.fr = 10

  const navigator = useNavigate()



  const handleClick = (path) => {
    navigator(path)
  }


  return (
    <footer>
      <div className="left">
        <h1>
          Take your social media game to the next level with UTSMM!
        </h1>
        <div className="social-media">
          <Link style={{color: 'white'}} to={'/'} className="item">
            <Icon icon="iconoir:internet" />
            <span>WWW.UTSMM.COM</span>
          </Link>
          <Link style={{color: 'white'}} to={'https://instagram.com/UT_SMM'} className="item">
            <Icon icon="formkit:instagram" />
            <span>@UT_SMM</span>
          </Link>
          <Link style={{color: 'white'}} to={'https://telegram.com/UT_SMM'} className="item">
            <Icon icon="ic:twotone-telegram" />
            <span>@UT_SMM</span>
          </Link>
        </div>
      </div>
      <div className="right">
        <ul>
          <h1>Quick Links</h1>
          <Link style={{color: 'white'}} to={"/faqs"}>FAQ</Link>
          <Link style={{color: 'white'}} to={"/services"}>Services</Link>
          <Link style={{color: 'white'}} to={"/contact-us"}>Contact Us</Link>
        </ul>

        <ul>
          <h1>Support</h1>
          <Link style={{color: 'white'}} to={'/docs'}>API DOCS</Link>
          <Link style={{color: 'white'}} to={'/tickets'}>Tickets</Link>
          <Link style={{color: 'white'}} to={'/terms'}>Terms & Conditions</Link>
          <Link style={{color: 'white'}} to={'/privacy'}>Privacy Policy</Link>
          <Link style={{color: 'white'}} to={'/policy'}>Refund Policy</Link>
        </ul>
      </div>
      <img className="avatar" src={window.location.origin + '/6.svg'} alt="" />

    </footer>
  )
}

export default Footer