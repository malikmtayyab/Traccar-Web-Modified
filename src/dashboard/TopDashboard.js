/* eslint-disable */
import React from "react";
import Grid from '@mui/material/Grid';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useDispatch } from 'react-redux';
import { positionActions } from "../store";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const TopDashboard = (props) => {

    const localVahicles = localStorage.getItem("vehicle")
    const localGeofence = localStorage.getItem("geofence")
    const localDrivers = localStorage.getItem("driver")
    const localIdle = localStorage.getItem("idle")
    const localStop = localStorage.getItem("stop")
    const localMoving = localStorage.getItem("moving")

    const dispatch = useDispatch();
    const vehicles = Object.values(props.vehicle)?.length || 0;
    const geofence = Object.values(props.geofence)?.length || 0;
    const drivers = Object.values(props.drivers)?.length || 0;

    const countIgnitionTrueMotionFalse = Object.values(props.positions)?.filter(item => item.attributes.ignition === true && item.attributes.motion === false).length || 0;
    const countIgnitionFalseMotionFalse = Object.values(props.positions)?.filter(item => item.attributes.ignition === false && item.attributes.motion === false).length | 0;
    const countIgnitionTrueMotionTrue = Object.values(props.positions)?.filter(item => item.attributes.motion === true).length || 0;
    dispatch(positionActions.update_countIgnitionTrueMotionFalse(countIgnitionTrueMotionFalse))
    dispatch(positionActions.update_countIgnitionFalseMotionFalse(countIgnitionFalseMotionFalse))
    dispatch(positionActions.update_countIgnitionTrueMotionTrue(countIgnitionTrueMotionTrue))

    return (
        <Grid container spacing={2}>

            <Grid xs={6} sm={6} md={4} lg={2}>
                <div style={{ backgroundColor: '#ffffff', paddingLeft: '30px', paddingRight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                    <div >
                        <h4>Vehicles</h4>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h2>{vehicles}</h2>
                            {vehicles >= localVahicles ? <ArrowUpwardIcon style={{ color: 'green' }} /> : <ArrowDownwardIcon style={{ color: 'red' }} />}
                            {localStorage.setItem("vehicle", vehicles)}
                        </div>
                        <h4>Totals</h4>
                    </div>
                    <img src="/images/nodata.png" style={{ height: '80px', width: '100px' }} />
                </div>
            </Grid>
            <Grid xs={6} sm={6} md={4} lg={2}>
                <div style={{ backgroundColor: '#ffffff', paddingLeft: '30px', paddingRight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                    <div >
                        <h4>Stop</h4>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h2>{countIgnitionFalseMotionFalse}</h2>
                            {countIgnitionFalseMotionFalse >= localStop ? <ArrowUpwardIcon style={{ color: 'green' }} /> : <ArrowDownwardIcon style={{ color: 'red' }} />}
                            {localStorage.setItem("geofence", geofence)}
                        </div>
                        <h4>Totals</h4>
                    </div>
                    <img src="/images/stop.png" style={{ height: '80px', width: '100px' }} />
                </div>
            </Grid>
            <Grid xs={6} sm={6} md={4} lg={2}>
                <div style={{ backgroundColor: '#ffffff', paddingLeft: '30px', paddingRight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                    <div >
                        <h4>Moving</h4>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h2>{countIgnitionTrueMotionTrue}</h2>
                            {countIgnitionTrueMotionTrue >= localMoving ? <ArrowUpwardIcon style={{ color: 'green' }} /> : <ArrowDownwardIcon style={{ color: 'red' }} />}
                            {localStorage.setItem("driver", drivers)}
                        </div>
                        <h4>Totals</h4>
                    </div>
                    <img src="/images/running.png" style={{ height: '80px', width: '100px' }} />
                </div>
            </Grid>
            <Grid xs={6} sm={6} md={4} lg={2}>
                <div style={{ backgroundColor: '#ffffff', paddingLeft: '30px', paddingRight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                    <div >
                        <h4>Idle</h4>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h2>{countIgnitionTrueMotionFalse}</h2>
                            {countIgnitionTrueMotionFalse >= localIdle ? <ArrowUpwardIcon style={{ color: 'green' }} /> : <ArrowDownwardIcon style={{ color: 'red' }} />}
                            {localStorage.setItem("idle", countIgnitionTrueMotionFalse)}
                        </div>
                        <h4>Totals</h4>
                    </div>
                    <img src="/images/idle.png" style={{ height: '80px', width: '100px' }} />
                </div>
            </Grid>
            <Grid xs={6} sm={6} md={4} lg={2} >
                <div style={{ backgroundColor: '#ffffff', paddingLeft: '30px', paddingRight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                    <div >
                        <h4>Geofences</h4>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h2>{geofence}</h2>
                            {geofence >= localGeofence ? <ArrowUpwardIcon style={{ color: 'green' }} /> : <ArrowDownwardIcon style={{ color: 'red' }} />}
                            {localStorage.setItem("stop", countIgnitionFalseMotionFalse)}
                        </div>
                        <h4>Totals</h4>
                    </div>
                    <h4><AvTimerIcon style={{ height: '100px', width: '100px', opacity: 0.3 }} /></h4>
                </div>
            </Grid>
            <Grid xs={6} sm={6} md={4} lg={2}>
                <div style={{ backgroundColor: '#ffffff', paddingLeft: '30px', paddingRight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                    <div >
                        <h4>Drivers</h4>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h2>{drivers}</h2>
                            {drivers >= localDrivers ? <ArrowUpwardIcon style={{ color: 'green' }} /> : <ArrowDownwardIcon style={{ color: 'red' }} />}
                            {localStorage.setItem("moving", countIgnitionTrueMotionTrue)}
                        </div>
                        <h4>Totals</h4>
                    </div>
                    <h4><PersonOutlineIcon style={{ height: '100px', width: '100px', opacity: 0.3 }} /></h4>
                </div>
            </Grid>
        </Grid>
    )
}
/* eslint-enable */
export default TopDashboard;
