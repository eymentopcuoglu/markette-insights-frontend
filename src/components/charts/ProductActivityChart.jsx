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
                    }
                },
            },
            labels: ['Product'],
        }
    });
    return (
        <ReactApexChart options={ state.options } series={ props.value } type="radialBar" height={ 250 } />
    );
}