import Lottie from "react-lottie-player"


import introAnimation from "../../../../../animations/user-dashboard/dashboard-affiliates-intro.json"
import {CircularProgressbar, buildStyles} from "react-circular-progressbar"
import FakeChartData from "../../../tools/FakeDataGenarator";


// React Chart.js 2 
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    ScriptableContext,
    BarElement,
    Title,
} from "chart.js";
import {ReactChart, Line, Pie, Bar} from "react-chartjs-2";
import MaxLineText from "../../../../cutsome-components/Text/MaxLineText";
import {Icon} from "@iconify/react";
import {useFetch} from "../../../../../lib/useFetch";
import BE_URL, {API, CLIENT, SERVER} from "../../../../../lib/envAccess";
import {useEffect, useState} from "react";
import Swal from "sweetalert2"
import {createData} from "../../../../../lib/chartDataSet";

ChartJS.register(
    ArcElement,
    Tooltip,
    Filler,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    LineElement);


ChartJS.defaults.font.size = 18
ChartJS.defaults.font.weight = "bold"
ChartJS.defaults.font.family = "dosis-regular"
ChartJS.defaults.borderColor = "transparent"
ChartJS.defaults.plugins.legend.align = "start"


const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        x: {
            ticks: {
                color: '#0d4bf4',
                fontSize: 15,
                display: false
            }
        },
        y: {
            ticks: {
                fontSize: 15,
                display: false,
                color: '#0d4bf4'
            }
        }
    }


}


const Affliates = () => {
    introAnimation.fr = 10
    const [affiliates, error, loading] = useFetch(`${BE_URL}/affiliate-statistics`)
    const [link, setLink] = useState(undefined)

    useEffect(() => {
        if (affiliates?.link) {
            setLink(`${CLIENT.BASE_URL}/auth/${affiliates?.link}`)
        } else {
            setLink("loading....")
        }

        const performnace = affiliates.performance

        const tempLabels = affiliates?.performance ? performnace?.map(item => {
            return new Date(item.label).toDateString()
        }) : []

        const tempValues = affiliates?.performance ? performnace?.map(item => {
            return item.ammount
        }) : []

    }, [affiliates])


    return (
        <section className="panel-affliates">
            <div className="intro row">
                <div className="left">
                    <Lottie
                        animationData={introAnimation}
                        play
                        loop
                    />
                </div>
                <div className="right">
                    <h1>
                        Earn with <br/>
                        <span>USMM's </span> <br/>
                        Referral Program
                    </h1>
                    <p>
                        Unlock Earnings by Sharing Your Referral Link and Placing Our Banner on Your Website.
                        Alternatively, Simply Invite Your Friends Using Your Unique Referral Link.
                        As a Referrer, You'll Enjoy a 3% Share of Every Dollar Your Referrals Spend, for Eternity.
                    </p>

                </div>
            </div>
            {
                (loading)
                    ? <h1>Loading</h1>
                    : (error)
                        ? <h1>There was an error while fetching the data</h1>
                        : (
                            <div className="link row">
                                <p>{affiliates.entities.invite_link}</p>
                                <button onClick={() => {
                                    navigator.clipboard.writeText(affiliates.entities.invite_link)
                                        .then(end => {
                                            Swal.fire({
                                                icon: "success",
                                                title: "Success",
                                                text: "Link Copied to your clipboard."
                                            })
                                        })
                                }}>
                                    <Icon icon="bxs:copy"/>
                                    <span>Copy Link</span>
                                </button>
                            </div>
                        )
            }
            <div className="charts row">
                <div className="left">
                    {
                        (loading)
                            ? <h1>Loading</h1>
                            : (error)
                                ? <h1>There was an error while fetching the data</h1>
                                : (
                                    <div className="revenue">
                                        <div className="info">
                                            <h2>Revenue</h2>
                                            <ul>
                                                <li>
                                                    <div className="label">Daily</div>
                                                    <div
                                                        className="value">{affiliates.entities.sum_of_daily_revenues_in_last_week[0].total_sum}</div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="chart">
                                            <CircularProgressbar
                                                className="progresser"
                                                value={75}
                                                strokeWidth={7}
                                                text={`$5,000`}
                                                styles={buildStyles({
                                                    rotation: 0,
                                                    strokeLinecap: 'round',
                                                    textSize: '20px',
                                                    pathTransitionDuration: 0.5,
                                                    pathColor: `#0057d9`,
                                                    textColor: '#0057d9',
                                                    trailColor: 'rgba(0,0,0,0.1)'
                                                })}
                                            />
                                        </div>
                                    </div>
                                )
                    }
                </div>
                <div className="right">
                    <div className="your-performance">
                        <div className="header">
                            <h2>Your Performance</h2>
                        </div>
                        <div className="body">
                            {
                                (loading)
                                    ? <h1>Loading</h1>
                                    : (error) 
                                        ? <h1>There was an error while fetching the data</h1>
                                        : (
                                            <Line
                                                className="chart"
                                                id="myChart"
                                                data={
                                                    createData(
                                                        "$",
                                                        ['l1', 'l2', 'l3'],
                                                        [
                                                            Number(affiliates.entities.total_l1_referrals),
                                                            Number(affiliates.entities.total_l2_referrals),
                                                            Number(affiliates.entities.total_l3_referrals)
                                                        ]
                                                    )
                                                }
                                                options={options}
                                                height={250}
                                                width={350}
                                            />
                                        )
                            }
                           
                        </div>
                        {
                            (loading)
                                ? <h1>Loading</h1>
                                : (error)
                                    ? <h1>There was an error while fetching the data</h1>
                                    : (
                                        <div className="footer">
                                            <div className="item">
                                                <div className="item-header">
                                                    {affiliates.entities.total_affiliate_orders}
                                                </div>
                                                <div className="item-body">
                                                    Total Affiliate Orders
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div className="item-header">
                                                    {affiliates.entities.total_l3_referrals}
                                                </div>
                                                <div className="item-body">
                                                    Total Affiliate
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div className="item-header">
                                                    ${affiliates.entities.earned_commissions}
                                                </div>
                                                <div className="item-body">
                                                    Earned Commission
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div className="item-header">
                                                    {affiliates.entities.achieved_bonus_level}
                                                </div>
                                                <div className="item-body">
                                                    Bonus Level
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div className="item-header">
                                                    {affiliates.entities.earned_bonus}
                                                </div>
                                                <div className="item-body">
                                                    Earned Bonus
                                                </div>
                                            </div>
                                        </div>
                                    )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Affliates
