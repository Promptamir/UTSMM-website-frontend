import { Icon } from "@iconify/react";
import { useFetch } from "../../../../../lib/useFetch"
import QuickView from "./components/QuickView";
import BE_URL from "../../../../../lib/envAccess";
import LineChart from "../../../../primaries/lineChart";

export default function Dashboard() {
    // Getting data from database
    const [data, error, loading, setUrl, refreshData, refetch] = useFetch(`${BE_URL}/admin-index`);

    // Returning JSX
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
                    ? (
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '30px 0'}}>
                            <Icon icon={'eos-icons:loading'} width={40} href={40} />
                        </div>
                    ) : (error)
                        ? <h1>Error</h1>
                        : <QuickView
                            orders={data.entities.count_of_daily_not_canceled_orders_in_last_week[0].total_count}
                            countOfOrders={data.entities.count_of_daily_not_canceled_orders_in_last_week[0].total_count}
                            income={data.entities.sum_of_daily_success_payments_in_last_week[0].total_sum}
                            customers={data.entities.count_of_daily_success_payments_in_last_week[0].total_count}
                        />
            }
            {
                (loading)
                    ? (
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '30px 0'}}>
                            <Icon icon={'eos-icons:loading'} width={40} href={40} />
                        </div>
                    ) : (error)
                        ? <h1>Error</h1>
                        : (
                            <div className={'gtc-3'}>
                                <div style={{marginBottom: '30px'}}>
                                    <h1 style={{margin: '30px 0'}}>Daily Success Payments</h1>
                                    <LineChart data={{
                                        labels: data.entities.count_of_daily_success_payments_in_last_week.map(item => item.date),
                                        datasets: [
                                            {
                                                label: 'My First Dataset',
                                                data: data.entities.count_of_daily_success_payments_in_last_week.map(item => Number(item.total_count)),
                                                fill: true,
                                                borderColor: 'rgb(73, 118, 243)',
                                                tension: 0.1,
                                            },
                                        ],
                                    }} />
                                </div>
                                <div style={{marginBottom: '30px'}}>
                                    <h1 style={{margin: '30px 0'}}>Daily Not canceled Orders</h1>
                                    <LineChart data={{
                                        labels: data.entities.count_of_daily_not_canceled_orders_in_last_week.map(item => item.date),
                                        datasets: [
                                            {
                                                label: 'My First Dataset',
                                                data: data.entities.count_of_daily_not_canceled_orders_in_last_week.map(item => Number(item.total_count)),
                                                fill: true,
                                                borderColor: 'rgb(73, 118, 243)',
                                                tension: 0.1,
                                            },
                                        ],
                                    }} />
                                </div>
                                <div style={{marginBottom: '30px'}}>
                                    <h1 style={{margin: '30px 0'}}>New users</h1>
                                    <LineChart data={{
                                        labels: data.entities.count_of_daily_new_and_verified_users_in_last_week.map(item => item.date),
                                        datasets: [
                                            {
                                                label: 'My First Dataset',
                                                data: data.entities.count_of_daily_new_and_verified_users_in_last_week.map(item => Number(item.total_count)),
                                                fill: true,
                                                borderColor: 'rgb(73, 118, 243)',
                                                tension: 0.1,
                                            },
                                        ],
                                    }} />
                                </div>
                                <div style={{marginBottom: '30px'}}>
                                    <h1 style={{margin: '30px 0'}}>Sum of Daily Success of Payments</h1>
                                    <LineChart data={{
                                        labels: data.entities.sum_of_daily_success_payments_in_last_week.map(item => item.date),
                                        datasets: [
                                            {
                                                label: 'My First Dataset',
                                                data: data.entities.sum_of_daily_success_payments_in_last_week.map(item => Number(item.total_count)),
                                                fill: true,
                                                borderColor: 'rgb(73, 118, 243)',
                                                tension: 0.1,
                                            },
                                        ],
                                    }} />
                                </div>
                            </div>
                        )
            }
        </div>
    )
}
