import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from "react-redux";

import actions from '../../store/actions/index';
import { getDatesBetweenDates } from "../../utils/dateUtil";
import { fillDates, getActivity } from "../../utils/pricingUtil";
import { getMarketName } from "../../utils/namingUtil";

export default function ProductDataRangeChart(props) {

    const { productAnalysisDateRangeChartData, markets } = useSelector(state => state.data);
    const dispatch = useDispatch();
    let marketData = [];

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
                // labels: {
                //     formatter: function (value) {
                //         return value.toFixed(2) + "₺";
                //     }
                // },
            },
        },
        series: marketData
    });

    useEffect(() => {
        if (props.selectedProduct && props.endDate) {
            dispatch(actions.data.productAnalysisActions.productAnalysisDataFetchRequest(props.selectedProduct.product_id, props.startDate, props.endDate));
            setState(prevState => ({
                ...prevState,
                options: {
                    ...prevState.options,
                    xaxis: {
                        ...prevState.options.xaxis,
                        categories: getDatesBetweenDates(props.startDate, props.endDate)
                    }
                }
            }));
        }
    }, [props.selectedProduct, props.endDate]);


    //After fetching productAnalysisDateRangeChartData
    useEffect(() => {

        if (productAnalysisDateRangeChartData.length !== 0 && props.selectedProduct && props.endDate) {
            const marketIds = [...new Set(productAnalysisDateRangeChartData.map(item => item.market))];
            for (let i = 0; i < marketIds.length; i++) {

                //Filter by market
                marketData[i] = productAnalysisDateRangeChartData.filter(item => item.market === '' + marketIds[i]);

                //Sort by date
                marketData[i].sort((a, b) => {
                    if (a.created_at > b.created_at) return 1;
                    else return -1;
                })
            }

            //Retailer based filtering
            let filteredData = [...marketData];
            if (props.selectedRetailers && props.selectedRetailers.length !== 0) {
                filteredData = filteredData
                    .filter(item => {
                        if (item.length !== 0)
                            return props.selectedRetailers.some(retailer => retailer.value === parseInt(item[0].market))
                        else
                            return true;
                    });
            }

            // //Calculate activity (there is fillDates method as well!)
            let activity = [];
            filteredData.forEach(item => {
                fillDates(item, props.startDate, props.endDate);
                activity.push(getActivity(item));
            });
            activity = activity.reduce((acc, item) => {
                return {
                    activityFrequency: acc.activityFrequency += item.activityFrequency,
                    activityLength: acc.activityLength += item.activityLength
                }
            }, { activityFrequency: 0, activityLength: 0 });
            activity.activityFrequency = (activity.activityFrequency / marketData.length).toFixed(2);
            activity.activityLength = (activity.activityLength / marketData.length).toFixed(2);
            props.setActivity(activity);

            //Adjust to apex series
            filteredData = filteredData.map(item => {
                return ({
                    name: getMarketName(item[0].market, markets),
                    data: item.map(marketData => parseInt(marketData.pricen) / 100)
                })
            });
            setState({ ...state, series: filteredData });
        }
    }, [productAnalysisDateRangeChartData, props.selectedRetailers]);
    return (
        <React.Fragment>
            <ReactApexChart options={ state.options } series={ state.series } type="line" height="350" />
        </React.Fragment>
    );
}