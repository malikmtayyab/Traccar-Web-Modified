/*eslint-disable*/
import React, { useState } from "react";
import SafetyNavigation from "../SafetyNavigation";
import { makeStyles } from '@mui/styles';
import DriverSelector from "./DriverSelector";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PerfChart from './PerfChart'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TrendLineChart from "./TrendLineChart";

const impactHeader = ["Driver", "Drive Score", "12 WK Impact", "1 WK Impact"]

const entries = [
    { name: 'Cameron Williamson', score: '79', twelveweek: '2.01', oneweek: '1.14' },
    { name: 'Cameron Williamson', score: '58', twelveweek: '0.01', oneweek: '1.09' },
    { name: 'Cameron Williamson', score: '87', twelveweek: '1.10', oneweek: '1.07' },
    { name: 'Cameron Williamson', score: '48', twelveweek: '0.05', oneweek: '0.76' },
];

const driverBehavior = [
    {
        title: 'Braking', color: '#d2715e', value: '2.41'
    },
    {
        title: 'Acceleration', color: '#dfc160', value: '0.00'
    },
    {
        title: 'Cornering', color: '#a182ce', value: '0.56'
    },
    {
        title: 'Speeding', color: '#535e6a', value: '0.75'
    },
    {
        title: 'HOS Violations', color: '#a3cbd4', value: '0.51'
    },
]

const useStyles = makeStyles((theme) => ({
    main: {
        padding: 10,
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            justifyContent: 'space-between',
        },
    },
    verticalline: {
        border: 'none',
        borderLeft: '2px solid black',
        height: '100',
        opacity: 0.1
    },
    horizontalline: {
        border: 'none',
        borderBottom: '2px solid black',
        height: '100',
        opacity: 0.1
    },
    fleetperf: {
        padding: 10,
        marginTop: 10,
        border: '2px solid rgba(0, 0, 0, 0.2)',
    },
    mainperfdiv: {
        [theme.breakpoints.up('lg')]: {
            display: 'flex'
        },
    },
    perfcoach: {
        width: '30%',
        padding: 10,
        [theme.breakpoints.down('lg')]: {
            width: '100%'
        },
    },
    impactanalysis: {
        width: '70%',
        padding: 10,
        [theme.breakpoints.down('lg')]: {
            width: '100%'
        },
    },
    rectangle: {
        width: '40px',
        height: '40px',
        borderRadius: '10%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    number: {
        fontSize: '20px',
        color: '#21130d'
    },
    direction: {
        display: 'flex',
        alignItems: 'center'
    },
    redclass: {
        color: 'red'
    },
    greenclass: {
        color: 'green'
    },
    drivertrend: {
        border: '2px solid rgba(0, 0, 0, 0.2)',
        [theme.breakpoints.up('lg')]: {
            display: 'flex',
        },
    },
    trendchart: {
        padding: 10,
        width: '80%',
        [theme.breakpoints.down('lg')]: {
            width: '100%',
        },
    },
    driverstats: {
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40,
        width: '20%',
        [theme.breakpoints.down('lg')]: {
            width: '100%',
        },
    }
}));

