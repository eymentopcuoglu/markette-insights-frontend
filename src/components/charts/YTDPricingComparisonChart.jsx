import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import moment from "moment";
import api from "../../api";
import { groupByMonth, reduceAndGetAverage } from "../../utils/pricingUtil";

export default function YTDPricingComparisonChart(props) {

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
                categories: [moment(new Date()).format('DD.MM')],
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
                        return value + "₺";
                    }
                },
            },
        },
        series: []
    });

    useEffect(() => {
        if (props.selectedProduct1 && props.selectedProduct2) {
            // const start = moment(new Date()).subtract(12, 'month').startOf('year').toDate();
            // const end = new Date();
            const getData = async () => {
                const data = await api.productComparison.productComparisonFetch(props.selectedProduct1.product_id, props.selectedProduct2.product_id, props.selectedRetailers && props.selectedRetailers.map(e => e.value));

                const product1 = {
                    name: props.selectedProduct1.product_info.name,
                    data: data.firstProductData.data
                }

                const product2 = {
                    name: props.selectedProduct2.product_info.name,
                    data: data.secondProductData.data
                }
                setState({
                    ...state,
                    options: {
                        ...state.options,
                        xaxis: {
                            ...state.options.xaxis,
                            categories: data.months
                        }
                    },
                    series: [product1, product2]
                });
            }
            getData();
        }
    }, [props.selectedProduct1, props.selectedProduct2, props.selectedRetailers]);

    return (
        <ReactApexChart options={ state.options } series={ state.series } type="bar" height="350" />
    );
}