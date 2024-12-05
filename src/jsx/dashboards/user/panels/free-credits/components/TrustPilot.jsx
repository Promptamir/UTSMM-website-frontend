import Lottie from "react-lottie-player"
import { Icon } from "@iconify/react"
import { useState } from "react"


import trustPioltsAniamtion from "../../../../../../animations/user-dashboard/free-credits-trust-pilot.json"
import { post, useFetch } from "../../../../../../lib/useFetch"
import { API } from "../../../../../../lib/envAccess"
import { useEffect } from "react"
import { showError } from "../../../../../../lib/alertHandler"
import Swal from "sweetalert2"

export default function TrustPilot() {

    const [giftStatus, error, loading] = useFetch(API.DASHBOARD.GIFTS.TRSUT_PILOT.STATUS.GET)

    const [trustPoiletHasImage, setTrustPoiletHasImage] = useState(false)
    const [trustPoiletSteps, setTrustPoiletSteps] = useState(0)
    const [resultMessage, setResultMessage] = useState(
        "Thanks! Results coming soon."
    )


    const onTrustPoilotFileInputChnage = (e) => {
        const file = e.target.files
        setTrustPoiletHasImage(file.length === 1)
    }

    useEffect(() => {
        if (giftStatus?.accepted === false) {
            return setTrustPoiletSteps(1)
        }
        if (giftStatus?.accepted === true) {
            setResultMessage("Gift Claimed !")
            return setTrustPoiletSteps(1)
        }
        setTrustPoiletSteps(0)
    }, [giftStatus])


    const handleOnSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)

        post(API.DASHBOARD.GIFTS.TRSUT_PILOT.CLAIM.POST, formData)
            .then(response => {
                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: response.data
                    }).then(end => {
                        setTrustPoiletSteps(1)
                    })
                }
            })
            .catch(err => {
                const errors = err?.response?.data
                if (errors) {
                    showError(errors)
                }
            })

    }


    return (
        <section className="trust-pilot">
            <div className="left">
                <Lottie
                    animationData={trustPioltsAniamtion}
                    play
                    loop />
            </div>
            <div className="right">
                <div className="intro">
                    <h1>
                        Share Your <br />
                        <span>Trust Pilot</span> Review <br />
                        Send Proof <br />
                        And <span>Earn $1</span> Credit!
                    </h1>
                    <p>
                        Your opinion matters!
                        <div className="under-line">
                            Leave a positive review on Trust Pilot</div>, send us proof with a photo, and we'll reward you with a $1 credit. Join us in building trust and spreading positivity!
                    </p>
                </div>
                <form
                    className="input-box"
                    onSubmit={handleOnSubmit}
                >
                    <div className="input step">
                        <label >
                            <h2>
                                <Icon icon="ic:baseline-image" />
                                Click For Upload Proof
                            </h2>
                            {
                                trustPoiletHasImage ? <Icon icon="flat-color-icons:ok" /> : <Icon icon="carbon:close-filled" color="red" />
                            }
                            <input
                                type="file"
                                accept="image/*"
                                name="file"
                                disabled={setTrustPoiletSteps !== 0}
                                onChange={onTrustPoilotFileInputChnage} />
                        </label>
                        <button
                            className={`show-${trustPoiletHasImage}`}>
                            Submit
                            <Icon icon="iconamoon:send-fill" />
                        </button>
                    </div>
                    <div className={`gift-status step show-${trustPoiletSteps == 1}`}>
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