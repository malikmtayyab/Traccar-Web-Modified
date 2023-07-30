/* eslint-disable */
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { makeStyles } from '@mui/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useTranslation } from './LocalizationProvider';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    grids: {
        textAlign: 'center'
    },
    card: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    direction: {
        display: 'flex',
        // justifyContent: 'center'
        alignItems: 'center'
    },
    redclass: {
        color: 'red'
    },
    greenclass: {
        color: 'green'
    }

}));

function StatsCard(props) {
    const location=useLocation()
    const t = useTranslation()
    const classes = useStyles();
    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid
                container
                spacing={2}
                sx={{
                    '--Grid-borderWidth': '1px',
                    borderTop: 'var(--Grid-borderWidth) solid',
                    borderLeft: 'var(--Grid-borderWidth) solid',
                    borderColor: 'divider',
                    '& > div': {
                        borderRight: 'var(--Grid-borderWidth) solid',
                        borderBottom: 'var(--Grid-borderWidth) solid',
                        borderColor: 'divider',
                    },
                }}
            >
                {props.labels.map((stats, index) => (
                    <Grid key={index} xs={6} sm={3} md={4} lg={2} minHeight={100} className={classes.grids} style={location.pathname.startsWith('/fuel')?{maxWidth:250}:{maxWidth:300}}>
                        {t(stats.title)}
                        <div className={classes.card}>
                            <p>{stats.value}</p>
                            <div className={`${classes.direction} ${stats.direction < 10 ? classes.redclass : classes.greenclass}`}>
                                {stats.direction < 10 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                                <p>{stats.direction}</p>
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
/* eslint-enable */
export default StatsCard;
