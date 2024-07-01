import { Icon } from "@iconify/react";
import OrderStatusChart from "./components/OrderStatusChart";
import ReviewByCountry from "./components/ReviewByCountry";
import RecentCustomers from "./components/RecentCustomers";
import PopularCharts from "./components/PopularCharts";
import TodoList from "./components/TodoList";
import EconomySummary from "./components/EconomySummary";
import MessageAll from "./components/MessageAll";
import { useFetch } from "../../../../../lib/useFetch"
import { API } from "../../../../../lib/envAccess";
import QuickView from "./components/QuickView";

import BE_URL from "../../../../../lib/envAccess";

export default function Dashboard() {
    // Getting data from database
    const [data, error, loading, setUrl, refreshData, refetch] = useFetch(`${BE_URL}/admin-index`);

    return (
        <div className="admin-dashboard-panel">
            <div className="intro">
                <div className="left">
                    <h1>Hi, welcome back!</h1>
                    <small>
                        Sales Monitoring dashboard template
                    </small>
                </div>
                <div className="right">
                    {
                        (loading)
                            ? <Icon icon={'eos-icons:loading'} width={40} href={40} />
                            : (error)
                                ? <h1>Error</h1>
                                : (
                                    <>
                                        <div className="new-orders notif">
                                            <span>{data.entities.count_of_daily_not_canceled_orders_in_last_week[0].total_count}</span>
                                            <small>Orders</small>
                                        </div>
                                        <div className="new-messages notif">
                                            <span>{data.entities.count_of_daily_new_and_verified_users_in_last_week[0].total_count}</span>
                                            <small>Users</small>
                                        </div>
                                    </>
                                )
                    }
                    <div className="date">
                        <Icon icon="clarity:date-solid"/>
                        <span>
                            {(new Date()).toDateString()}
                        </span>
                    </div>
                </div>
            </div>
            {
                (loading)
                    ? <Icon icon={'eos-icons:loading'} width={40} href={40} />
                    : (error)
                        ? <h1>Error</h1>
                        : <QuickView
                            orders={data.entities.count_of_daily_not_canceled_orders_in_last_week[0].total_count}
                            countOfOrders={data.entities.count_of_daily_not_canceled_orders_in_last_week[0].total_count}
                            income={data.entities.sum_of_daily_success_payments_in_last_week[0].total_sum}
                            customers={data.entities.count_of_daily_success_payments_in_last_week[0].total_count}
                        />
            }
        </div>
    )
}
