/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-classes-per-file */
/*eslint-disable*/
import React, { useState } from 'react';
import {
    Grid,
    Container,
    Card,
} from '@mui/material';
import moment from 'moment';
import '../assets/css/fleemoo.css';
import { Chart } from './Chart';
import { useTranslation } from '../common/components/LocalizationProvider';
import { useEffect } from 'react';

function ChartMultiTraffic(props) {

    const [dataduration1] = useState([])
    const [dataduration2] = useState([])

    const [datadistance1] = useState([])
    const [datadistance2] = useState([])

    const [datafuel1] = useState([])
    const [datafuel2] = useState([])

    const [progress, setProgress] = useState(true);


    function loadFromJson(current, previous) {

        function converttoHour(seconds) {
            return (seconds / 3600).toFixed(2);
        }

        function converttoKM(meters) {
            return meters / 1000
        }

        if (current) {
            current.map(item => {
                dataduration1.push(converttoHour(item.duration))
                datadistance1.push(converttoKM(item.distance))
                datafuel1.push(item.spentFuel)
            })

        }

        if (previous) {
            previous.map(item => {
                dataduration2.push(converttoHour(item.duration))
                datadistance2.push(converttoKM(item.distance))
                datafuel2.push(item.spentFuel)
            })
        }
    }

    const t = useTranslation()

    let deviceIDs = [];

    const GetDeviceIdsAndLoadTrafficData = async () => {
        const response = await fetch('/api/devices');
        if (response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType) {
                if (contentType === 'application/json') {

                    let responseJsonObj = await response.json();
                    deviceIDs = [];
                    for (let i = 0; i < responseJsonObj.length; i++) {
                        deviceIDs.push(responseJsonObj[i].id);
                    }
                    console.log(`backend deviceIDs = ${deviceIDs}`);

                    GetTrafficData();
                } else {
                    console.log(`content type not handled: ${contentType}`);
                }
            }
        }
    };

    function GetTrafficData() {
        const reportData = async (from) => {
            const query = new URLSearchParams({ from });
            let response
            if (props.chartfor === 'day') {
                response = await fetch(`/api/dashboards/daylyTrips?${query.toString()}`);
            }
            else if (props.chartfor === 'week') {
                response = await fetch(`/api/dashboards/weeklyTrips?${query.toString()}`);
            }
            else if (props.chartfor === 'month') {
                response = await fetch(`/api/dashboards/monthlyTrips?${query.toString()}`);
            }

            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType) {
                    if (contentType === 'application/json') {
                        let responseJsonObj = await response.json();
                        setProgress(false);

                        if (props.chartfor === 'day') {
                            loadFromJson(responseJsonObj.currentDay, responseJsonObj.previousDay);
                        }


                        else if (props.chartfor === 'week') {
                            loadFromJson(responseJsonObj.currentWeek, responseJsonObj.previousWeek);
                        }

                        else if (props.chartfor === 'month') {
                            loadFromJson(responseJsonObj.currentMonth, responseJsonObj.previousMonth);
                        }


                    } else {
                        console.log(`content type not handled: ${contentType}`);
                    }
                } else {
                    console.log(' ----------->> no contain type');
                }
            } else {
                console.log(' ----------->> api call response not ok');
            }
        };

        let dateFrom = moment();
        reportData(
            dateFrom.format('YYYY-MM-DDTHH:mm:ss[Z]'),
        );
    }
    GetDeviceIdsAndLoadTrafficData();
    useEffect(() => {
    }, [dataduration1, dataduration2, datadistance1, datadistance2, datafuel1, datafuel2])

    return (
        <Container
            maxWidth={false}
            style={{ marginTop: '10px', background: '#F2F7FF' }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <div>
                        {' '}
                        <Card {...props} style={{ boxShadow: '0 0 rgba(0,0,0,0)' }}>
                            <div className="card-big-text">
                                <p style={{ marginBottom: '-15px' }}>{t('reportDuration')}</p>
                                {' '}
                            </div>
                            <Chart data1={dataduration1} data2={dataduration2} data1status={`Current ${props.text}`} data2status={`Previous ${props.text}`} duration={props.text} unit={'hrs'} />
                        </Card>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <div>
                        {' '}
                        <Card {...props} style={{ boxShadow: '0 0 rgba(0,0,0,0)' }}>
                            <div className="card-big-text">
                                <p style={{ marginBottom: '-15px' }}>{t('sharedDistance')}</p>
                                {' '}
                            </div>
                            < Chart data1={datadistance1} data2={datadistance2} data1status={`Current ${props.text}`} data2status={`Previous ${props.text}`} duration={props.text} unit={'kms'} />
                        </Card>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <div>
                        {' '}
                        <Card {...props} style={{ boxShadow: '0 0 rgba(0,0,0,0)' }}>
                            <div className="card-big-text">
                                <p style={{ marginBottom: '-15px' }}>{t('positionFuel')}</p>
                                {' '}
                            </div>
                            <Chart data1={datafuel1} data2={datafuel2} data1status={`Current ${props.text}`} data2status={`Previous ${props.text}`} duration={props.text} unit={'ltrs'} />
                        </Card>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};
/* eslint-enable */
export default ChartMultiTraffic;
