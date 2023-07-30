/* eslint-disable */
import React from 'react';
import { useState } from 'react';
import TopNavigation from '../common/components/TopNavigation';
import FuelInsight from './FuelInsight';
import { makeStyles } from '@mui/styles';
import BasicLineChart from '../common/components/LineChart';
import Toggle from './Toggle'
import ItemsList from '../common/components/List';
import { List, Link, Typography } from '@mui/material';
import { useTranslation } from '../common/components/LocalizationProvider';

const fuelFactors = [

    { title: "cruiseDistanceTitle", value: "80%", trend: "2" },
    { title: "cruiseTimeTitle", value: "80%", trend: "14" },
    { title: "idleTimeTitle", value: "80%", trend: "5" },
    { title: "overRPMTitle", value: "80%", trend: "9" }
]

const safetyEvents = [

    { title: "hardBrakingTitle", value: "80%", trend: "2" },
    { title: "hardAccelerationTitle", value: "80%", trend: "14" },
    { title: "hardCorneringTitle", value: "80%", trend: "5" },
    { title: "speedingTitle", value: "80%", trend: "9" }
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

const modelentries = [
    { title: '2011 Volvo VNL', value: '3.6', trend: '1' },
    { title: '2010 Peterbilt', value: '3.6', trend: '1' },
    { title: '2013 Peterbilt', value: '3.6', trend: '1' },
    { title: '2008 Peterbilt', value: '3.6', trend: '1' },
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
        display: 'flex',
        justifyContent: 'space-between'
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
    }
}));

