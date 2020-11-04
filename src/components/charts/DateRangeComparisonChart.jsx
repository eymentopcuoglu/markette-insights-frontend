import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ReactApexChart from 'react-apexcharts';

import { getDatesBetweenDates } from "../../utils/dateUtil";
import api from "../../api";
import { reduceAndGetAverage } from "../../utils/pricingUtil";

export default function DateRangeComparisonChart(props) {

    const [state, setState] = useState({
        options: {
            colors: ['#7A6FBE', '#28BBE3', '#EB6B59', '#EBD12A', '#5842EB', '#ccc'],
            chart: {
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false,
                }
            },
            legend: {
                show: true
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            grid: {
                borderColor: '#f8f8fa',
                row: {
                    colors: ['transparent', 'transparent'],
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: [],
                axisBorder: {
                    show: true
                },
                axisTicks: {
                    show: false
                },
                tickPlacement: 'between'
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        if (value)
                            return value.toFixed(2) + "₺";
                    }
                },
            },
        },
        series: []
    });

    useEffect(() => {
        if (props.selectedProduct1 && props.selectedProduct2 && props.endDate) {
            const start = moment(props.startDate).startOf('day').toDate();
            const end = moment(props.endDate).endOf('day').toDate();
            const getData = async () => {
                const productData1 = await api.productAnalysis.productAnalysisFetch(props.selectedProduct1.product_id, start, end);
                const productData2 = await api.productAnalysis.productAnalysisFetch(props.selectedProduct2.product_id, start, end);

                const reducedProduct1 = reduceAndGetAverage(productData1);
                const reducedProduct2 = reduceAndGetAverage(productData2);

                const product1 = {
                    name: props.selectedProduct1.product_info.name,
                    data: reducedProduct1.map(item => item.pricen)
                }

                const product2 = {
                    name: props.selectedProduct2.product_info.name,
                    data: reducedProduct2.map(item => item.pricen)
                }
                setState({
                    options: {
                        ...state.options,
                        xaxis: {
                            ...state.options.xaxis,
                            categories: getDatesBetweenDates(props.startDate, props.endDate)
                        }
                    },
                    series: [product1, product2]
                });
            }
            getData();
        }
    }, [props.selectedProduct1, props.selectedProduct2, props.endDate]);

    return (
        <React.Fragment>
            <ReactApexChart options={ state.options } series={ state.series } type="line" height="290" />
        </React.Fragment>
    );
}