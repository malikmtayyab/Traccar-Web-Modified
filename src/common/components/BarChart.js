/* eslint-disable */
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { makeStyles } from '@mui/styles';
import { Bar } from 'react-chartjs-2';
// import faker from 'faker';

const useStyles = makeStyles((theme) => ({
    chartconf: {
        width: '600px',
        height: '300px',
        [theme.breakpoints.down('lg')]: {
            width: '400px',
            height: '150px',
        },
    }
}));

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function BarChart(props) {
    const classes = useStyles();
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
                // position: 'bottom' ,
            },
            title: {
                display: true,
                text: props.title,
                color: '#000', // Set title text color to black
                font: {
                    size: 18,
                },
            },
        },
    };

    const labels = props.labels

    const data = {
        labels,
        datasets: [
            {
                data: props.data,
                backgroundColor: ['#fc031c', '#03fc13', '#fcad03'],
            },


        ],
    };

    return <Bar options={options} data={data} className={classes.chartconf} />;
}
/* eslint-enable */
export default BarChart;
