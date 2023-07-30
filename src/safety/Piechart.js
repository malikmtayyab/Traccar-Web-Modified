/* eslint-disable */
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const data = [
    { label: 'Coached', value: 2, color: '#1976d2' },
    { label: 'Uncoached', value: 8, color: '#f50057' },
];

function Piechart() {
    const theme = useTheme();
    const total = data.reduce((sum, item) => sum + item.value, 0);

    const firstRow = data.slice(0, 1);
    const secondRow = data.slice(1);

    return (
        <Box>
            <Box display="flex" justifyContent="center">
                <PieChart
                    series={[
                        {
                            data: data,
                            innerRadius: 60,
                            outerRadius: 80,
                        },
                    ]}
                    height={300}
                    legend={{ hidden: true }}
                />
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                {firstRow.map((item, index) => (
                    <Box key={index} display="flex" alignItems="center" mr={2}>
                        <Box
                            width={20}
                            height={20}
                            borderRadius="50%"
                            bgcolor={item.color}
                            mr={1}
                        />
                        <Typography variant="body2">
                            {item.label} - {((item.value / total) * 100).toFixed(2)}% ({item.value})
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                {secondRow.map((item, index) => (
                    <Box key={index} display="flex" alignItems="center" mr={2}>
                        <Box
                            width={20}
                            height={20}
                            borderRadius="50%"
                            bgcolor={item.color}
                            mr={1}
                        />
                        <Typography variant="body2">
                            {item.label} - {((item.value / total) * 100).toFixed(2)}% ({item.value})
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
/* eslint-disable */
export default Piechart;
