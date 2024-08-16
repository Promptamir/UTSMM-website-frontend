import Lottie from "react-lottie-player"
import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"


import firstSectionAnimation from "../../../../../../animations/user-dashboard/free-credits-first-section-left.json"
import { get, post, useFetch } from "../../../../../../lib/useFetch"
import { API } from "../../../../../../lib/envAccess"
import Swal from "sweetalert2"
import { showError } from "../../../../../../lib/alertHandler"


export default function EmailVerify() {

    const [emailStatus, emailStatusError, loading] = useFetch(API.DASHBOARD.USER_EMAIL_VERIFY.STATUS.GET)





    const platforms = [
        {
            title: "Instagram",
            img: require("../../../../../../images/main-page/social-media/instagram.png"),
            subTitle: "200 Follower"
        },
        {
            title: "Telegram",
            img: require("../../../../../../images/main-page/social-media/telegram.png"),
            subTitle: "200 Member"
        },
    ]


    const [currentSocialGiftSteps, setSocialGiftSteps] = useState(0)
    const [selectedPlatform, setSelectedPlatform] = useState(platforms[0])


    useEffect(() => {
        if (emailStatus === true) {
            setSocialGiftSteps(2)
            get(API.DASHBOARD.GIFTS.EMAIL.STATUS.GET)
                .then(response => {
                    const isClaimed = response?.data?.claimed
                    if (isClaimed === true)
                        return setSocialGiftSteps(4)
                    setSocialGiftSteps(2)
                })
                .catch(err => { })
        } else {
            setSocialGiftSteps(0)
        }
    }, [emailStatus])


    const getVerificationCode = () => {
        get(API.DASHBOARD.USER_EMAIL_VERIFY.CODE.GET)
            .then(response => {
                if (response.status === 200)
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.data
                    }).then(() => {
                        setSocialGiftSteps(1)
                    })
                console.log(response)
            })
            .catch(err => {
                const errros = err?.response?.data
                showError(errros)
            })
    }


    const submitCode = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)

        post(API.DASHBOARD.USER_EMAIL_VERIFY.SUBMIT_CODE.POST, formData)
            .then(response => {
                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.data
                    }).then(end => {
                        setSocialGiftSteps(2)
                    })
                }
            })
            .catch(err => {
                console.log(err)
                const errors = err?.response?.data
                showError(errors)
            })


    }

    const submitLink = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        formData.append("platform", selectedPlatform.title)
        post(API.DASHBOARD.GIFTS.EMAIL.CLAIM.POST, formData)
            .then(response => {
                if (response.status === 200) {
                    Swal.fire({
                        title: "Success!",
                        text: response.data,
                        icon: "success"
                    })
                }
            })
            .catch(error => {
                const errors = error?.response?.data
                showError(errors)
            })
    }



    return (
        <section className="email-verify ">
            <div className="left">
                <Lottie
                    animationData={firstSectionAnimation}
                    play
                    loop />
            </div>
            <div className="right">
                <h1>
                    <span>verify</span> your email <br />
                    and get <span>Gifts !</span>
                </h1>
                <div className="status">
                    <div className="email step">
                        <h2>
                            <Icon icon="ic:round-email" />
                            Email@example.com
                        </h2>
                        <button
                            onClick={getVerificationCode}
                            disabled={currentSocialGiftSteps !== 0}
                        >
                            Send Code
                            <Icon icon="iconamoon:send-fill" />
                        </button>
                    </div>
                    <form
                        onSubmit={submitCode}
                        className={`code-box step show-${currentSocialGiftSteps === 1}`}>
                        <input
                            placeholder="Code Here..."
                            type="text"
                            name="code" />
                        <button>
                            <Icon
                                icon="el:ok"
                            />
                        </button>
                    </form>
                    <div className={`gift-box step show-${currentSocialGiftSteps == 2 || currentSocialGiftSteps == 3}`}>
                        {
                            platforms.map((item, index) => {
                                return <div
                                    className={`item item-${selectedPlatform.title === item.title}`}
                                    key={index}
                                    onClick={
                                        () => {
                                            setSelectedPlatform(item)
                                            setSocialGiftSteps(3)
                                        }

                                    }
                                >
                                    <div className="item-left">
                                        <img src={item.img} />
                                    </div>
                                    <div className="item-right">
                                        <h2>{item.title}</h2>
                                        <small>{item.subTitle}</small>
                                    </div>
                                </div>
                            })
                        }

                    </div>
                    <form
                        onSubmit={submitLink}
                        className={`link-box step show-${currentSocialGiftSteps === 3}`}>
                        <input
                            placeholder="Link Here..."
                            type="text"
                            name="link"
                            required
                        />
                        <button>
                            <Icon
                                icon="el:ok"
                            />
                        </button>
                    </form>
                    <div className={`gift-status step show-${currentSocialGiftSteps === 4}`}>
                        <li>
                            Gift Claimed
                            <Icon icon="flat-color-icons:ok" />
                        </li>
                    </div>
                </div>
            </div>
        </section>
    )
}