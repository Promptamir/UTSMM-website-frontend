import Select from 'react-select'
import { Icon } from "@iconify/react";

import { Bar } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const dateSelectOptions = [
    { value: 'daily', label: 'daily' },
    { value: 'monthly', label: 'monthly' },
    { value: 'yearly', label: 'yearly' }
]



const chartModeOptions = [
    { value: false, label: 'Not Stacked' },
    { value: true, label: 'Stacked' },
]



const options = {
    plugins: {
        title: {
            display: false,
        },
        legend: {
            display: false
        }
    },
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    }
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

function randomRGBA() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = 0.2; // Alpha value set to 0.2
    return `rgba(${r},${g},${b},${a})`;
}

export default function OrderStatusChart() {
    return (
        <div className="order-status box">
            <div className="info">
                <div className="left">
                    <h2>order Status</h2>
                    <small>
                        Track Your Customers Orders Status
                    </small>
                </div>
                <div className="right">
                    <Select
                        options={dateSelectOptions}
                        placeholder={"Date"}
                        isSearchable={true}
                        defaultValue={dateSelectOptions[0]}
                    />
                    <Select
                        placeholder={"Chart Mode"}
                        options={chartModeOptions}
                        isSearchable={false}
                    />

                </div>
            </div>
            <div className="summary">
                <div className="item">
                    <div className="item-header">X</div>
                    <div className="item-body">
                        success
                        <Icon icon="bi:circle-fill" color="green" />
                    </div>
                </div>

                <div className="item">
                    <div className="item-header">X</div>
                    <div className="item-body">
                        Progress
                        <Icon icon="bi:circle-fill" color="orange" />
                    </div>
                </div>

                <div className="item">
                    <div className="item-header">X</div>
                    <div className="item-body">
                        Failed
                        <Icon icon="bi:circle-fill" color="red" />
                    </div>
                </div>
            </div>
            <div className="chart">
                <Bar
                    options={options}
                    data={{
                        labels,
                        datasets: [
                            {
                                label: 'Dataset 1',
                                data: 1,
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            },
                            {
                                label: 'Dataset 2',
                                data: 2,
                                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                            },
                        ],
                    }}
                />
            </div>
        </div>
    )
}
