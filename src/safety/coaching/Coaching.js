/*eslint-disable*/
import React from "react";
import SafetyNavigation from "../SafetyNavigation";
import DriversToCoach from "./DriversToCoach";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';

function createData(score, name, totalDriving, harshEvents, speedingEvents, coached) {
    return { score, name, totalDriving, harshEvents, speedingEvents, coached };
}

const rows = [
    createData(15, 'Rahul Singh', '18 mi', 219, 65, 0),
    createData(0, 'Rahul Singh', '18 mi', 1, 0, 0),
    createData(15, 'Rahul Singh', '18 mi', 43, 0, 0),
    createData(15, 'Rahul Singh', '18 mi', 1, 12, 0),
    createData(15, 'Rahul Singh', '18 mi', 1, 0, 0),
];

const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
];

const useStyles = makeStyles((theme) => ({
    topselectors: {
        margin: 20,
        [theme.breakpoints.up('lg')]: {
            display: 'flex',
            alignItems: 'center',
            gap: 40
        },
    },
    rectangle: {
        width: '40px',
        height: '40px',
        borderRadius: '10%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    number: {
        fontSize: '20px',
        color: '#21130d'
    },
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: '3%',
        transform: 'translateX(50%)',
        [theme.breakpoints.down('lg')]: {
            right: '10%',
        },
    },
}));

const Coaching = () => {
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div style={{ marginBottom: 10 }}>
            <SafetyNavigation />
            <div style={{ padding: 10 }}>
                <div className={classes.topselectors}>
                    <div>
                        <DriversToCoach />
                    </div>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="Basic date picker" sx={{ minWidth: 200, maxWidth: 200 }} />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <div >
                        <h4 style={{ border: '2px solid rgba(0, 0, 0, 0.2)', width: 200, padding: 7, borderRadius: 5 }}>All Drivers</h4>
                    </div>
                    <div>
                        <Box sx={{ minWidth: 200, maxWidth: 200 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Score</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={20}>20</MenuItem>
                                    <MenuItem value={30}>30</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Scores</TableCell>
                            <TableCell align="left">Driver</TableCell>
                            <TableCell align="right">Total Driving</TableCell>
                            <TableCell align="right">Harsh Events</TableCell>
                            <TableCell align="right">Speeding Events</TableCell>
                            <TableCell align="right">Coached</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <div className={classes.rectangle} style={row.score !== 0 ? { backgroundColor: '#f8dfa6' } : { backgroundColor: '#eeeee4' }} >
                                        <span className={classes.number}>{row.score !== 0 ? row.score : 'N/A'}</span>
                                    </div>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">
                                    {row.totalDriving}
                                    <p style={{ opacity: 0.5 }}>13d 51m</p>
                                </TableCell>
                                <TableCell align="right">
                                    <p style={{ color: '#76b5c5' }}>
                                        {row.harshEvents}
                                    </p>
                                    <p style={{ opacity: 0.5 }}>1.41 per 100 mi</p>
                                </TableCell>
                                <TableCell align="right">
                                    <p style={{ color: '#76b5c5' }}>
                                        {row.speedingEvents}
                                    </p>
                                    <p style={{ opacity: 0.5 }}>2h 23m (0.08%)</p>
                                </TableCell>
                                <TableCell align="right">{row.coached}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }} className={classes.root}>
                <SpeedDial
                    ariaLabel="SpeedDial openIcon example"
                    icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                >
                    {actions.map((action) => (
                        <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
                    ))}
                </SpeedDial>
            </Box>
        </div>
    )
}
/*eslint-disable*/
export default Coaching;
