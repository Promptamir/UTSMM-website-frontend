import FAQsAccordion from "../../cutsome-components/accordion/FAQsAccordion"
import waveBackground from "../../../animations/main-page/comments-background-wave.json"


import Lottie from "react-lottie-player"
import {useFetch} from "../../../lib/useFetch"
import {API} from "../../../lib/envAccess"
import {useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const FAQsPage = () => {
    const {
        data,
        isError,
        isLoading
    } = useQuery({
        queryFn: async () => {
            const {data} = await axios.get('https://utsmm.liara.run/api/faqs')
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

            <div className="faqs-items">
                <div className="col">
                    {
                        !isLoading ? data.map((item, index) => {
                            return <FAQsAccordion
                                key={index}
                                headerTitle={item.question}
                                bodyTitle={item.answer}
                                isExpanded={item.isExpanded}/>
                        }) : <h1>Loading ...</h1>
                    }
                </div>
                <div className="col">
                    {
                        !isLoading ? data.map((item, index) => {
                            return <FAQsAccordion
                                key={index}
                                headerTitle={item.question}
                                bodyTitle={item.answer}
                                isExpanded={item.isExpanded}/>
                        }) : null
                    }
                </div>

            </div>

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