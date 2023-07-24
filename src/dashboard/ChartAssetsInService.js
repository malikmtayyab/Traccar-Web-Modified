/*eslint-disable*/
import React from 'react';
import { Grid, CircularProgress, Card, CardContent, Typography, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { Circle } from 'rc-progress';
import '../assets/css/fleemoo.css';
import { ReactComponent as RoadIcon } from '../resources/images/icon/road-icon.svg';
import { useTranslation } from '../common/components/LocalizationProvider';

const useStyles = makeStyles((theme) => ({
    reportFooter: {
        textAlign: 'left',
        marginTop: '4px',
        padding: '8px 12px',
        background: '#F4F6F8',
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        [theme.breakpoints.up('lg')]: {
            padding: '10px 15px',
        },
    },
    reportData: {
        fontFamily: 'SF Pro Display',
        fontSize: 12,
        lineHeight: '100%',
        color: '#000000',
        whiteSpace: 'nowrap',
        [theme.breakpoints.up('lg')]: {
            fontSize: 14,
        },
    },
    circle: {
        position: 'relative',
        width: '105px',
        marginTop: 13,
        minWidth: '80px',
        [theme.breakpoints.up('md')]: {
            width: '80px',
        },
        [theme.breakpoints.up('lg')]: {
            width: '105px',
        },
    },
    positive: {
        color: theme.palette.colors.positive,
    },
    medium: {
        color: theme.palette.colors.medium,
    },
    negative: {
        color: theme.palette.colors.negative,
    },
    neutral: {
        color: theme.palette.colors.neutral,
    },
    percent: {
        position: 'absolute',
        top: '30%',
        left: '47%',
        transform: 'translate(-30%,-47%)',
        fontSize: '24px',
        [theme.breakpoints.up('md')]: {
            top: '13%',
            left: '47%',
            transform: 'translate(-30%,-47%)',
        },
        [theme.breakpoints.up('lg')]: {
            top: '30%',
            left: '47%',
            transform: 'translate(-40%,-55%)',
        },
    },
    cardAvatar: {
        backgroundColor: 'rgb(48,181,3)',
    },
    divalignedhorizontal: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    reportCard: {
        background: '#fff',
        boxShadow: '0 0 rgba(0,0,0,0)',
    },
    cardSmallText: {
        lineHeight: '90%',
        textJustify: '',
        width: '130px',
        height: '30px',
        wordBreak: 'break-all',
        [theme.breakpoints.up('lg')]: {
            wordBreak: 'normal',
        },
    },
}));

const DashboardWidget = ({ activeDevice, device, progress }) => {
    const classes = useStyles();

    const t = useTranslation();
    let valueDescText = `Devices online on: ${moment().toString()}`;


    return (
        <div className="card-small">
            {progress ? (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'grid',
                        placeItems: 'center',
                    }}
                >
                    <CircularProgress style={{ color: '#0352DA' }} />
                </div>
            ) : (
                <>
                    <div className={classes.circle}>
                        <Circle
                            percent={
                                activeDevice > 0
                                    ? (activeDevice / device) * 100
                                    : 0
                            }
                            trailWidth={9}
                            trailColor="#EDF4FB"
                            strokeWidth={9}
                            strokeLinecap="round"
                            strokeColor="#15E474"
                        />
                        <h3 className={classes.percent}>
                            {activeDevice > 0
                                ? Math.round((activeDevice / device) * 100)
                                : 0}
                            %
                        </h3>
                    </div>
                    <div className="card-small-rowRight">
                        <Typography className={classes.cardSmallText}>
                            <span className="card-small-text">
                                {t('sharedDevicesInService')}
                            </span>
                        </Typography>
                        <div className={classes.divalignedhorizontal}>
                            <div>
                                <Tooltip title={valueDescText}>
                                    <span className="card-small-value">{activeDevice}</span>
                                </Tooltip>
                            </div>
                            <div className="card-small-value">
                                <RoadIcon />
                            </div>
                        </div>
                        <div className={classes.reportFooter}>
                            <Typography className={classes.reportData} variant="caption">
                                {t('sharedAllDevices')}
                                {' '}
                            </Typography>
                            <Typography
                                className={classes.reportData}
                                style={{ color: '#15E474', fontWeight: 500, paddingLeft: 10 }}
                                variant="caption"
                            >
                                {device}
                            </Typography>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const ChartAssetsInService = ({ activeDevice, device, progress }) => {
    const classes = useStyles();
    return (
        <Card className={classes.reportCard}>
            <CardContent>
                <Grid container spacing={1} sx={{ justifyContent: 'space-between' }}>
                    <DashboardWidget activeDevice={activeDevice} device={device} progress={progress} />
                </Grid>
            </CardContent>
        </Card>
    );
};
/* eslint-enable */
export default ChartAssetsInService;