const Fuel = () => {
    const classes = useStyles();
    const t = useTranslation()
    const [value, setvalue] = useState("AVG. KM/L")
    const [showAllDrivers, setShowAllDrivers] = React.useState(false);
    const [showAllVehicles, setShowAllVehicles] = React.useState(false);

    const handleShowAllDriversClick = () => {
        setShowAllDrivers(!showAllDrivers);
    };

    const handleShowAllVehiclesClick = () => {
        setShowAllVehicles(!showAllVehicles);
    };

    function switchbutton(newAlignment) {
        setvalue(newAlignment);
        console.log(value)
    }
    return (
        <div style={{ marginBottom: 10 }}>
            <TopNavigation />
            <FuelInsight />
            <div className={classes.graphs}>
                <div className={classes.graphdiv}>
                    <div className={classes.togglenav}>
                        <h3>{t("fuelTrendsTitle")}</h3>
                        <Toggle toggle={switchbutton} />
                    </div>
                    <BasicLineChart legend={'fleetLegendTitle'} />
                </div>
                <div className={classes.factors}>
                    {value === "AVG. KM/L" &&
                        <>
                            <h3>
                                {t("fuelFactorsTitle")} <span style={{ opacity: 0.6 }}> / Jun 18 - Jun 25</span>
                            </h3>
                            {fuelFactors.map((factor, index) => (
                                <>
                                    <ItemsList title={factor.title} value={factor.value} trend={factor.trend} translate={true} />
                                    {
                                        index < fuelFactors.length - 1 &&
                                        <div className={classes.horizontalline}></div>
                                    }
                                </>
                            ))}
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3>
                                    {t("safetyEventsTitle")}
                                </h3>
                                <h3 style={{ opacity: 0.6 }}>
                                    {t("reportEvents")} / 1 K Mi
                                </h3>
                            </div>
                            {safetyEvents.map((event, index) => (
                                <>
                                    <ItemsList title={event.title} value={event.value} trend={event.trend} translate={true} />
                                    {
                                        index < safetyEvents.length - 1 &&
                                        <div className={classes.horizontalline}></div>
                                    }
                                </>
                            ))}
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3>
                                    {t("positionSpeed")}
                                </h3>
                                <h3 style={{ opacity: 0.6 }}>
                                    MPH
                                </h3>
                            </div>
                            <ItemsList title={"averageSpeedTitle"} value={"80"} trend={"9"} translate={true} />
                        </>
                    }
                    {
                        value === "%IDLING" &&
                        <>
                            <h3>{t("fuelTrendsTitle")}</h3>
                            <BasicLineChart legend={'fleetLegendTitle'} />

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
                    <div style={{ width: '45%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4>
                                {t("lowestEconomyTitle")}
                            </h4>
                            <h4 style={{ opacity: 0.6 }}>
                                MPG
                            </h4>
                        </div>
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
                                            <ItemsList title={entry.title} value={entry.value} trend={entry.trend} translate={false} />
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
                                            <ItemsList title={entry.title} value={entry.value} trend={entry.trend} translate={false} />
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
                    <div style={{ width: '45%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4>
                                {t("highestEconomyTitle")}
                            </h4>
                            <h4 style={{ opacity: 0.6 }}>
                                MPG
                            </h4>
                        </div>
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
                                            <ItemsList title={entry.title} value={entry.value} trend={entry.trend} translate={false} />
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
                                            <ItemsList title={entry.title} value={entry.value} trend={entry.trend} translate={false} />
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
                </div>
            </div>

            <div className={classes.performance} style={{ marginTop: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>
                        {t("vehiclePerformanceTitle")} <span style={{ opacity: 0.6 }}> / Jun 18 - Jun 25</span>
                    </h3>
                    <Typography component={Link} href="#" onClick={handleShowAllVehiclesClick} underline="none">
                        {showAllVehicles ? "Collapse" : "View All Vehicles"}
                    </Typography>
                </div>
                <div className={classes.horizontalline}></div>
                <div className={classes.innerperf}>
                    <div style={{ width: '45%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4>
                                {t("lowestEconomyTitle")}
                            </h4>
                            <h4 style={{ opacity: 0.6 }}>
                                MPG
                            </h4>
                        </div>
                        <List
                            data={entries}
                            sx={{
                                width: '100%',
                            }}
                        >
                            {showAllVehicles ? (
                                <List>
                                    {entries.map((entry, index) => (
                                        <>
                                            <ItemsList title={entry.title} value={entry.value} trend={entry.trend} translate={false} />
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
                                            <ItemsList title={entry.title} value={entry.value} trend={entry.trend} translate={false} />
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
                    <div style={{ width: '45%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4>
                                {t("highestEconomyTitle")}
                            </h4>
                            <h4 style={{ opacity: 0.6 }}>
                                MPG
                            </h4>
                        </div>
                        <List
                            data={entries}
                            sx={{
                                width: '100%',
                            }}
                        >
                            {showAllVehicles ? (
                                <List>
                                    {entries.map((entry, index) => (
                                        <>
                                            <ItemsList title={entry.title} value={entry.value} trend={entry.trend} translate={false} />
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
                                            <ItemsList title={entry.title} value={entry.value} trend={entry.trend} translate={false} />
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
                </div>
            </div>

            <div className={classes.performance} style={{ marginTop: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>
                        {t("modelPerformanceTitle")} <span style={{ opacity: 0.6 }}> / Jun 18 - Jun 25</span>
                    </h3>
                </div>
                <div className={classes.horizontalline}></div>
                <div className={classes.innerperf}>
                    <div style={{ width: '45%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4>
                                {t("lowestEconomyTitle")}
                            </h4>
                            <h4 style={{ opacity: 0.6 }}>
                                MPG
                            </h4>
                        </div>
                        <List>
                            {modelentries.map((entry, index) => (
                                <>
                                    <ItemsList title={entry.title} value={entry.value} trend={entry.trend} translate={false} />
                                    {
                                        index < modelentries.length - 1 &&
                                        <div className={classes.horizontalline}></div>
                                    }
                                </>
                            ))}
                        </List>
                    </div>
                    <div className={classes.verticalline}></div>
                    <div style={{ width: '45%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4>
                                {t("highestEconomyTitle")}
                            </h4>
                            <h4 style={{ opacity: 0.6 }}>
                                MPG
                            </h4>
                        </div>
                        <List>
                            {modelentries.slice(0, 5).map((entry, index) => (
                                <>
                                    <ItemsList title={entry.title} value={entry.value} trend={entry.trend} translate={false} />
                                    {
                                        index < modelentries.length - 1 &&
                                        <div className={classes.horizontalline}></div>
                                    }
                                </>
                            ))}
                        </List>
                    </div>
                </div>
            </div>
        </div>

    )
}
/* eslint-enable */
export default Fuel;
