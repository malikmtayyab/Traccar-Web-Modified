/* eslint-disable */
import React from 'react';
import { useState } from 'react';
import SafetyNavigation from './SafetyNavigation';
import SafetyInsight from './SafetyInsight'
import { makeStyles } from '@mui/styles';
import { useTranslation } from '../common/components/LocalizationProvider';
import BasicLineChart from '../common/components/LineChart';
import ItemsList from '../common/components/List';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { List, Link, Typography } from '@mui/material';
import DriverPerfList from './DriverPerfList';
import Piechart from './Piechart';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const riskFactors = [

    { title: "brakingTitle", value: "80%", trend: "2" },
    { title: "positionAcceleration", value: "80%", trend: "14" },
    { title: "corneringTitle", value: "80%", trend: "5" },
]

const eventBehaviour = [

    { title: "closeFollowTitle", value: "80%", trend: "2" },
    { title: "laneCutoffTitle", value: "80%", trend: "14" },
    { title: "distractionTitle", value: "80%", trend: "5" },
    { title: "alarmLaneChange", value: "80%", trend: "9" },
    { title: "seatBeltTitle", value: "80%", trend: "9" },
    { title: "drowsinessTitle", value: "80%", trend: "9" },
    { title: "nearCollisionTitle", value: "80%", trend: "9" },
]

const entries = [
    { title: 'Cameron Williamson', value: '3.6', trend: '1' },
    { title: 'Cameron Williamson', value: '3.6', trend: '1' },
    { title: 'Cameron Williamson', value: '3.6', trend: '1' },
    { title: 'Cameron Williamson', value: '3.6', trend: '1' },
    { title: 'Cameron Williamson', value: '3.6', trend: '1' },
    { title: 'Cameron Williamson', value: '3.6', trend: '1' },
    { title: 'Cameron Williamson', value: '3.6', trend: '1' },
    { title: 'Cameron Williamson', value: '3.6', trend: '1' },
    { title: 'Cameron Williamson', value: '3.6', trend: '1' },
    { title: 'Cameron Williamson', value: '3.6', trend: '1' },
    { title: 'Cameron Williamson', value: '3.6', trend: '1' },
];

const useStyles = makeStyles((theme) => ({
    graphs: {
        padding: 10,
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            justifyContent: 'space-between',
            gap: 20,
        },
    },
    graphdiv: {
        border: '2px solid rgba(0, 0, 0, 0.2)',
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '45%',
        },

    },
    factors: {
        border: '2px solid rgba(0, 0, 0, 0.2)',
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
        [theme.breakpoints.up('md')]: {
            width: '45%',
        },
    },
    togglenav: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: 30,
        paddingRight: 20,
    },
    performance: {
        paddingLeft: 30,
        paddingRight: 30,
        marginLeft: 10,
        marginRight: 10,
        border: '2px solid rgba(0, 0, 0, 0.2)'
    },
    innerperf: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            justifyContent: 'space-between'
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
    perftab: {
        padding: 10,
        width: '30%',
        [theme.breakpoints.down('lg')]: {
            width: '100%'
        },
    },
    perfcoach: {
        padding: 10,
        width: '40%',
        [theme.breakpoints.down('lg')]: {
            width: '100%'
        },
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
}));

