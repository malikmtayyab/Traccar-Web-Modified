/* eslint-disable */
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement, // Import PointElement for scatter plot
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement, // Register PointElement for scatter plot
    Title,
    Tooltip,
    Legend
);

export const options = {
    plugins: {
        title: {
            display: true,
            // text: 'Chart.js Bar Chart - Stacked',
        },
    },
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: -1, max: 1 })),
            backgroundColor: 'rgb(255, 99, 132,0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: -1, max: 1 })),
            backgroundColor: 'rgb(75, 192, 192,0.5)',
        },
        {
            label: 'Dataset 3',
            data: labels.map(() => faker.datatype.number({ min: -1, max: 1 })),
            backgroundColor: 'rgb(53, 162, 235,0.5)',
        },
        {
            type: 'line', // Add the type 'line' for the line chart
            label: 'Line Dataset',
            data: labels.map(() => faker.datatype.number({ min: -1, max: 1 })),
            borderColor: 'rgb(255, 205, 86)',
            fill: false, // Set fill to false to remove fill under the line
        },
        {
            type: 'scatter', // Add the type 'scatter' for the scatter plot
            label: 'Scatter Dataset',
            data: labels.map(() => faker.datatype.number({ min: -1, max: 1 })),
            pointBorderColor: 'rgb(0, 0, 0)',
            pointBackgroundColor: 'rgb(0, 0, 0)',
        },
    ],
};

function TrendLineChart() {
    return <Bar options={options} data={data} />;
}
/* eslint-enable */
export default TrendLineChart;
