import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const LineChart = ({ data }) => {
    const chartRef = useRef(null);

    const createGradient = (ctx, area) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, area.bottom);
        gradient.addColorStop(0, 'rgba(73, 118, 243, 1)');
        gradient.addColorStop(1, 'rgba(73, 118, 243, 0)');
        return gradient;
    };

    const modifiedData = {
        ...data,
        datasets: data.datasets.map(dataset => ({
            ...dataset,
            backgroundColor: context => {
                const chart = context.chart;
                const { ctx, chartArea } = chart;

                if (!chartArea) {
                    return null;
                }
                return createGradient(ctx, chartArea);
            },
        })),
    };

    return <Line ref={chartRef} data={modifiedData} options={{
        responsive: true,
        plugins: {
            legend: {display: false,},
            title: {display: false,},
        },
    }} />;
};

export default LineChart;
