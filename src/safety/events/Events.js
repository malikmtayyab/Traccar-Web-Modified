/*eslint-disable*/
import React from "react";
import SafetyNavigation from "../SafetyNavigation";
import DriversToCoach from "../coaching/DriversToCoach";
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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ShieldIcon from '@mui/icons-material/Shield';

function createData(date, severity, event, driver, location) {
    return { date, severity, event, driver, location };
}

const rows = [
    createData('Nov 11, 1:48 PM', 'High', 'Hard Brake', 'Unidentified', 'San Francisco, CA'),
    createData('Nov 11, 1:48 PM', 'Medium', 'Hard Brake', 'Unidentified', 'San Francisco, CA'),
    createData('Nov 11, 1:48 PM', 'High', 'Hard Brake', 'Unidentified', 'San Francisco, CA'),
    createData('Nov 11, 1:48 PM', 'High', 'Hard Brake', 'Unidentified', 'San Francisco, CA'),
    createData('Nov 11, 1:48 PM', 'Medium', 'Hard Brake', 'Unidentified', 'San Francisco, CA'),
    createData('Nov 11, 1:48 PM', 'Medium', 'Hard Brake', 'Unidentified', 'San Francisco, CA'),
    createData('Nov 11, 1:48 PM', 'High', 'Hard Brake', 'Unidentified', 'San Francisco, CA'),
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
        width: '60px',
        height: '30px',
        borderRadius: '10%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    number: {
        fontSize: '15px',
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

const Events = () => {
    const classes = useStyles();
    const [severity, setSeverity] = React.useState('High');
    const [event, setEvent] = React.useState('Hard Brake');
    const [status, setStatus] = React.useState('Completed');

    const handleSeverityChange = (event) => {
        setSeverity(event.target.value);
    };

    const handleEventChange = (event) => {
        setEvent(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    return (
        <div style={{ marginBottom: 10 }}>
            <SafetyNavigation />
            <div style={{ padding: 10 }}>
                <div className={classes.topselectors}>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="Basic date picker" sx={{ minWidth: 200, maxWidth: 200 }} />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <div>
                        <Box sx={{ minWidth: 200, maxWidth: 200 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Severity</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={severity}
                                    label="Severity"
                                    onChange={handleSeverityChange}
                                >
                                    <MenuItem value={'High'}>High</MenuItem>
                                    <MenuItem value={'Medium'}>Medium</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div >
                        <h4 style={{ border: '2px solid rgba(0, 0, 0, 0.2)', width: 200, padding: 7, borderRadius: 5 }}>Drivers & Vehicles</h4>
                    </div>
                    <div>
                        <Box sx={{ minWidth: 200, maxWidth: 200 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Events</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={event}
                                    label="Events"
                                    onChange={handleEventChange}
                                >
                                    <MenuItem value={'Hard Brake'}>Hard Brake</MenuItem>
                                    <MenuItem value={'Hard Acceleration'}>Hard Acceleration</MenuItem>
                                    <MenuItem value={'Distraction'}>Distraction</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div>
                        <Box sx={{ minWidth: 200, maxWidth: 200 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Coaching Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    label="Coaching Status"
                                    onChange={handleStatusChange}
                                >
                                    <MenuItem value={'Completed'}>Completed</MenuItem>
                                    <MenuItem value={'Not Completed'}>Not Completed</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Show all DRIVE events" />
                </FormGroup>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell ></TableCell>
                            <TableCell >Date/Time</TableCell>
                            <TableCell >Severity</TableCell>
                            <TableCell >Events/Risk Factors</TableCell>
                            <TableCell >Drive/Vehicle</TableCell>
                            <TableCell >Location</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    <ShieldIcon />
                                </TableCell>
                                <TableCell>
                                    {row.date}
                                </TableCell>
                                <TableCell>
                                    <div className={classes.rectangle} style={row.severity === 'High' ? { backgroundColor: '#d2715e' } : { backgroundColor: '#d4bb7b' }} >
                                        <span className={classes.number} style={row.severity === 'High' ? { color: '#edc6bf' } : { color: '#eee4ca' }}>{row.severity}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {row.event}
                                </TableCell>
                                <TableCell>
                                    <p style={row.driver === 'Unidentified' ? { color: '#d2715e' } : { color: '#535e6a' }}>
                                        {row.driver}
                                    </p>
                                    <p style={{ opacity: 0.5 }}>3564</p>
                                </TableCell>
                                <TableCell>{row.location}</TableCell>
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
export default Events;
