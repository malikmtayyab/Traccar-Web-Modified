/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/*eslint-disable*/
import React, { useState } from 'react';
import { Container, Box, Grid, LinearProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import BottomMenu from '../common/components/BottomMenu';
import ChartFleetOverview from './ChartFleetOverview';
import ChartAlarm from './ChartAlarm';
import { useEffect } from 'react';
import { useTranslation } from '../common/components/LocalizationProvider';
import TopDashboard from './TopDashboard';
import BarChart from '../common/components/BarChart';
import { useSelector } from 'react-redux';
import EventsTable from './EventsTable'

const useStyles = makeStyles((theme) => ({
    root: {
        maxHeight: '100vh',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    controlPanel: {
        position: 'absolute',
        bottom: theme.spacing(5),
        left: '50%',
        transform: 'translateX(-50%)',
    },
    controlContent: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    configForm: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    graybar: {
        backgroundColor: theme.palette.common.gray,
        color: '#ffffff',
    },
    contrastColor: {
        color: '#ffffff',
    },
    title: {
        fontFamily: 'SF Pro Display',
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: '100%',
        letterSpacing: '0.75px',
        color: '#000000',
        [theme.breakpoints.up('md')]: {
            fontSize: 32,
        },
    },
    mainToolbar: {
        position: 'fixed',
        zIndex: 100,
        height: 50,
        left: 0,
        right: 0,
        bottom: 0,
        width: '(100%-0px)',
        borderRadius: 5,
        [theme.breakpoints.up('sm')]: {
            bottom: 25,
            right: '25px',
            left: '25px',
            width: '(100%-50px) !important',
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    },
    chartdiv: {
        margin: '20px',
        [theme.breakpoints.up('lg')]: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px',
        },
    },
}));



const DashboardPage = () => {

    const t = useTranslation()
    const classes = useStyles();

    const [reportData, setReportData] = useState({});
    const [geofenceData, setGeofenceData] = useState({});
    const [usersData, setUsersData] = useState({});
    const [driversData, setDriverssData] = useState({});
    const [positionsData, setPositionData] = useState({});
    const [progress, setProgress] = useState(true);

    const getReportData = async (from, to,) => {

        const query = new URLSearchParams({ from, to });

        const response = await fetch(`/api/devices?${query.toString()}`);
        const geofenceresponse = await fetch(`/api/geofences`);
        const usersresponse = await fetch(`/api/users`);
        const driversresponse = await fetch(`/api/drivers`);
        const positionsresponse = await fetch(`/api/positions`);
        if (response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType) {
                if (contentType === 'application/json') {
                    let data = await response.json();
                    setReportData({ ...data })
                } else {
                    console.log(`content type not handled: ${contentType}`);
                }
            }
        }
        if (geofenceresponse.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType) {
                if (contentType === 'application/json') {
                    let data = await geofenceresponse.json();
                    setGeofenceData({ ...data })
                } else {
                    console.log(`content type not handled: ${contentType}`);
                }
            }
        }
        if (usersresponse.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType) {
                if (contentType === 'application/json') {
                    let data = await usersresponse.json();
                    setUsersData({ ...data })
                } else {
                    console.log(`content type not handled: ${contentType}`);
                }
            }
        }
        if (driversresponse.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType) {
                if (contentType === 'application/json') {
                    let data = await driversresponse.json();
                    setDriverssData({ ...data })
                } else {
                    console.log(`content type not handled: ${contentType}`);
                }
            }
        }
        if (positionsresponse.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType) {
                if (contentType === 'application/json') {
                    let data = await positionsresponse.json();
                    setPositionData({ ...data })
                } else {
                    console.log(`content type not handled: ${contentType}`);
                }
            }
        }
        setProgress(false);
    };


    let dateFrom = moment().subtract(24, 'days').startOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]');
    let dateTo = moment().format('YYYY-MM-DDTHH:mm:ss[Z]');

    useEffect(() => {
        getReportData(dateFrom, dateTo);
    }, [])

    var position = []
    position.push()
    const countIgnitionTrueMotionFalse = useSelector((state) => state.positions.countIgnitionTrueMotionFalse)
    const countIgnitionFalseMotionFalse = useSelector((state) => state.positions.countIgnitionFalseMotionFalse)
    const countIgnitionTrueMotionTrue = useSelector((state) => state.positions.countIgnitionTrueMotionTrue)
    position.push(countIgnitionFalseMotionFalse)
    position.push(countIgnitionTrueMotionTrue)
    position.push(countIgnitionTrueMotionFalse)

    //Engine Hours
    var vehicleid = []
    var vehiclename = []
    for (const key in reportData) {
        if (reportData.hasOwnProperty(key)) {
            const obj = reportData[key];
            if (obj.id !== undefined && obj.name !== undefined) {
                vehiclename.push(obj.name);
                vehicleid.push(obj.id);
            }
        }
    }

    var deviceid = []
    var hours = []
    for (const key in positionsData) {
        if (positionsData.hasOwnProperty(key)) {
            const obj = positionsData[key];
            if (obj.attributes.hours !== undefined) {
                hours.push(obj.attributes.hours);
                deviceid.push(obj.deviceId);
            }
        }
    }

    var labels = []
    var data = []
    for (let index = 0; index < vehicleid.length; index++) {
        const arrayindex = deviceid.indexOf(vehicleid[index]);
        if (index !== -1) {
            labels.push(vehiclename[index])
            data.push(hours[arrayindex])
        }

    }
    for (let index = 0; index < data.length; index++) {
        const value = data[index] / (1000 * 60 * 60)
        data[index] = value.toFixed(0)
    }

    //Odometer

    var odometervehicleid = []
    var odometervehiclename = []
    for (const key in reportData) {
        if (reportData.hasOwnProperty(key)) {
            const obj = reportData[key];
            if (obj.id !== undefined && obj.name !== undefined) {
                odometervehiclename.push(obj.name);
                odometervehicleid.push(obj.id);
            }
        }
    }

    var odometerdeviceid = []
    var totalDistance = []
    for (const key in positionsData) {
        if (positionsData.hasOwnProperty(key)) {
            const obj = positionsData[key];
            if (obj.attributes.totalDistance !== undefined) {
                totalDistance.push(obj.attributes.totalDistance);
                odometerdeviceid.push(obj.deviceId);
            }
        }
    }

    var odometerlabels = []
    var odomterdata = []
    for (let index = 0; index < odometervehicleid.length; index++) {
        const arrayindex = odometerdeviceid.indexOf(odometervehicleid[index]);
        if (index !== -1) {
            odometerlabels.push(odometervehiclename[index])
            odomterdata.push(totalDistance[arrayindex])
        }

    }
    for (let index = 0; index < odomterdata.length; index++) {
        const value = odomterdata[index] / 1000
        odomterdata[index] = value.toFixed(0)
    }

    //Events
    var name = []
    var lastUpdate = []
    var speed = []

    for (const key in reportData) {
        if (reportData.hasOwnProperty(key)) {
            const obj = reportData[key];
            if (obj.name !== undefined) {
                name.push(obj.name);
            }
        }
    }
    for (const key in reportData) {
        if (reportData.hasOwnProperty(key)) {
            const obj = reportData[key];
            if (obj.lastUpdate !== undefined) {
                lastUpdate.push(obj.lastUpdate);
            }
        }
    }

    for (const key in positionsData) {
        if (positionsData.hasOwnProperty(key)) {
            const obj = positionsData[key];
            if (obj.speed !== undefined) {
                speed.push(obj.speed);
            }
        }
    }

    var finalArray = []
    for (let index = 0; index < vehicleid.length; index++) {
        finalArray.push({
            deviceName: name[index],
            lastUpdate: lastUpdate[index],
            speed: speed[index],
            engineHours: data[index],
            workHours: odomterdata[index]
        })
    }


    return (
        <div className={classes.root}>
            {progress ? <LinearProgress /> :
                <>
                    <div className={classes.content}>
                        <Box
                            sx={{
                                backgroundColor: '#F2F7FF',
                                maxHeight: '100%',
                                py: 3,
                            }}
                        >
                            <Container maxWidth={false}>
                                <Grid container spacing={2}>
                                    <TopDashboard vehicle={reportData} geofence={geofenceData} users={usersData} drivers={driversData} positions={positionsData} />
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={7}
                                    >
                                        <EventsTable events={finalArray} />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={5}
                                    >
                                        <ChartFleetOverview fleet={reportData} />
                                    </Grid>
                                </Grid>
                            </Container>
                            <div className={classes.chartdiv}>
                                <div >
                                    <BarChart title={"Vehicle Status"} labels={["Stop", "Moving", "Idle"]} data={position} color={""} />

                                </div>
                                <div >
                                    <BarChart title={"Engine Hours"} labels={labels} data={data} />

                                </div>
                                <div >
                                    <BarChart title={"Odometer"} labels={odometerlabels} data={odomterdata} />

                                </div>
                            </div>
                        </Box>
                    </div>
                    <div className={classes.mainToolbar}>
                        <BottomMenu />
                    </div>
                </>}
        </div>
    );
};
/* eslint-enable */
export default DashboardPage;
