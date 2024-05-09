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




export default function Faqs() {


    faqs.fr = 10
    faqsQuestion.fr = 5
    faqsBackground.fr = 5
    faqsFormQuestion.fr = 30

    const [data, error, loading, createFaq] = usePost(API.FAQS.POST)


    const handleFAQMessage = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        formData.forEach((key, value) => {
            console.log(key, " -> ", value)
        })
        createFaq(formData)

    }


    const faqsLeftList = [
        {
            "question": "What is social media marketing (SMM)?",
            "answer": "Social media marketing, often abbreviated as SMM, is an essential component of digital marketing strategies. It involves leveraging various social media platforms to create and share content, engage with users, and achieve specific marketing goals. By utilizing platforms like Facebook, Instagram, Twitter, LinkedIn, and Pinterest, businesses can establish a strong online presence, connect with their target audience, and drive traffic to their websites.",
            "isExpanded": true
        },
        {
            "question": "Why is SMM important for my business?",
            "answer": "Social media marketing is crucial for businesses of all sizes because it provides a direct channel to interact with potential and existing customers. Through SMM, you can build brand awareness, foster customer loyalty, and influence purchasing decisions. As platforms continue to evolve, SMM enables you to adapt to the changing preferences of your audience and stay ahead of competitors.",
            "isExpanded": false
        },
        {
            "question": "Which social media platforms should I focus on?",
            "answer": "The choice of social media platforms depends on your specific business goals and target audience. For instance, if you're a B2B company looking to establish industry authority, LinkedIn might be a primary platform. If your business revolves around visual content, Instagram and Pinterest could be valuable. An in-depth analysis of your audience demographics and behavior will guide you in selecting the platforms that best align with your objectives.",
            "isExpanded": false
        }
    ]

    const faqsRightList = [

        {
            "question": "Do you provide analytics and performance reports?",
            "answer": "Absolutely. We understand the importance of data-driven decision-making. We continuously monitor and analyze key performance indicators (KPIs) such as engagement rates, reach, click-through rates, and conversions. Our detailed reports offer insights into campaign effectiveness, allowing us to fine-tune strategies for optimal results.",
            isExpanded: true
        },
        {
            "question": "How do I begin working with your SMM services?",
            "answer": "Initiating our SMM services is simple. Reach out to us through our website or email, and we'll schedule a consultation. During this discussion, we'll delve into your business goals, target audience, and existing online presence. With this information, we'll develop a tailored SMM strategy that aligns with your vision.",
            "isExpanded": false
        },
        {
            "question": "What's the typical timeline for seeing results with SMM?",
            "answer": "The timeline for noticeable results varies based on factors like your industry, competition, current online presence, and the aggressiveness of the strategy. While some improvements might become apparent within a few weeks, substantial and sustained growth often takes a few months of consistent effort and optimization.",
            "isExpanded": false
        }
    ]


    return (

        <section className="faqs">
            <div className="faqs-list">
                <div className="left">
                    <div className="col">
                        {
                            faqsLeftList.map((item, index) => {
                                return <FAQsAccordion
                                    key={index}
                                    headerTitle={item.question}
                                    bodyTitle={item.answer}
                                    isExpanded={item.isExpanded} />
                            })
                        }
                    </div>
                    <div className="col">
                        {
                            faqsRightList.map((item, index) => {
                                return <FAQsAccordion
                                    key={index}
                                    headerTitle={item.question}
                                    bodyTitle={item.answer}
                                    isExpanded={item.isExpanded} />
                            })
                        }
                    </div>


                </div>
                <div className="right">
                    <Lottie
                        animationData={faqs}
                        play
                        loop />
                    <Link to={'#'}>
                        <span>
                            Find More Q&A
                        </span>
                        <Icon icon="fluent:next-20-filled" />
                    </Link>
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

                    <form
                        action='#'
                        onSubmit={handleFAQMessage}
                    >

                        <FiledSet
                            legend={{
                                title: "FullName",
                                svg: <Icon icon="fluent:rename-16-filled" />
                            }}
                            inputName={"fullName"}
                            isRequired={true}
                        />

                        <FiledSet
                            legend={{
                                title: "Email",
                                svg: <Icon icon="mdi:email" />
                            }}
                            inputName={"email"}
                            inputType={"email"}
                            isRequired={true}
                        />

                        <FiledSet
                            legend={{
                                title: "Phone Number",
                                svg: <Icon icon="solar:phone-bold" />
                            }}
                            inputName={"phoneNumber"}
                            isRequired={true}
                        />

                        <FiledSet
                            fieldClassName={"message-box"}
                            legend={{
                                title: "Message",
                                svg: <Icon icon="ic:baseline-message" />
                            }}
                            contentComponent={
                                <textarea
                                    name={"message"}
                                    rows={10}
                                >

                                </textarea>
                            }
                            inputName={"Message"}
                            isRequired={true}
                        />

                        {
                            error ? <div className="error-box fade-animation">
                                <Icon className="icon" icon="bxs:error" />
                                <div className="errors">

                                    {error.map(err => {
                                        return <span>
                                            {err}
                                        </span>
                                    })}
                                </div>

                            </div> : ""
                        }

                        <button>
                            <span>{loading ? "Submitting" : "Submit"}</span>
                            <Icon icon="formkit:submit" />
                        </button>

                    </form>

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
