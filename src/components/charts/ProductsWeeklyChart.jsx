import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from "react-redux";
import { fillDates } from "../../utils/pricingUtil";

export default function ProductsWeeklyChart(props) {

    const { clientProducts, userProducts, markets } = useSelector(state => state.data);
    let marketData = [];

    useEffect(() => {
        if (clientProducts.length !== 0) {
            const currentProduct = userProducts.find(item => item.product_id === userProducts[props.currentSKU].product_id);
            const marketIds = [...new Set(currentProduct.product_transactions.map(item => item.market))];
            for (let i = 0; i < marketIds.length; i++) {
                //Filter by market
                marketData[i] = currentProduct.product_transactions.filter(item => item.market === '' + marketIds[i]);

                //Sort by date
                marketData[i].sort((a, b) => {
                    if (a.created_at > b.created_at) return 1;
                    else return -1;
                })
            }
            const today = new Date();
            const beforeWeek = moment(today).subtract(6, 'day').toDate();
            marketData.forEach(item => fillDates(item, beforeWeek, today));

            //Adjust to apex series
            marketData = marketData.map(item => {
                return ({
                    name: markets[parseInt(item[0].market) - 1].name,
                    data: item.map(marketData => parseInt(marketData.pricen) / 100)
                })
            });

            setState({ ...state, series: marketData });
        }
    }, [clientProducts, props.currentSKU]);

    const [state, setState] = useState({
        options: {
            colors: ['#ccc', '#7A6FBE', '#28BBE3', '#EB6B59', '#EBD12A', '#5842EB'],
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
                categories: [
                    moment(new Date()).subtract(6, 'd').format('DD.MM'),
                    moment(new Date()).subtract(5, 'd').format('DD.MM'),
                    moment(new Date()).subtract(4, 'd').format('DD.MM'),
                    moment(new Date()).subtract(3, 'd').format('DD.MM'),
                    moment(new Date()).subtract(2, 'd').format('DD.MM'),
                    moment(new Date()).subtract(1, 'd').format('DD.MM'),
                    moment(new Date()).format('DD.MM')],
                axisBorder: {
                    show: true
                },
                axisTicks: {
                    show: false
                }
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
    })
    return (
        <ReactApexChart options={ state.options } series={ state.series } type="line" height="350" />
    );
}