/* eslint-disable */
import React, { useState } from "react";
import TopNavigation from "../../common/components/TopNavigation";
import { useTranslation } from "../../common/components/LocalizationProvider";
import Selector from "../../common/components/Selector";
import { makeStyles } from '@mui/styles';
import TopStats from "../../common/components/TopStats";
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import ListHeader from "../../common/components/ListHeader";
import ListEntry from '../../common/components/ListEntry'

const listitem = [
    { vehicel: "LH100", utilization: "78 % ", idleTime: "10 hrs 19 mins 25", PTOTime: "1 hr 9 mins", idleFuel: "6.45 gal", drivingTime: "36 hrs 14 mins 54 secs", drivingFuel: "354.08 gal", distance: "2125.09 mi", fuelEfficiency: "5.9 mpg" },
    { vehicel: "LH100", utilization: "78 % ", idleTime: "10 hrs 19 mins 25", PTOTime: "1 hr 9 mins", idleFuel: "6.45 gal", drivingTime: "36 hrs 14 mins 54 secs", drivingFuel: "354.08 gal", distance: "2125.09 mi", fuelEfficiency: "5.9 mpg" },
    { vehicel: "LH100", utilization: "78 % ", idleTime: "10 hrs 19 mins 25", PTOTime: "1 hr 9 mins", idleFuel: "6.45 gal", drivingTime: "36 hrs 14 mins 54 secs", drivingFuel: "354.08 gal", distance: "2125.09 mi", fuelEfficiency: "5.9 mpg" },
    { vehicel: "LH100", utilization: "78 % ", idleTime: "10 hrs 19 mins 25", PTOTime: "1 hr 9 mins", idleFuel: "6.45 gal", drivingTime: "36 hrs 14 mins 54 secs", drivingFuel: "354.08 gal", distance: "2125.09 mi", fuelEfficiency: "5.9 mpg" },
    { vehicel: "LH100", utilization: "78 % ", idleTime: "10 hrs 19 mins 25", PTOTime: "1 hr 9 mins", idleFuel: "6.45 gal", drivingTime: "36 hrs 14 mins 54 secs", drivingFuel: "354.08 gal", distance: "2125.09 mi", fuelEfficiency: "5.9 mpg" },
    { vehicel: "LH100", utilization: "78 % ", idleTime: "10 hrs 19 mins 25", PTOTime: "1 hr 9 mins", idleFuel: "6.45 gal", drivingTime: "36 hrs 14 mins 54 secs", drivingFuel: "354.08 gal", distance: "2125.09 mi", fuelEfficiency: "5.9 mpg" },
    { vehicel: "LH100", utilization: "78 % ", idleTime: "10 hrs 19 mins 25", PTOTime: "1 hr 9 mins", idleFuel: "6.45 gal", drivingTime: "36 hrs 14 mins 54 secs", drivingFuel: "354.08 gal", distance: "2125.09 mi", fuelEfficiency: "5.9 mpg" }
]

const useStyles = makeStyles((theme) => ({
    selector: {
        marginTop: 10,
        display: 'flex',
        // justifyContent: 'center',
        maxWidth: '50%',
        gap: 10,
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
    },
    stats: {
        marginTop: 20,
    },
    list: {
        marginTop: 40,
        width: '100%;', /* Set your desired width here */
        overflowX: 'auto'
    },
    horizontalline: {
        border: 'none',
        borderBottom: '2px solid black',
        height: '100',
        opacity: 0.1
    },
    circle: {
        width: '170px',
        height: '170px',
        borderRadius: '50%',
        backgroundColor: '#ccc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    number: {
        fontSize: '100px',
        color: '#fff'
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
}));

const Drivers = () => {
    const t = useTranslation()
    const classes = useStyles();
    const [driver, setdriver] = useState('')

    function handleclick() {
        setdriver("123")
    }
    return (
        <div>
            <TopNavigation />
            <div style={{ margin: 10 }}>
                <div className={classes.selector}>
                    <Selector title={"timeTitle"} options={["reportThisWeek", "reportThisMonth"]} />
                    <Selector title={"groupDialog"} options={["selectGroupTitle"]} />
                    <Selector title={"vehicelTitle"} options={["selectVehicleTitle"]} />
                </div>
                <div style={{ backgroundColor: '#dedfe0', paddingBottom: 10 }}>
                    <div className={classes.stats}>
                        <TopStats idleTime={"12"} drivingTime={122} drivingMile={14} idleFuel={43} drivingFuel={67} />
                    </div>
                    <div className={classes.list}>
                        <div className={classes.horizontalline}></div>
                        <ListHeader />
                        <div className={classes.horizontalline}></div>
                        <div>
                            {
                                listitem?.map((item, index) => {
                                    return (
                                        <>
                                            <div onClick={handleclick} style={{ cursor: 'pointer' }}>
                                                <ListEntry vehicle={item.vehicel} utilization={item.utilization} idleTime={item.idleTime} ptoTime={item.PTOTime} idleFuel={item.idleFuel} drivingTime={item.drivingTime} drivingFuel={item.drivingFuel} distance={item.distance} fuelEfficiency={item.fuelEfficiency} />
                                            </div>
                                            {
                                                index < listitem.length - 1 &&
                                                <div className={classes.horizontalline}></div>
                                            }
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            {driver &&
                <div style={{ maxWidth: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <div className={classes.flex}>
                        <Avatar alt="Remy Sharp" src="" sx={{ width: 170, height: 170 }} />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h4>{t("sharedDriver")}</h4>
                            <h4>Bill Smith</h4>
                            <h4>Vehicle HG2175</h4>
                            <Rating name="size-medium" defaultValue={2} />
                        </div>
                        <div className={classes.circle}>
                            <span className={classes.number}>10</span>
                        </div>
                    </div>
                    <div className={classes.flex}>
                        <div>
                            <LocalGasStationIcon />
                            <div>
                                <LinearProgress variant="determinate" value={70} />
                            </div>
                            <h2>{t("fuelWasteTitle")}: $237</h2>
                        </div>
                        <Chip label={`${t("needsCoachingTitle")}`} color="error" />
                    </div>
                    <h2 style={{ opacity: 0.5 }}>{t("sharedOverview")}</h2>
                    <div className={classes.flex}>
                        <h3>{t("alarmHardAcceleration")}</h3>
                        <h3>48</h3>
                    </div>
                    <div className={classes.flex}>
                        <h3>{t("averageSpeedTitle")}</h3>
                        <h3>65 MPH</h3>
                    </div>
                </div>
            }
        </div>
    )
}
/* eslint-enable */
export default Drivers;
