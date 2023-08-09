/* eslint-disable */
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useTranslation } from '../common/components/LocalizationProvider';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const data = [
    {
        deviceName: "JM873525",
        engineHours: "19",
        lastUpdate: "2023-08-06T03:14:45.000+00:00",
        speed: 0,
        workHours: "8076",
    },
    // ... (other data entries)
];

function DataTable(props) {
    const t = useTranslation()
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const rows = props.events;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="Device Data Table">
                <TableHead>
                    <TableRow>
                        <TableCell>{t("sharedName")}</TableCell>
                        <TableCell>{t("sharedUpdate")}</TableCell>
                        <TableCell>{t("sharedEngineHours")}</TableCell>
                        <TableCell>{t("sharedSpeed")}</TableCell>
                        <TableCell>{t("sharedWorkHours")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.deviceName}</TableCell>
                            <TableCell>{row.lastUpdate}</TableCell>
                            <TableCell>{row.engineHours}</TableCell>
                            <TableCell>{row.speed}</TableCell>
                            <TableCell>{row.workHours}</TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={5} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}
/* eslint-enable */
export default DataTable;
