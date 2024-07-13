




import { FAKE_CATEGORY, FAKE_SERVICES } from "../../../../fakeData/FAKE_DATA"


// SvG
import rocket from "../../../../../images/auth-page/rocket.svg"
import statisticsSvg from "../../../../../images/panel/dashboad/statistics/back.svg"



// Componensts
import UserInfo from "../panel-header/UserInfo"
import ActiveSocial from "./components/active-social/ActiveSocial"


// Utill Classes
import FakeChartData from "../../../tools/FakeDataGenarator";




// React Propgresser Bar
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';





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
import { ReactChart, Line, Pie, Bar } from "react-chartjs-2";
import QuickView from './components/quick-view/QuickkView';
import RecentEvents from './components/recent-evernts/RecentEvernts';
import UserQuickView from "../../Components/UserQuickView";
import MaxLineText from "../../../../cutsome-components/Text/MaxLineText"
import { Icon } from "@iconify/react"
import UserSection from "./components/user/UserSection"
import SavedServices from "./components/saved-services/SavedServices"
import {useFetch, usePost} from "../../../../../lib/useFetch";
import BE_URL, {API} from "../../../../../lib/envAccess";


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






const Statics = () => {
    const [data, error, loading] = useFetch(`${BE_URL}/user-index`);
    const [savedServicesData, savedServicesError, savedServicesLoading, setUrl, refreshData] = useFetch(`${BE_URL}/user/favorite-services`);

    return (
        <section className="statics">

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




            {
                (savedServicesLoading)
                    ? (
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: "center", width: '100%', padding: '20px'}}>
                            <Icon icon={'eos-icons:loading'} width={40} href={40} />
                        </div>
                    ) : (savedServicesError)
                        ? <h1>There was an error while fetching the data</h1>
                        : <SavedServices refresh={refreshData} data={savedServicesData.entities.services} />
            }



            <RecentEvents />



            <div className="rocket background">
                <img src={rocket} />
            </div>


        </section>
    )
}

export default Statics
