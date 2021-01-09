import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import moment from "moment";
import { useSelector } from "react-redux";
import { getAveragePrice } from "../../utils/pricingUtil";
import { getMarketName } from "../../utils/namingUtil";

export default function CurrentPricingChart(props) {

    const { markets } = useSelector(state => state.data);

    useEffect(() => {
        if (props.selectedProduct) {
            let filteredData = { ...props.selectedProduct };
            if (props.selectedRetailers && props.selectedRetailers.length !== 0) {
                filteredData.current_product_transactions = filteredData.current_product_transactions
                    .filter(item => props.selectedRetailers.some(retailer => retailer.value === item.market));
            }
            setData(
                filteredData.current_product_transactions.map(item => ({
                    name: getMarketName(item.market, markets),
                    data: [parseInt(item.pricen) / 100]
                }))
            );
            const average = getAveragePrice(filteredData, null, 0);
            setState({
                ...state,
                options: {
                    ...state.options,
                    annotations: {
                        yaxis: [
                            {
                                y: average,
                                strokeDashArray: 10,
                                borderColor: '#FF0000',
                                label: {
                                    borderWidth: 3,
                                    borderColor: '#FF0000',
                                    offsetY: 7,
                                    style: {
                                        color: '#fff',
                                        background: '#FF0000'
                                    },
                                    text: 'Average Price'
                                }
                            }
                        ]
                    }
                }
            })
        }
    }, [props.selectedProduct, props.selectedRetailers]);

    const [data, setData] = useState([]);
    const [state, setState] = useState({
        options: {
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
                    colors: ['transparent', 'transparent'],
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
            }
        }
    });
    return <ReactApexChart options={ state.options } series={ data } type="bar" height="350" />
}
