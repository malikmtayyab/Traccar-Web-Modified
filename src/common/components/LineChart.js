/* eslint-disable */
import React from 'react';
import { useTranslation } from './LocalizationProvider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: '1 km/l', value: 2 },
    { name: '2 km/l', value: 5.5 },
    { name: '3 km/l', value: 2 },
    { name: '5 km/l', value: 8.5 },
    { name: '8 km/l', value: 1.5 },
    { name: '10 km/l', value: 5 },
];

const BasicLineChart = (props) => {
    const t=useTranslation()
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <text x="50%" y="20" textAnchor="middle" fill="#333">
                    {t("averageChartTitle")}
                </text>
                <Legend align="left" verticalAlign="top" height={36} wrapperStyle={{ paddingLeft: 30 }} payload={[{ value: `${t(`${props.legend}`)}`, type: 'rect', color: '#8884d8' }]} />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};
/* eslint-disable */
export default BasicLineChart;
