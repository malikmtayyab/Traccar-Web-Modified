/* eslint-disable */
import React from "react";
import TopNavigation from "../../common/components/TopNavigation";
import Selector from "../../common/components/Selector";
import { makeStyles } from '@mui/styles';
import TopStats from "../../common/components/TopStats";
import { useState } from "react";
import { useTranslation } from "../../common/components/LocalizationProvider";
import ListHeader from "../../common/components/ListHeader";
import ListEntry from '../../common/components/ListEntry'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

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
    togglenav: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: 30,
        paddingRight: 20,
    },
}));

const Vehicle = () => {
    const t = useTranslation()
    const classes = useStyles();
    const [vehicle, setvehicle] = useState('')
    const [alignment, setAlignment] = React.useState('AVG. MPG');

    function handleclick() {
        setvehicle('123')
    }

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment)
        props.toggle(newAlignment)
    };
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
            {vehicle &&
                <div style={{ maxWidth: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <div className={classes.togglenav}>
                        <h3>{t("fuelTrendsTitle")}</h3>
                        <ToggleButtonGroup
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                        >
                            <ToggleButton value="AVG. MPG">AVG. MPG</ToggleButton>
                            <ToggleButton value="%IDLING">%IDLING</ToggleButton>
                        </ToggleButtonGroup>

                    </div>

                </div>
            }
        </div>
    )
}
/* eslint-enable */
export default Vehicle;
