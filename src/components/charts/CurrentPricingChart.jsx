import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import moment from "moment";
import { useSelector } from "react-redux";

export default function CurrentPricingChart(props) {


    const { markets } = useSelector(state => state.data);

    useEffect(() => {
        setData(
            props.selectedProduct ? props.selectedProduct.current_product_transactions.map(item => ({
                name: markets[parseInt(item.market) - 1].name,
                data: [parseInt(item.pricen) / 100]
            })) : []
        );
    }, [props.selectedProduct]);

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
            }
        }
    });
    return <ReactApexChart options={ state.options } series={ data } type="bar" height="290" />
}
