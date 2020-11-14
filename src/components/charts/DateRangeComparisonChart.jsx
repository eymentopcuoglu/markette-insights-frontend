import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ReactApexChart from 'react-apexcharts';

import { getDatesBetweenDates } from "../../utils/dateUtil";
import api from "../../api";
import { fillDates, getActivity, reduceAndGetAverage } from "../../utils/pricingUtil";

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

                let marketData1 = [];
                let marketData2 = [];
                const marketIds1 = [...new Set(productData1.map(item => item.market))];
                const marketIds2 = [...new Set(productData2.map(item => item.market))];

                for (let i = 0; i < marketIds1.length; i++) {

                    //Filter by market
                    marketData1[i] = productData1.filter(item => item.market === '' + marketIds1[i]);

                    //Sort by date
                    marketData1[i].sort((a, b) => {
                        if (a.created_at > b.created_at) return 1;
                        else return -1;
                    })
                }

                for (let i = 0; i < marketIds2.length; i++) {

                    //Filter by market
                    marketData2[i] = productData2.filter(item => item.market === '' + marketIds2[i]);

                    //Sort by date
                    marketData2[i].sort((a, b) => {
                        if (a.created_at > b.created_at) return 1;
                        else return -1;
                    })
                }

                //Retailer based filtering
                let filteredData1 = [...marketData1];
                if (props.selectedRetailers && props.selectedRetailers.length !== 0) {
                    filteredData1 = filteredData1
                        .filter(item => {
                            if (item.length !== 0)
                                return props.selectedRetailers.some(retailer => retailer.value === parseInt(item[0].market))
                            else
                                return true;
                        });
                }

                //Retailer based filtering
                let filteredData2 = [...marketData2];
                if (props.selectedRetailers && props.selectedRetailers.length !== 0) {
                    filteredData2 = filteredData2
                        .filter(item => {
                            if (item.length !== 0)
                                return props.selectedRetailers.some(retailer => retailer.value === parseInt(item[0].market))
                            else
                                return true;
                        });
                }

                // //Calculate activity1 (there is fillDates method as well!)
                let activity1 = [];
                filteredData1.forEach(item => {
                    fillDates(item, props.startDate, props.endDate);
                    activity1.push(getActivity(item));
                });
                activity1 = activity1.reduce((acc, item) => {
                    return {
                        activityFrequency: acc.activityFrequency += item.activityFrequency,
                        activityLength: acc.activityLength += item.activityLength
                    }
                }, { activityFrequency: 0, activityLength: 0 });
                activity1.activityFrequency = (activity1.activityFrequency / marketData1.length).toFixed(2);
                activity1.activityLength = (activity1.activityLength / marketData1.length).toFixed(2);
                props.setActivity1(activity1);

                // //Calculate activity (there is fillDates method as well!)
                let activity2 = [];
                filteredData2.forEach(item => {
                    fillDates(item, props.startDate, props.endDate);
                    activity2.push(getActivity(item));
                });
                activity2 = activity2.reduce((acc, item) => {
                    return {
                        activityFrequency: acc.activityFrequency += item.activityFrequency,
                        activityLength: acc.activityLength += item.activityLength
                    }
                }, { activityFrequency: 0, activityLength: 0 });
                activity2.activityFrequency = (activity2.activityFrequency / marketData2.length).toFixed(2);
                activity2.activityLength = (activity2.activityLength / marketData2.length).toFixed(2);
                props.setActivity2(activity2);


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

                filteredProductData1 = reduceAndGetAverage(filteredProductData1);
                filteredProductData2 = reduceAndGetAverage(filteredProductData2);

                const product1 = {
                    name: props.selectedProduct1.product_info.name,
                    data: filteredProductData1.map(item => item.pricen)
                }

                const product2 = {
                    name: props.selectedProduct2.product_info.name,
                    data: filteredProductData2.map(item => item.pricen)
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
    }, [props.selectedProduct1, props.selectedProduct2, props.endDate, props.selectedRetailers]);

    return (
        <React.Fragment>
            <ReactApexChart options={ state.options } series={ state.series } type="line" height="350" />
        </React.Fragment>
    );
}