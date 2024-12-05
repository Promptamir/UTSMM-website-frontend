


import Lottie from "react-lottie-player"
import { Icon } from "@iconify/react"
import { useState } from "react"
import shareOrTweetAnimation from "../../../../../../animations/user-dashboard/free-credits-share.json"
import { post, useFetch } from "../../../../../../lib/useFetch"
import { API } from "../../../../../../lib/envAccess"
import { useEffect } from "react"
import { showError } from "../../../../../../lib/alertHandler"


export default function ShareTweet() {
    const [giftStatus, error, loading] = useFetch(API.DASHBOARD.GIFTS.RETWEET.STATUS.GET)




    const [shareHasImage, setShareHasImage] = useState(false)
    const [shareSteps, setShareSteps] = useState(0)
    const [resultMessage, setResultMessage] = useState(
        "Thanks! Results coming soon."
    )
    const onShareFileInputChnage = (e) => {
        const file = e.target.files
        setShareHasImage(file.length === 1)
    }


    useEffect(() => {
        if (giftStatus?.accepted === false) {
            return setShareSteps(1)
        }
        if (giftStatus?.accepted === true) {
            setResultMessage("Gift Claimed !")
            return setShareSteps(1)
        }
        setShareSteps(0)
    }, [giftStatus])

    const handleProofSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        post(API.DASHBOARD.GIFTS.RETWEET.CLAIM.POST, formData)
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                const errors = err?.response?.data
                if (errors) {
                    showError(errors)
                }
            })
    }

    return (
        <section className="share-tweet">
            <div className="left">
                <Lottie
                    animationData={shareOrTweetAnimation}
                    play
                    loop />
            </div>
            <div className="right">
                <div className="intro">
                    <h1>
                        <span>Retweet or Share</span> <br />
                        for Valuable Rewards!
                    </h1>
                    <p>
                        Share a <div className="under-line">
                        positive review about us in any social media platform</div>
                        and send proof to our support. Get rewarded with $0.5 credit as our way of saying thank you!
                    </p>
                </div>
                <form className="input-box "
                      onSubmit={handleProofSubmit}
                >
                    {shareSteps === 0 && <div className="input step">
                        <label >
                            <h2>
                                <Icon icon="ic:baseline-image" />
                                Click For Upload Proof
                            </h2>
                            {
                                shareHasImage ? <Icon icon="flat-color-icons:ok" /> : <Icon icon="carbon:close-filled" color="red" />
                            }
                            <input
                                type="file"
                                accept="image/*"
                                name="proof"
                                disabled={shareSteps !== 0}
                                onChange={onShareFileInputChnage} />
                        </label>
                        <button
                            className={`show-${shareHasImage}`}>
                            Submit
                            <Icon icon="iconamoon:send-fill" />
                        </button>
                    </div>}
                    <div className={`gift-status step show-${shareSteps == 1}`}>
                        <li>
                            {resultMessage}
                            <Icon icon="flat-color-icons:ok" />
                        </li>
                    </div>
                </form>
            </div>
        </section>
    )
}