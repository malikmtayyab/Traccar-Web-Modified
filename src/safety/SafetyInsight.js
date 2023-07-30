/* eslint-disable */
import React from "react";
import { makeStyles } from '@mui/styles';
import TimePeriod from "../common/components/TimePeriod";
import { useTranslation } from "../common/components/LocalizationProvider";
import StatsCard from "../common/components/StatsCard";


const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#2e2e2e',
        paddingLeft: 30,
        paddingRight: 30,
        color: 'white',
        display: 'flex',
        gap: 20
        // justifyContent: 'space-around'
    },
    insighttype: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 20,
        gap: 20
    },
    insight: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        [theme.breakpoints.down('md')]: {
            flexWrap: 'wrap',
            justifyContent: 'center'
        },
    },
    scoreboard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '10%'
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

const periodoption = ["Last Week", "Last 4 Weeks", "Last 12 Weeks"];
const statsoption = [
    {
        "title": "distanceMITitle",
        "value": "945",
        "direction": 15
    },
    {
        "title": "durationHRSTitle",
        "value": "20",
        "direction": 52
    },
    {
        "title": "activeDriversTitle",
        "value": "17",
        "direction": 3
    },
    {
        "title": "reportEvents",
        "value": "103",
        "direction": 54
    },
    {
        "title": "speedingTitle",
        "value": "0.4%",
        "direction": 1
    },
    {
        "title": "collisionTitle",
        "value": "3",
        "direction": 2
    },
];
const FuelInsight = () => {
    const classes = useStyles();
    const t = useTranslation()

    return (
        <div className={classes.container}>
            <div className={classes.scoreboard}>
                <h4>Drive Score</h4>
                <h1>43</h1>
                <h4>UPDATED 04/04</h4>
            </div>
            <div className={classes.verticalline}></div>
            <div style={{ minWidth: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className={classes.insight}>
                    <p>{t("reportSummary")} <span style={{ opacity: 0.6 }}> / Mar 28 - Apr 03 vs. Previous Week</span></p>
                    <TimePeriod period={periodoption} />
                </div>
                <div className={classes.horizontalline}></div>
                <StatsCard labels={statsoption} />
            </div>
        </div>
    )
}
/* eslint-enable */
export default FuelInsight;
