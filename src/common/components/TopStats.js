/* eslint-disable */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ColoredItem = styled(Item)({
    backgroundColor: '#dedfe0', // Add your desired background color here
});

function TopStats(props) {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={1}>
                <Grid item xs={6} sm={3} md={3}>
                    <ColoredItem>Total Idle Time</ColoredItem>
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                    <Item>{props.idleTime} secs</Item>
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                    <ColoredItem>Total Idle Fuel</ColoredItem>
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                    <Item>{props.idleFuel} gal</Item>
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                    <ColoredItem>Total Driving Time</ColoredItem>
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                    <Item>{props.drivingTime} secs</Item>
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                    <ColoredItem>Total Driving Fuel</ColoredItem>
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                    <Item>{props.drivingFuel} gal</Item>
                </Grid>
                <Grid item xs={6} sm={3} md={3}>
                    <ColoredItem>Total Driving Mile</ColoredItem>
                </Grid>
                <Grid item xs={6} sm={9} md={9}>
                    <Item>{props.drivingMile} mi</Item>
                </Grid>
            </Grid>
        </Box>
    );
}
/* eslint-enable */
export default TopStats;
