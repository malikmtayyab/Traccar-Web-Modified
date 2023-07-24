/*eslint-disable*/
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTranslation } from '../common/components/LocalizationProvider';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

export function Chart(props) {

    // alert(props.data1)

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
            tooltip: {
                callbacks: {
                    label: function (context) {
                        var label = context.dataset.label || '';
                        var value = context.parsed.y || '';
                        return label + ': ' + value + ` ${props.unit}`; // Add your desired unit here
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                axis: 'y',
                ticks: {
                    callback: function (value) {
                        return value + ` ${props.unit}`; // Add your desired unit here
                    }
                }
            }
        }
    };

    let labels = [];
    let status1;
    let status2;
    if (props.duration === 'Day') {
        status1 = t('sharedCurrentDay');
        status2 = t('sharedPreviousDay');
        labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
    }
    else if (props.duration === 'Week') {
        status1 = t('sharedCurrentWeek');
        status2 = t('sharedPreviousWeek');
        labels = [t('calendarMonday'), t('calendarTuesday'), t('calendarWednesday'), t('calendarThursday'), t('calendarFriday'), t('calendarSaturday'), t('calendarSunday')];
    }
    else if (props.duration === 'Month') {
        status1 = t('sharedCurrentMonth');
        status2 = t('sharedPreviousMonth');
        labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    }

    const datasets = [
        {
            fill: true,
            label: status1,
            data: props.data1,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
            fill: true,
            label: status2,
            data: props.data2,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },

    ];

    const data = {
        labels,
        datasets,
    };

    return <Line options={options} data={data} />;
}
/* eslint-enable */
