/*eslint-disable*/
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTranslation } from '../common/components/LocalizationProvider';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

export function Chart(props) {

    const t = useTranslation()

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                // text: props.text,
            },
        },
    };

    let labels = [];
    let status1;

    const datasets = [
        {
            fill: true,
            label: status1,
            data: props.data1,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },

    ];

    const data = {
        labels,
        datasets,
    };

    return <Line options={options} data={data} />;
}
/* eslint-enable */
