/* eslint-disable */
import React from "react";
import { makeStyles } from '@mui/styles';
import DropDown from './DropDown'
import TimePeriod from "../common/components/TimePeriod";
import { useTranslation } from "../common/components/LocalizationProvider";
import StatsCard from "../common/components/StatsCard";


const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#0d324a',
        paddingLeft: 30,
        paddingRight: 30,
        color: 'white',
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
    }
}));

const periodoption = ["7D", "14D", "30D", "90D"];
const statsoption = [
    {
        "title": "fuelTitle",
        "value": "8.1 mpg",
        "direction": 2
    },
    {
        "title": "distanceTitle",
        "value": "11.2 k",
        "direction": 11
    },
    {
        "title": "fuelUsedTitle",
        "value": "1.4 k",
        "direction": 4
    },
    {
        "title": "fuelCostTitle",
        "value": "1.5 k",
        "direction": 3
    },
    {
        "title": "utilTitle",
        "value": "78%",
        "direction": 14
    },
    {
        "title": "idleFuelTitle",
        "value": "302",
        "direction": 7
    },
    {
        "title": "fuelWastedTitle",
        "value": "438",
        "direction": 2
    },
];
const FuelInsight = () => {
    const classes = useStyles();
    const t = useTranslation()

    return (
        <div className={classes.container}>
            <div className={classes.insight}>
                <div className={classes.insighttype}>
                    <p>{t("fuelInsightTitle")}</p>
                    <DropDown />
                </div>
                <div>
                    <TimePeriod period={periodoption} />
                </div>
            </div>
            <StatsCard labels={statsoption} />
        </div>
    )
}
/* eslint-enable */
export default FuelInsight;
