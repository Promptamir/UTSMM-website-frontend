import FAQsAccordion from "../../cutsome-components/accordion/FAQsAccordion"
import waveBackground from "../../../animations/main-page/comments-background-wave.json"


import Lottie from "react-lottie-player"
import {useFetch} from "../../../lib/useFetch"
import {API} from "../../../lib/envAccess"
import {useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import BE_URL from "../../../lib/envAccess";

const FAQsPage = () => {
    const {
        data,
        isError,
        isLoading
    } = useQuery({
        queryFn: async () => {
            const {data} = await axios.get(`${BE_URL}/faqs`)
            return data.entities.faqs;
        }
    })

    waveBackground.fr = 5
    return (
        <main className="faqs-page">
            <div className="faqs-poster">
                <div className="left">
                    <img src={window.location.origin + "/17.svg"} alt=""/>
                </div>
                <div className="right">
                    <h1>
                        Frequently
                        <span>Asked
              Questions</span>
                    </h1>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat sequi possimus quo. Nam,
                        repellat? Magni sit alias illo, aliquid impedit est doloribus consequuntur, porro incidunt et
                        voluptatem doloremque voluptate. Consectetur!
                    </p>
                </div>
            </div>
            {
                (isLoading)
                    ? <h1>Loading ....</h1>
                    : (isError)
                        ? <h1>Error</h1>
                        : (
                            <div style={{padding: '20px', zIndex: '500'}}>
                                {
                                        (data.ticket.length !== 0)
                                            ? (
                                                <div style={{display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '50px'}}>
                                                    <h1 style={{color: 'white'}}>Ticket Related:</h1>
                                                    {
                                                        data.ticket.map((item, index) => (
                                                            <FAQsAccordion key={index} bodyTitle={item.answer} headerTitle={item.question} isExpanded={false} />
                                                        ))
                                                    }
                                                </div>
                                            ) : false
                                }
                                {
                                        (data.order.length !== 0)
                                            ? (
                                                <div style={{display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '50px'}}>
                                                    <h1 style={{color: 'white'}}>Order Related:</h1>
                                                    {
                                                        data.order.map((item, index) => (
                                                            <FAQsAccordion key={index} bodyTitle={item.answer} headerTitle={item.question} isExpanded={false} />
                                                        ))
                                                    }
                                                </div>
                                            ) : false
                                }
                                {
                                        (data.payment.length !== 0)
                                            ? (
                                                <div style={{display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '50px'}}>
                                                    <h1 style={{color: 'white'}}>Payment Related:</h1>
                                                    {
                                                        data.payment.map((item, index) => (
                                                            <FAQsAccordion key={index} bodyTitle={item.answer} headerTitle={item.question} isExpanded={false} />
                                                        ))
                                                    }
                                                </div>
                                            ) : false
                                }
                                {
                                        (data.general.length !== 0)
                                            ? (
                                                <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                                                    <h1 style={{color: 'white'}}>General Related:</h1>
                                                    {
                                                        data.general.map((item, index) => (
                                                            <FAQsAccordion key={index} bodyTitle={item.answer} headerTitle={item.question} isExpanded={false} />
                                                        ))
                                                    }
                                                </div>
                                            ) : false
                                }
                            </div>
                        )
            }

            <div className="background">
                <Lottie
                    className="charachter-animation"
                    animationData={waveBackground}
                    play
                    loop/>
            </div>

        </main>
    )
}

export default FAQsPage