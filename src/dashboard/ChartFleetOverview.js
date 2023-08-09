/*eslint-disable*/
import {
    Card,
    CardContent,
    Grid,
    useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import ReactApexChart from 'react-apexcharts';
import { Helmet } from 'react-helmet';
import { useTranslation } from '../common/components/LocalizationProvider';
let _dashboardFleetDevices = null; // new DashboardFleetDevices();

let _chartID_fleetOverview = 'apexchart-fleetoverview';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '50px',
    },
}));

class DashboardFleetDevices {
    constructor() {
        this.resetData();
    }

    resetData() {
        this.data = {
            quantities: [],
            totalCount: 0,
            colors: [],
            legend: [],
        };
    }

    loadFromJson(rawTrafficDataJson, t) {
        if (rawTrafficDataJson) {
            this.resetData();
            this.data.totalCount = Object.values(rawTrafficDataJson).length;
            let catCounter = 0;
            const countOnline = Object.values(rawTrafficDataJson).filter(item => item.status === 'online').length;
            const countOffline = Object.values(rawTrafficDataJson).filter(item => item.status === 'offline').length;
            const countUnknown = Object.values(rawTrafficDataJson).filter(item => item.status === 'unknown').length;

            this.data.quantities.push(countOffline);
            this.data.legend.push(t('offlineTitle'));

            this.data.quantities.push(countOnline);
            this.data.legend.push(t('onlineTitle'));

            this.data.quantities.push(countUnknown);
            this.data.legend.push(t('unknownTitle'));

            console.log('--------------------------------------');

        }
    }
}

class DevicesByType extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: props.chartData,
            options: {
                chart: {
                    id: props.chartId,
                    toolbar: {
                        show: false,
                    },
                },
                plotOptions: {
                    donut: {
                        track: {
                            show: true,
                            startAngle: undefined,
                            endAngle: undefined,
                            background: '#f2f2f2',
                            strokeWidth: '140%',
                            opacity: 1,
                            margin: 5,
                            dropShadow: {
                                enabled: false,
                                top: 0,
                                left: 0,
                                blur: 3,
                                opacity: 0.5,
                            },
                        },
                        dataLabels: {
                            name: {
                                show: true,
                                fontSize: 12,
                            },
                            value: {
                                show: true,
                                fontSize: 4,
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                color: '#373d3f',
                                formatter() {
                                    return _dashboardFleetDevices.data.totalCount; // props.chartDataSum;
                                },
                            },
                        },
                    },
                },
                color: props.chartDataLabel,
                labels: props.chartDataLegend,
                legend: {
                    show: true,
                    floating: true,
                    fontSize: '14px',
                    position: 'left',
                    offsetX: -35,
                    offsetY: -15,
                    labels: {
                        colors: '#A5A5A5',
                    },
                    markers: {
                        width: 8,
                        height: 8,
                        radius: 8,
                    },
                    formatter(seriesName, opts) {
                        return (
                            `  ${seriesName
                            }:  ${opts.w.globals.series[opts.seriesIndex]}`
                        );
                    },
                    itemMargin: {
                        vertical: 10,
                    },
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            legend: {
                                show: false,
                            },
                        },
                    },
                ],
            },
        };
    }


    render() {
        return (
            <div id="chart" style={{ marginTop: '-30px' }} className="donutChart">
                <input type="hidden" id="refreshed" value="no" />
                <Helmet>
                    <script src="./public/js/pagereload.js" type="text/babel" />
                </Helmet>
                <ReactApexChart
                    options={this.state.options}
                    series={this.state.series}
                    type="donut"
                    height="255px"
                />
            </div>
        );
    }
}


const ChartFleetOverview = (props) => {
    const classes = useStyles();
    const t = useTranslation();
    const [memo, setMemo] = useState();


    if (_dashboardFleetDevices == null) { _dashboardFleetDevices = new DashboardFleetDevices(); }


    _dashboardFleetDevices.loadFromJson(props.fleet, t);

    return (
        <Card
            {...props}
            style={{ boxShadow: '0 0 rgba(0,0,0,0)' }}
            className={(classes.card, 'middleCards')}
        >
            <div className="card-big-text">
                <p id="fleettitel">
                    {t('sharedFleetOverview')}
                    {' '}
                </p>
                {' '}
            </div>
            {/* <Divider /> */}
            <CardContent>
                <div className={classes.root}>
                    <Grid container spacing={1} style={{ height: '100%' }}>
                        <Grid container item xs={12} spacing={1}>
                            <Grid item xs={12}>

                                <>{memo}</>

                                <DevicesByType
                                    chartId={_chartID_fleetOverview}
                                    chartData={_dashboardFleetDevices.data.quantities}
                                    chartDataLabel={_dashboardFleetDevices.data.colors}
                                    chartDataLegend={_dashboardFleetDevices.data.legend}
                                    chartDataSum={_dashboardFleetDevices.data.totalCount}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </CardContent>
        </Card>
    );
};
/* eslint-enable */
export default ChartFleetOverview;
