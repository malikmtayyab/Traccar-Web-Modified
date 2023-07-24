/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/*eslint-disable*/
import React, { useState } from 'react';
import { Container, Box, Grid, Typography, LinearProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import BottomMenu from '../common/components/BottomMenu';
import ChartFleetOverview from './ChartFleetOverview';
import ChartAlarm from './ChartAlarm';
import ChartOverspeed from './ChartOverspeed';
import ChartGeofenceViolation from './ChartGeofenceViolation';
import ChartAssetsInService from './ChartAssetsInService';
import ChartEventsTable from './ChartEventsTable';
import ChartMultiTraffic from './ChartMultiTraffic';
import { useEffect } from 'react';
import { useTranslation } from '../common/components/LocalizationProvider';

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
}));


const DashboardPage = () => {

    const t = useTranslation()
    const classes = useStyles();

    const [reportData, setReportData] = useState({});
    const [progress, setProgress] = useState(true);

    const getReportData = async (from, to,) => {

        const query = new URLSearchParams({ from, to });

        const response = await fetch(`/api/dashboards/firstSection?${query.toString()}`);
        if (response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType) {
                if (contentType === 'application/json') {
                    let data = await response.json();
                    setReportData({ ...data })
                } else {
                    // window.location.assign(window.URL.createObjectURL(await response.blob()));
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
                                    <Grid item xs={12} sm={6} md={3}>
                                        <ChartAssetsInService
                                            progress={progress}
                                            device={reportData.allDevices}
                                            activeDevice={reportData.devicesInService} />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <ChartOverspeed
                                            progress={progress}
                                            overspeed={reportData.overspeed}
                                            deviceWithOverpeedViolation={reportData.devicesWithOverspeed}
                                            device={reportData.allDevices} />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <ChartGeofenceViolation
                                            progress={progress}
                                            deviceWithGeofencingViolation={reportData.devicesWithGeofenceExit}
                                            geofencingViolation={reportData.geofenceExit}
                                            device={reportData.allDevices} />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <ChartAlarm
                                            progress={progress}
                                            deviceWithAlarm={reportData.devicesWithAlarm}
                                            device={reportData.allDevices}
                                            alarm={reportData.alarm}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={7}
                                    >
                                        <ChartEventsTable events={reportData.dashboardEvent} />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={5}
                                    >
                                        <ChartFleetOverview fleet={reportData.fleetOverview} />
                                    </Grid>
                                </Grid>
                            </Container>
                            <Typography variant="button" display="block" gutterBottom style={{ marginTop: '10px', marginLeft: '23px' }}>{t('overviewDay')}</Typography>
                            <ChartMultiTraffic
                                style={{ marginTop: '10px' }}
                                chartfor={'day'}
                                text={'Day'}
                            />
                            <Typography variant="button" display="block" gutterBottom style={{ marginTop: '10px', marginLeft: '23px' }}>{t('overviewWeek')}</Typography>
                            <ChartMultiTraffic
                                style={{ marginTop: '10px' }}
                                chartfor={'week'}
                                text={'Week'}
                            />
                            <Typography variant="button" display="block" gutterBottom style={{ marginTop: '10px', marginLeft: '23px' }}>{t('overviewMonth')}</Typography>
                            <ChartMultiTraffic
                                style={{ marginTop: '10px' }}
                                chartfor={'month'}
                                text={'Month'}
                            />
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