const Safety = () => {
    const classes = useStyles();
    const t = useTranslation()

    const [alignment, setAlignment] = useState('DRIVE SCORE');
    const [perf, setPerf] = useState('EVENTS');
    const [showAllDrivers, setShowAllDrivers] = React.useState(false);

    const handleShowAllDriversClick = () => {
        setShowAllDrivers(!showAllDrivers);
    };

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment)
    };

    const handleValueChange = (event, newvalue) => {
        setPerf(newvalue)
    };
    return (
        <div style={{ marginBottom: 10 }}>
            <SafetyNavigation />
            <SafetyInsight />
            <div className={classes.graphs}>
                <div className={classes.graphdiv}>
                    <div className={classes.togglenav}>
                        <h3>Safety Trends</h3>
                        <ToggleButtonGroup
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                        >
                            <ToggleButton value="DRIVE SCORE">DRIVE SCORE</ToggleButton>
                            <ToggleButton value="HARD EVENTS">HARD EVENTS</ToggleButton>
                            <ToggleButton value="SPEEDING">SPEEDING</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <BasicLineChart legend={'fleetLegendTitle'} />
                </div>
                <div className={classes.factors}>
                    {alignment === "DRIVE SCORE" &&
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3>
                                    Risk Factors <span style={{ opacity: 0.6 }}> / Apr 13 - 19</span>
                                </h3>
                                <h3 style={{ opacity: 0.6 }}>
                                    {t("reportEvents")} / 1 K Mi
                                </h3>
                            </div>
                            {riskFactors.map((factor, index) => (
                                <>
                                    <ItemsList title={factor.title} progressvalue={30} value={factor.value} trend={factor.trend} translate={true} />
                                    {
                                        index < riskFactors.length - 1 &&
                                        <div className={classes.horizontalline}></div>
                                    }
                                </>
                            ))}
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3>
                                    Event Behaviour
                                </h3>
                                <h3 style={{ opacity: 0.6 }}>
                                    % OF DRIVERS
                                </h3>
                            </div>
                            {eventBehaviour.map((event, index) => (
                                <>
                                    <ItemsList title={event.title} value={event.value} trend={event.trend} translate={true} />
                                    {
                                        index < eventBehaviour.length - 1 &&
                                        <div className={classes.horizontalline}></div>
                                    }
                                </>
                            ))}
                        </>
                    }
                    {
                        alignment === "HARD EVENTS" &&
                        <>
                            <h3>Safety Trends</h3>
                            <BasicLineChart legend={"hardEventTitle"} />

                        </>
                    }
                    {
                        alignment === "SPEEDING" &&
                        <>
                            <h3>Safety Trends</h3>
                            <BasicLineChart legend={"overPostedTitle"} />

                        </>
                    }
                </div>
            </div>
            <div className={classes.performance}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>
                        {t("driverPerformanceTitle")} <span style={{ opacity: 0.6 }}> / Jun 18 - Jun 25</span>
                    </h3>
                    <Typography component={Link} href="#" onClick={handleShowAllDriversClick} underline="none">
                        {showAllDrivers ? `${t("collapseTitle")}` : `${t("allDriversTitle")}`}
                    </Typography>
                </div>
                <div className={classes.horizontalline}></div>
                <div className={classes.innerperf}>
                    <div className={classes.perftab}>
                        <h3>
                            Bottom Drivers
                        </h3>
                        <p>UPDATED 11/08</p>
                        <List
                            data={entries}
                            sx={{
                                width: '100%',
                            }}
                        >
                            {showAllDrivers ? (
                                <List>
                                    {entries.map((entry, index) => (
                                        <>
                                            <DriverPerfList title={entry.title} value={entry.value} trend={entry.trend} translate={false} driver={"bottom"} />
                                            {
                                                index < entries.length - 1 &&
                                                <div className={classes.horizontalline}></div>
                                            }
                                        </>
                                    ))}
                                </List>
                            ) : (
                                <List>
                                    {entries.slice(0, 5).map((entry, index) => (
                                        <>
                                            <DriverPerfList title={entry.title} value={entry.value} trend={entry.trend} translate={false} driver={"bottom"} />
                                            {
                                                index < entries.length - 1 &&
                                                <div className={classes.horizontalline}></div>
                                            }
                                        </>
                                    ))}
                                </List>
                            )}
                        </List>
                    </div>
                    <div className={classes.verticalline}></div>
                    <div className={classes.perftab}>
                        <h3>
                            Top Drivers
                        </h3>
                        <p>UPDATED 11/08</p>
                        <List
                            data={entries}
                            sx={{
                                width: '100%',
                            }}
                        >
                            {showAllDrivers ? (
                                <List>
                                    {entries.map((entry, index) => (
                                        <>
                                            <DriverPerfList title={entry.title} value={entry.value} trend={entry.trend} translate={false} driver={"top"} />
                                            {
                                                index < entries.length - 1 &&
                                                <div className={classes.horizontalline}></div>
                                            }
                                        </>
                                    ))}
                                </List>
                            ) : (
                                <List>
                                    {entries.slice(0, 5).map((entry, index) => (
                                        <>
                                            <DriverPerfList title={entry.title} value={entry.value} trend={entry.trend} translate={false} driver={"top"} />
                                            {
                                                index < entries.length - 1 &&
                                                <div className={classes.horizontalline}></div>
                                            }
                                        </>
                                    ))}
                                </List>
                            )}
                        </List>
                    </div>
                    <div className={classes.verticalline}></div>
                    <div className={classes.perfcoach}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3>
                                    Coached vs. Uncoached
                                </h3>
                                <p>UPDATED 11/08</p>
                            </div>
                            <div>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={perf}
                                    exclusive
                                    onChange={handleValueChange}
                                    aria-label="Platform"
                                >
                                    <ToggleButton value="EVENTS">EVENTS</ToggleButton>
                                    <ToggleButton value="DRIVERS">DRIVERS</ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </div>
                        <h3>
                            Coached vs. Uncoached
                        </h3>
                        <p>UPDATED 11/08</p>
                        <Piechart />
                        <div className={classes.horizontalline}></div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p>
                                Your company had an average coaching turnaround time of <span style={{ fontWeight: 'bolder' }}>less than 1 day</span>
                            </p>
                            <div className={`${classes.direction} ${1 < 10 ? classes.redclass : classes.greenclass}`}>
                                {1 < 10 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                                <p>1%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
/* eslint-enable */
export default Safety;
