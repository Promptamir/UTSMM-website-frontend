import Lottie from "react-lottie-player"
import FAQsAccordion from "../../../../cutsome-components/accordion/FAQsAccordion"
import { Icon } from "@iconify/react"

import faqs from "../../../../../animations/main-page/home-page-faqs.json"


import faqsBackground from "../../../../../animations/main-page/main-page-faqs-background.json"
import faqsFormQuestion from "../../../../../animations/main-page/main-page-faqs-wave.json"
import faqsQuestion from "../../../../../animations/main-page/question.json"
import FiledSet from "../../../../cutsome-components/Fieldset/FiledSet"
import { API } from "../../../../../lib/envAccess"
import { useFetch, usePost } from "../../../../../lib/useFetch"
import {Link} from "react-router-dom";

import BE_URL from "../../../../../lib/envAccess";
import Question from "./question";


export default function Faqs({data, error, loading}) {


    faqs.fr = 10
    faqsQuestion.fr = 5
    faqsBackground.fr = 5
    faqsFormQuestion.fr = 30

    return (

        <section className="faqs">
            <div className="faqs-list">
                <div className="left">
                    {
                        (loading)
                            ? <Icon icon={'eos-icons:loading'} width={40} href={40} />
                            : (error)
                                ? <h1>There was an error while fetching the data</h1>
                                : (
                                    <>
                                        <div className="col">
                                            {
                                                data.entities.faqs.slice(0, 3).map((item, index) => {
                                                    return <FAQsAccordion
                                                        key={index}
                                                        headerTitle={item.question}
                                                        bodyTitle={item.answer}
                                                        isExpanded={item.isExpanded}/>
                                                })
                                            }
                                        </div>
                                        <div className="col">
                                            {
                                                data.entities.faqs.slice(3, 6).map((item, index) => {
                                                    return <FAQsAccordion
                                                        key={index}
                                                        headerTitle={item.question}
                                                        bodyTitle={item.answer}
                                                        isExpanded={item.isExpanded}/>
                                                })
                                            }
                                        </div>
                                    </>
                                )
                    }
                </div>
                <div className="right">
                    <Lottie
                        animationData={faqs}
                        play
                        loop/>
                </div>
                <div className="faqs-background">
                    <Lottie
                        className='animation'
                        animationData={faqsBackground}
                        play
                        loop
                    />
                </div>
            </div>
            <div className="add-question">
                <div className="left">
                    <Lottie
                        animationData={faqsQuestion}
                        play
                        loop />
                </div>
                <div className="right">

                    <div className="info">
                        <h1>
                            Do You Have
                            <span>Question?</span>
                        </h1>
                        <p> We've got answers! Please take a moment to browse through our frequently asked questions. If you can't find what you're looking for, feel free to submit your question using the form below.</p>
                    </div>

                    <Question />

                </div>
                <div className="add-question-background">
                    <Lottie
                        animationData={faqsFormQuestion}
                        play
                        loop
                    />
                </div>
            </div>
        </section>
    )
}
