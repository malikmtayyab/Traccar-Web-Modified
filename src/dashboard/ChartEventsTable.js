/*eslint-disable*/
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

import {
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    TableContainer,
    TablePagination,
} from '@mui/material';
import { useTranslation } from '../common/components/LocalizationProvider';
import {
    formatDate,
} from '../common/util/formatter';

let _dashboardDevicesEvents = null;
const _ContainerID_devicesEvents = 'cont-deviceEvents';

const ChartEventsTable = (props) => {

    const t = useTranslation();

    class DashboardDeviceEvents {
        constructor() {
            this.resetData();
        }

        resetData() {
            this.data = {};
            this.data.rows = [];
            this.data.columns = [
                {
                    id: 'deviceName',
                    label: 'sharedName',
                    minWidth: 70
                },
                {
                    id: 'lastUpdate',
                    label: 'sharedUpdate',
                    minWidth: 70,
                    align: 'right',
                    format: (value) => t(value),
                },
                {
                    id: 'speed',
                    label: 'sharedSpeed',
                    minWidth: 170,
                    align: 'right',
                },
                {
                    id: 'engineHours',
                    label: 'sharedEngineHours',
                    minWidth: 170,
                    align: 'right',
                },
                {
                    id: 'workHours',
                    label: 'sharedWorkHours',
                    minWidth: 170,
                    align: 'right',
                },
            ];
        }

        loadFromJson(rawTrafficDataJson) {
            try {
                for (let i = rawTrafficDataJson.length - 1; i >= 0; i--) {
                    let item = rawTrafficDataJson[i];
                    let dataLine = this.createTableData(
                        item.deviceName,
                        item.lastUpdate,
                        item.speed,
                        item.engineHours,
                        item.workHours,
                    );
                    this.data.rows.push(dataLine);
                }

            } catch (ex) {
                console.error('reading event data failed ', ex.message);
            }
        }
        createTableData(
            deviceName,
            lastUpdate,
            speed,
            engineHours,
            workHours,
        ) {
            return {
                deviceName, lastUpdate, speed, engineHours, workHours
            };
        }

    }

    const useStyles = makeStyles({
        root: {
            width: '100%',
        },
        tableCellHead: {
            padding: '8px 16px',
            background: '#fff',
            fontFamily: 'SF Pro Display',
            fontWeight: 'bold',
            fontSize: 14,
            color: '#202020',
        },
        tableCellBody: {
            padding: '6px 16px',
            background: '#fff',
            fontFamily: 'SF Pro Display',
            fontWeight: 'normal',
            fontSize: 14,
            color: '#202020',
        },
    });

    const CreateEventTable = () => {
        console.log("final", props.events)
        const classes = useStyles();
        const [page, setPage] = useState(0);
        const [rowsPerPage, setRowsPerPage] = useState(10);

        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
        };

        return (
            <div className="table">
                <TableContainer className="eventListContainer fancyScollbar2">
                    <Table stickyHeader aria-label="Event table">
                        <TableHead>
                            <TableRow>
                                {_dashboardDevicesEvents.data.columns.map((column) => (
                                    <TableCell
                                        className={classes.tableCellHead}
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {t(column.label)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {_dashboardDevicesEvents.data.rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.code}
                                        style={{ height: '20px' }}
                                    >
                                        {_dashboardDevicesEvents.data.columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    className={classes.tableCellBody}
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    style={{ padding: '0px 16px', marginTop: '-8px' }}
                    size="small"
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={_dashboardDevicesEvents.data.rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    className={classes.tableCellBody}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        );
    };
    const classes = useStyles();

    if (_dashboardDevicesEvents == null) { _dashboardDevicesEvents = new DashboardDeviceEvents(); }
    _dashboardDevicesEvents.loadFromJson(props.events);

    return (
        <Card
            {...props}
            style={{ boxShadow: '0 0 rgba(0,0,0,0)' }}
            className="middleCards"
        >
            <div className="card-big-text">
                <p style={{ marginBottom: '-3px' }}>{t('reportEvents')}</p>
                {' '}
            </div>
            <Paper
                className={classes.root}
                style={{ height: '100%' }}
                id={_ContainerID_devicesEvents}
            >
                <CreateEventTable />
            </Paper>
        </Card>
    );
};
/* eslint-enable */
export default ChartEventsTable;
