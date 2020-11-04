import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from "react-redux";

import actions from '../../store/actions/index';
import { getDatesBetweenDates } from "../../utils/dateUtil";
import { fillDates } from "../../utils/pricingUtil";

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

            marketData.forEach(item => fillDates(item, props.startDate, props.endDate))

            //Adjust to apex series
            marketData = marketData.map(item => {
                return ({
                    name: markets[parseInt(item[0].market) - 1].name,
                    data: item.map(marketData => parseInt(marketData.pricen) / 100)
                })
            });
            setState({ ...state, series: marketData });
        }
    }, [productAnalysisDateRangeChartData]);
    return (
        <React.Fragment>
            <ReactApexChart options={ state.options } series={ state.series } type="line" height="290" />
        </React.Fragment>
    );
}