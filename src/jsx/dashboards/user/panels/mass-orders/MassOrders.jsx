import React, {useEffect} from 'react'
import UserQuickView from '../../Components/UserQuickView'
import Lottie from 'react-lottie-player'
import Swal from 'sweetalert2';
import { useFetch } from '../../../../../lib/useFetch'; 
import { useState } from 'react';
import BE_URL from "../../../../../lib/envAccess";

// Animation 
import massOrderAnimation from "../../../../../animations/user-dashboard/mass-order-animation.json"
import massOrderBackground from "../../../../../animations/user-dashboard/mass-order-background.json"
import { Icon } from '@iconify/react'
import HandleFetchError from "../../../../../lib/handleFetchError";


const MassOrders = () => {
    massOrderAnimation.fr = 10
    massOrderBackground.fr = 5

    const [data, error, loading] = useFetch(`${BE_URL}/user-index`);
    const [val, setVal] = useState('');
    const [formLoading, setFormLoading] = useState(false);
    const [customError, setCustomError] = useState('');

    const handleSubmitClick = (e) => {
        e.preventDefault();

        setFormLoading(true);
        fetch(`${BE_URL}/mass-orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json",
                "X-Requested-With" : "XMLHttpRequest",
                "Authorization" : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
            body: JSON.stringify({"orders": val})
        })
            .then((data) => data.json())
            .then((data) => {
                setFormLoading(false);
                if (data.message === "There is some errors, see details for more info") {
                    setCustomError(data.entities.results.join(' & ').replace(/&/g, '<br />'))
                } else {
                    HandleFetchError({
                        data: data,
                        lineBreak: false,
                        callbackSuccess: (message) => Swal.fire({icon: 'success', text: message}),
                        callbackError: (message) => Swal.fire({icon: 'error', text: message})
                    })
                }
            })
            .catch(() => {
                setFormLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'There was an error while fetching the data'
                })
            })
    }


    return (
        <section className='panel-mass-orders'>
            <div className="mass-order-background ">
                <Lottie
                    className='group-media'
                    animationData={massOrderBackground}
                    play
                    loop />
            </div>
            {
                (loading)
                    ? (
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: "center", width: '100%', padding: '20px'}}>
                            <Icon icon={'eos-icons:loading'} width={40} href={40} />
                        </div>
                    ) : (error)
                        ? <h1>There was an error while fetching the data</h1>
                        : <UserQuickView
                            orders={data.entities.total_orders}
                            spend={data.entities.total_spend}
                            balance={data.entities.balance}
                            activeOrders={data.entities.active_orders}
                        />
            }
            <div className="intro row">
                <div className="left">
                    <Lottie
                        animationData={massOrderAnimation}
                        play
                        loop />
                </div>
                <div className="right">
                    <h1>Mass Order</h1>
                    <p>
                        We offer a dedicated mass order section to streamline and efficiently manage your bulk SMM panel orders. Our mass order section allows you to submit and track large quantities of orders, ensuring a smooth and  delightful experience.
                    </p>
                </div>
            </div>
            <div className="how-it-work row">

                <h1>How it Work ?</h1>

                <ul className='guid'>
                    <li>
                        <span>
                            Format your orders
                        </span>
                        <p>
                            Each order should be entered on a separate line, following this structure: service_id | link | quantity.
                        </p>
                    </li>
                    <li>
                        <span>
                            Service ID
                        </span>
                        <p>
                            Specify the unique identifier for the social media service you want to purchase.
                        </p>
                    </li>
                    <li>
                        <span>
                            Link
                        </span>
                        <p>
                            Provide the relevant URL where you want the service applied. It could be a post URL, profile link, or any other applicable link.
                        </p>
                    </li>
                    <li>
                        <span>
                            Quantity
                        </span>
                        <p>
                            Indicate the quantity or number of units for the selected service.
                        </p>
                    </li>
                </ul>



            </div>
            <div className="examples row">
                <h1>Examples : </h1>
                <div className="items">
                    <div className="example-item">
                        <h2>
                            Example 1
                        </h2>
                        <ul>
                            <li>
                                <span>
                                    Service ID
                                </span>
                                <p>
                                    12345
                                </p>
                            </li>
                            <li>
                                <span>
                                    Link
                                </span>
                                <p>
                                    https://www.instagram.com/p/abc123
                                </p>
                            </li>
                            <li>
                                <span>
                                    Quantity
                                </span>
                                <p>
                                    1000
                                </p>
                            </li>
                            <li>
                                <span>
                                    Result :
                                </span>
                                <p>
                                    12345 | https://www.instagram.com/p/abc123 | 1000
                                </p>
                            </li>
                        </ul>

                    </div>
                    <div className="example-item">
                        <h2>
                            Example 2
                        </h2>
                        <ul>
                            <li>
                                <span>
                                    Service ID
                                </span>
                                <p>
                                    67890
                                </p>
                            </li>
                            <li>
                                <span>
                                    Link
                                </span>
                                <p>
                                    https://www.instagram.com/p/xyz789
                                </p>
                            </li>
                            <li>
                                <span>
                                    Quantity
                                </span>
                                <p>
                                    500
                                </p>
                            </li>
                            <li>
                                <span>
                                    Result
                                </span>
                                <p>
                                    67890 | https://www.instagram.com/p/xyz789 | 500

                                </p>
                            </li>
                        </ul>

                    </div>
                </div>

            </div>
            <form className="order-box row"
                action='#'
                onSubmit={handleSubmitClick}>
                <div className="form-header"></div>
                <div className="form-groups">
                    <textarea 
                        name="order" 
                        cols="30" 
                        rows="10"
                        placeholder='service_id | link | quantity' 
                        required 
                        onChange={(e) => setVal(e.target.value)}
                    />
                </div>
                {customError !== '' && (
                    <div dangerouslySetInnerHTML={{__html: customError}} style={{
                        background: 'rgba(21,35,73,0.2)',
                        width: '100%',
                        padding: '10px',
                        borderRadius: '10px',
                        marginTop: '20px',
                        border: '1px solid #152349',
                        color: '#152349',
                        fontSize: '24px',
                        fontWeight: 'normal'
                    }} />
                )}
                <div className="form-buttons">
                    <button disabled={formLoading}>
                        {
                            (!formLoading)
                                ? (
                                    <>
                                        <span>Submit</span>
                                        <Icon icon="formkit:submit" />
                                    </>
                                ) : (
                                  <>
                                      <span>Loading</span>
                                      <Icon icon={'eos-icons:loading'} width={20} href={20} />
                                  </>
                                )
                        }
                    </button>
                </div>
            </form>

        </section>
    )
}

export default MassOrders
