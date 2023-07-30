/* eslint-disable */
import * as React from 'react';
import { makeStyles } from '@mui/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useTranslation } from '../common/components/LocalizationProvider';

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

}));

function DriverPerfList(props) {
    const t = useTranslation()
    const classes = useStyles();
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
            {
                props.translate ?
                    <p style={{ width: '70%' }}>{t(props.title)}</p>
                    :
                    <p style={{ width: '70%' }}>{props.title}</p>
            }
            <div className={`${classes.direction} ${props.trend < 10 ? classes.redclass : classes.greenclass}`}>
                {props.trend < 10 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                <p>{props.trend}%</p>
            </div>
            <div className={classes.rectangle} style={props.driver === "top" ? { backgroundColor: '#4bbad8' } : { backgroundColor: '#eab676' }}>
                <span className={classes.number}>10</span>
            </div>
        </div>
    );
}
/* eslint-enable */
export default DriverPerfList;
