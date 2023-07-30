/* eslint-disable */
import React from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useTranslation } from "./LocalizationProvider";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ListHeader = (props) => {
    const t = useTranslation()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={9}>
                <Grid item xs={1}>
                    <Item>{props.vehicle}</Item>
                </Grid>
                <Grid item xs={1}>
                    <Item>{props.utilization}</Item>
                </Grid>
                <Grid item xs={1}>
                    <Item>{props.idleTime}</Item>
                </Grid>
                <Grid item xs={1}>
                    <Item>{props.ptoTime}</Item>
                </Grid>
                <Grid item xs={1}>
                    <Item>{props.idleFuel}</Item>
                </Grid>
                <Grid item xs={1}>
                    <Item>{props.drivingTime}</Item>
                </Grid>
                <Grid item xs={1}>
                    <Item>{props.drivingFuel}</Item>
                </Grid>
                <Grid item xs={1}>
                    <Item>{props.distance}</Item>
                </Grid>
                <Grid item xs={1}>
                    <Item>{props.fuelEfficiency}</Item>
                </Grid>
            </Grid>
        </Box>
    )
}
/* eslint-enable */
export default ListHeader;
