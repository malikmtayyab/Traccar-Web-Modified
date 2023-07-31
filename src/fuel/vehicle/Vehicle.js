/* eslint-disable */
import React from "react";
import TopNavigation from "../../common/components/TopNavigation";
import Selector from "../../common/components/Selector";
import { makeStyles } from '@mui/styles';
import TopStats from "../../common/components/TopStats";
import { useState } from "react";
import { useTranslation } from "../../common/components/LocalizationProvider";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CustomChart from "./CustomChart";

const rows = [
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
        <div style={{ marginBottom: 10 }}>
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

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t("vehicelTitle")}</TableCell>
                                    <TableCell>{t("utilizationTitle")}</TableCell>
                                    <TableCell>{t("idleTimeTitle")}</TableCell>
                                    <TableCell>{t("PTOTimeTitle")}</TableCell>
                                    <TableCell>{t("idleFuelwithoutmeasure")}</TableCell>
                                    <TableCell>{t("drivingTimeTitle")}</TableCell>
                                    <TableCell>{t("drivingFuelTitle")}</TableCell>
                                    <TableCell>{t("sharedDistance")}</TableCell>
                                    <TableCell>{t("fuelEfficiencyTitle")}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ cursor: 'pointer' }} onClick={handleclick}>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>
                                            {row.vehicel}
                                        </TableCell>
                                        <TableCell>
                                            {row.utilization}
                                        </TableCell>
                                        <TableCell>
                                            {row.idleTime}
                                        </TableCell>
                                        <TableCell>
                                            {row.PTOTime}
                                        </TableCell>
                                        <TableCell>
                                            {row.idleFuel}
                                        </TableCell>
                                        <TableCell>
                                            {row.drivingTime}
                                        </TableCell>
                                        <TableCell>
                                            {row.drivingFuel}
                                        </TableCell>
                                        <TableCell>
                                            {row.distance}
                                        </TableCell>
                                        <TableCell>
                                            {row.fuelEfficiency}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* <div className={classes.list}>
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
                    </div> */}
                </div>
            </div>
            {vehicle &&
                <div style={{ maxWidth: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <div className={classes.togglenav}>
                        <h3>LH160 Vs. Other Vehicles <span style={{ opacity: 0.3 }}>/ This Week</span></h3>
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
                    <div style={{ marginTop: 30, marginBottom: 30 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-around', maxWidth: '70%' }}>
                            <div>
                                <div style={{ borderTop: 'solid blue 2px', width: '30px' }}></div>
                                <h4>LH160</h4>
                            </div>
                            <div>
                                <div style={{ borderTop: 'dotted black 2px', width: '30px' }}></div>
                                <h4>Fleet Average</h4>
                            </div>
                            <div>
                                <div style={{ borderTop: 'solid yellow 2px', width: '30px' }}></div>
                                <h4>Fleemoo</h4>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2>This Make/Model</h2>
                            <p>KENWORTH T680 (5 VEHICLES)</p>
                        </div>
                        <CustomChart />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.5 }}>
                            <div>
                                <p>FLEET WORST</p>
                                <p>4.9 MPG</p>
                            </div>
                            <div>
                                <p>FLEET BEST</p>
                                <p>7.1 MPG</p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.horizontalline}></div>
                    <div style={{ marginTop: 30, marginBottom: 30 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2>This Vehicle Class</h2>
                            <p>Class 8 (11 Vehicles)</p>
                        </div>
                        <CustomChart />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.5 }}>
                            <div>
                                <p>FLEET WORST</p>
                                <p>4.9 MPG</p>
                            </div>
                            <div>
                                <p>FLEET BEST</p>
                                <p>8.1 MPG</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
/* eslint-enable */
export default Vehicle;
