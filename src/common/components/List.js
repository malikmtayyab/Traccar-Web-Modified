/* eslint-disable */
import * as React from 'react';
import { makeStyles } from '@mui/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useTranslation } from './LocalizationProvider';
import { useLocation } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';

const useStyles = makeStyles((theme) => ({
    direction: {
        display: 'flex',
        alignItems: 'center'
    },
    redclass: {
        color: 'red'
    },
    greenclass: {
        color: 'green'
    }

}));

function ItemsList(props) {
    const location = useLocation()
    const t = useTranslation()
    const classes = useStyles();
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {
                props.translate ?
                    <p style={{ width: '70%' }}>{t(props.title)}</p>
                    :
                    <p style={{ width: '70%' }}>{props.title}</p>
            }
            {/* {
                (location.pathname === '/safety/overview' && props.progressvalue) &&
                <LinearProgress variant="determinate" value={props.progressvalue} />
            } */}
            <p style={{ width: "10%" }}>{props.value}</p>
            <div className={`${classes.direction} ${props.trend < 10 ? classes.redclass : classes.greenclass}`}>
                {props.trend < 10 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                <p>{props.trend}%</p>
            </div>
        </div>
    );
}
/* eslint-enable */
export default ItemsList;
