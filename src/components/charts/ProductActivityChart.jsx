import React, { useState } from "react";
import ReactApexChart from 'react-apexcharts';

export default function ProductActivityChart(props) {
    const [state, setState] = useState({
        options: {
            colors: ['#7A6FBE'],
            chart: {
                height: 250,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '70%',
                    },
                    dataLabels: {
                        name: {
                            show: false
                        },
                        value: {
                            color: "#5b626b",
                            fontSize: "22px",
                            fontWeight: 600,
                            fontFamily: 'Poppins'
                        }
                    },
                    track: {
                        background: '#d9d9d9',
                        strokeWidth: '97%',
                        opacity: 1,
                        margin: 5,
                        dropShadow: {
                            enabled: false,
                            top: 0,
                            left: 0,
                            blur: 3,
                            opacity: 0.5
                        }
                    },
                },
            }
        }
    });
    return (
        <ReactApexChart options={ state.options } series={ props.value } type="radialBar" height={ 250 } />
    );
}