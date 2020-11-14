import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ReactApexChart from 'react-apexcharts';

import { getDatesBetweenDates } from "../../utils/dateUtil";
import api from "../../api";
import { fillDates, reduceAndGetAverage } from "../../utils/pricingUtil";

export default function DateRangeParityComparisonChart(props) {


    const [state, setState] = useState({
        options: {
            annotations: {
                yaxis: [
                    {
                        y: 100,
                        strokeDashArray: 10,
                        borderColor: '#FF0000',
                        label: {
                            borderWidth: 3,
                            borderColor: '#FF0000',
                            style: {
                                color: '#fff',
                                background: '#FF0000'
                            },
                            text: ''
                        }
                    }
                ]
            },
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
                min: 0,
                max: (max) => {
                    if (max > 400)
                        return max * 1.2;
                    else if (max > 300)
                        return max * 1.5
                    else if (max > 200)
                        return max * 1.6
                    else if (max > 100)
                        return max * 1.7
                    else if (max === 100)
                        return max * 1.5
                    else
                        return 120
                },
                labels: {
                    formatter: function (value) {
                        if (value)
                            return value.toFixed(0) + "%";
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
                    let productData1 = await api.productAnalysis.productAnalysisFetch(props.selectedProduct1.product_id, start, end);
                    let productData2 = await api.productAnalysis.productAnalysisFetch(props.selectedProduct2.product_id, start, end);

                    productData1 = productData1.filter(product1 => productData2.find(product2 =>
                        (product2.market === product1.market) && (product2.created_at === product1.created_at)));
                    productData2 = productData2.filter(product2 => productData1.find(product1 =>
                        (product1.market === product2.market) && (product1.created_at === product2.created_at)));

                    //Retailer based filtering
                    let filteredProductData1 = [...productData1];
                    if (props.selectedRetailers && props.selectedRetailers.length !== 0) {
                        filteredProductData1 = filteredProductData1
                            .filter(item => props.selectedRetailers.some(retailer => retailer.value === parseInt(item.market)));
                    }

                    //Retailer based filtering
                    let filteredProductData2 = [...productData2];
                    if (props.selectedRetailers && props.selectedRetailers.length !== 0) {
                        filteredProductData2 = filteredProductData2
                            .filter(item => props.selectedRetailers.some(retailer => retailer.value === parseInt(item.market)));
                    }

                    let reducedProduct1 = reduceAndGetAverage(filteredProductData1);
                    const reducedProduct2 = reduceAndGetAverage(filteredProductData2);

                    if (filteredProductData1 && filteredProductData1.length !== 0) {
                        reducedProduct1 = fillDates(reduceAndGetAverage(filteredProductData1), props.startDate, props.endDate)
                    }
                    if (filteredProductData2 && filteredProductData2.length !== 0) {
                        reducedProduct1 = fillDates(reduceAndGetAverage(filteredProductData1), props.startDate, props.endDate)
                    }

                    //Find second product's price in that date
                    reducedProduct1 = reducedProduct1.map(product1 => {
                        const product2Price = reducedProduct2.find(product2 =>
                            moment(product2.created_at).format('DD.MM.YYYY') === moment(product1.created_at).format('DD.MM.YYYY'));

                        //If product2Price found
                        if (product2Price) {
                            const parity = (product1.pricen / (product2Price.pricen)) * 100;
                            return ({
                                name: props.selectedProduct1.product_info.name,
                                data: [parity]
                            });
                        } else {
                            return ({
                                name: props.selectedProduct1.product_info.name,
                                data: []
                            });
                        }
                    });


                    setState({
                        options: {
                            ...state.options,
                            xaxis: {
                                ...state.options.xaxis,
                                categories: getDatesBetweenDates(props.startDate, props.endDate)
                            }
                        },
                        series: [{
                            name: props.selectedProduct1.product_info.name,
                            data: reducedProduct1.map(item => item.data[0])
                        }]
                    });
                }
                getData();
            }
        }
        ,
        [props.selectedProduct1, props.selectedProduct2, props.endDate, props.selectedRetailers]
    );

    return (
        <React.Fragment>
            <ReactApexChart options={ state.options } series={ state.series } type="area" height="350" />
        </React.Fragment>
    );
}