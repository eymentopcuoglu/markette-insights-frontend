import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import moment from "moment";
import { useSelector } from "react-redux";
import { getMarketName } from "../../utils/namingUtil";

export default function CurrentPricingChart(props) {


    const { markets } = useSelector(state => state.data);

    useEffect(() => {
        setData(
            (props.selectedProduct1 && props.selectedProduct2) ? props.selectedProduct1.current_product_transactions.reduce((result, product1) => {

                //Find second product's price in that market
                const product2Price = props.selectedProduct2.current_product_transactions.find(product2 => product2.market === product1.market);
                if (product2Price) {
                    const parity = (product1.pricen / (product2Price.pricen)) * 100;
                    result.push({
                        name: getMarketName(product1.market, markets),
                        data: [parity]
                    });
                }
                return result;
            }, []) : []
        );
    }, [props.selectedProduct1, props.selectedProduct2]);

    const [data, setData] = useState([]);
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
            chart: {
                toolbar: {
                    show: false,
                },
            },
            colors: ['#7A6FBE', '#28BBE3', '#EB6B59', '#EBD12A', '#5842EB', '#ccc'],
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    dataLabels: {
                        show: false
                    },

                },
            },
            legend: {
                show: true
            },
            dataLabels: {
                enabled: false,
            },
            grid: {
                borderColor: '#f8f8fa',
                row: {
                    colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            stroke: {
                show: true,
                width: 1.5,
                colors: ['#fff']
            },
            xaxis: {
                categories: [moment(new Date()).format('DD.MM.YYYY')],
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            yaxis: {
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
                        return value.toFixed(0) + "%";
                    }
                },
            },
        }
    });
    return <ReactApexChart options={ state.options } series={ data } type="bar" height="290" />
}