const SafetyDrivers = () => {
    const classes = useStyles();
    const [perf, setPerf] = useState('SCORE');
    const [impact, setImpact] = useState('NEGATIVE');

    const handleValueChange = (event, newvalue) => {
        setPerf(newvalue)
    };

    const handleImpactChange = (event, newvalue) => {
        setImpact(newvalue)
    };
    return (
        <div style={{ marginBottom: 10 }}>
            <SafetyNavigation />
            <div style={{ padding: 10 }}>
                <div className={classes.main}>
                    <div>
                        <h3>Contributing Factors</h3>
                        <p>Understand what's influencing your fleet's DRIVE Score over time</p>
                    </div>
                    <DriverSelector />
                </div>
                <div className={classes.horizontalline}></div>
                <div className={classes.drivertrend}>
                    <div className={classes.trendchart}>
                        <TrendLineChart />
                    </div>
                    <div className={classes.verticalline}></div>
                    <div className={classes.driverstats}>
                        <h3>This Week</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ width: '70px', height: '70px', borderRadius: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#76b5c5' }}>
                                    <h1 style={{ fontSize: '30px', color: '#21130d' }}>54</h1>
                                    <span style={{ fontSize: '10px' }}>Driver Score</span>
                                </div>
                            </div>
                            <div>
                                <div style={{ width: '70px', height: '70px', borderRadius: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <div className={`${classes.direction} ${3 < 0.5 ? classes.redclass : classes.greenclass}`}>
                                        {3 < 0.5 ? <RemoveIcon /> : <AddIcon />}
                                        <p style={{ fontSize: '30px' }}>3</p>
                                    </div>
                                    <span style={{ fontSize: '10px' }}>Net Change</span>
                                </div>
                            </div>
                        </div>
                        <h4 style={{ opacity: 0.3 }}>DRIVER BEHAVIOR</h4>
                        <div className={classes.horizontalline}></div>
                        {
                            driverBehavior?.map((behavior, index) => {
                                return (
                                    <>
                                        <Box sx={{ flexGrow: 1, p: 2 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <div>
                                                        <div style={{ width: '10px', height: '10px', borderRadius: '10%', backgroundColor: `${behavior.color}` }}></div>
                                                    </div>
                                                    <div>
                                                        {behavior.title}
                                                    </div>
                                                </div>
                                                <div className={`${classes.direction} ${behavior.value < 0.5 ? classes.redclass : classes.greenclass}`}>
                                                    {behavior.value < 0.5 ? <RemoveIcon /> : <AddIcon />}
                                                    <p>{behavior.value}</p>
                                                </div>
                                            </div>
                                        </Box>
                                        <div className={classes.horizontalline}></div>
                                    </>
                                )
                            })
                        }
                        <h4 style={{ opacity: 0.3 }}>FLEET COMPOSITION</h4>
                        <Box sx={{ flexGrow: 1, p: 2 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '10%', backgroundColor: '#629ad2' }}></div>
                                    </div>
                                    <div>
                                        Drivers Added
                                    </div>
                                </div>
                                <div className={`${classes.direction} ${1.19 < 0.5 ? classes.redclass : classes.greenclass}`}>
                                    {1.19 < 0.5 ? <RemoveIcon /> : <AddIcon />}
                                    <p>{1.19}</p>
                                </div>
                            </div>
                        </Box>
                    </div>
                </div>
                <div className={classes.fleetperf}>
                    <h3>
                        Performance<span style={{ opacity: 0.6 }}> / Jun 18 - Jun 25</span>
                    </h3>
                    <div className={classes.horizontalline}></div>
                    <div className={classes.mainperfdiv}>
                        <div className={classes.perfcoach}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h3>
                                        Fleet Analysis
                                    </h3>
                                </div>
                                <div>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={perf}
                                        exclusive
                                        onChange={handleValueChange}
                                        aria-label="Platform"
                                    >
                                        <ToggleButton value="SCORE">SCORE</ToggleButton>
                                        <ToggleButton value="IMPACT">IMPACT</ToggleButton>
                                    </ToggleButtonGroup>
                                </div>
                            </div>
                            <PerfChart />
                        </div>
                        <div className={classes.verticalline}></div>
                        <div className={classes.impactanalysis}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h3>
                                        Driver Impact Analysis
                                    </h3>
                                    <p>These drivers had the biggest negative influence on your fleet's DRIVE Score</p>
                                </div>
                                <div>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={impact}
                                        exclusive
                                        onChange={handleImpactChange}
                                        aria-label="Platform"
                                    >
                                        <ToggleButton value="NEGATIVE">NEGATIVE</ToggleButton>
                                        <ToggleButton value="POSITIVE">POSITIVE</ToggleButton>
                                    </ToggleButtonGroup>
                                </div>
                            </div>
                            <Box sx={{ flexGrow: 1, p: 2 }}>
                                <Grid
                                    container
                                    spacing={2}
                                >
                                    {impactHeader?.map((heading, index) => (
                                        <Grid key={index} {...{ xs: 3, sm: 3, md: 3, lg: 3 }}>
                                            {heading}
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                            <div className={classes.horizontalline}></div>
                            {
                                entries?.map((info, index) => {
                                    return (
                                        <>
                                            <Box sx={{ flexGrow: 1, p: 2 }}>
                                                <Grid
                                                    container
                                                    spacing={2}
                                                >
                                                    <>
                                                        <Grid key={index} {...{ xs: 3, sm: 3, md: 3, lg: 3 }}>
                                                            {info.name}
                                                        </Grid>
                                                        <Grid key={index} {...{ xs: 3, sm: 3, md: 3, lg: 3 }}>
                                                            <div className={classes.rectangle} style={(info.score >= 71 && info.score <= 100) && { backgroundColor: '#1976d2' } || (info.score >= 56 && info.score <= 70) && { backgroundColor: '#f50057' } || (info.score >= 51 && info.score <= 55) && { backgroundColor: '#154c79' } || (info.score >= 41 && info.score <= 50) && { backgroundColor: '#76b5c5' } || (info.score >= 0 && info.score <= 40) && { backgroundColor: '#eeeee4' }}>
                                                                <span className={classes.number}>{info.score}</span>
                                                            </div>
                                                        </Grid>
                                                        <Grid key={index} {...{ xs: 3, sm: 3, md: 3, lg: 3 }}>
                                                            <div className={`${classes.direction} ${info.twelveweek < 0.5 ? classes.redclass : classes.greenclass}`}>
                                                                {info.twelveweek < 0.5 ? <RemoveIcon /> : <AddIcon />}
                                                                <p>{info.twelveweek}</p>
                                                            </div>
                                                        </Grid>
                                                        <Grid key={index} {...{ xs: 3, sm: 3, md: 3, lg: 3 }}>
                                                            <div className={`${classes.direction} ${info.oneweek < 0.5 ? classes.redclass : classes.greenclass}`}>
                                                                {info.oneweek < 0.5 ? <RemoveIcon /> : <AddIcon />}
                                                                <p>{info.oneweek}</p>
                                                            </div>
                                                        </Grid>
                                                    </>
                                                </Grid>
                                            </Box>
                                            <div className={classes.horizontalline}></div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
/*eslint-disable*/
export default SafetyDrivers;
