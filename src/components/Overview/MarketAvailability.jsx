import React, { useState } from 'react';
import { Card, CardBody } from "reactstrap";
import { useSelector } from "react-redux";
import ReactApexChart from 'react-apexcharts';

export default function MarketAvailability() {
    const { numberOfRetailers, markets } = useSelector(state => state.data);

    const [state, setState] = useState({
        options: {
            colors: ['#7A6FBE'],
            chart: {
                height: 250,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    offsetY: -20,
                    hollow: {
                        margin: 15,
                        size: "70%",
                    },
                    dataLabels: {
                        name: {
                            fontFamily: 'Poppins',
                        },
                        value: {
                            color: "#5b626b",
                            fontSize: "24px",
                            fontFamily: 'Poppins',
                            fontWeight: 500
                        }
                    }
                }
            },
            responsive: [{
                breakpoint: 1200,
                options: {
                    plotOptions: {
                        radialBar: {
                            offsetY: -10,
                            hollow: {
                                margin: 15,
                                size: "70%",
                            },
                            dataLabels: {
                                name: {
                                    fontFamily: 'Poppins',
                                    fontSize: "14px",
                                },
                                value: {
                                    color: "#5b626b",
                                    fontSize: "16px",
                                    fontFamily: 'Poppins'
                                }
                            }
                        }
                    },
                },
            }],
            labels: ['Availability'],
        }
    });
    return (
        <Card className="h-100">
            <CardBody>
                <h4 className="card-title mb-4">Market Availability</h4>
                <div className="row text-center my-2">
                    <div className="col-sm-6">
                        <h5 className="mb-0 font-size-20">{ numberOfRetailers }</h5>
                        <p className="text-muted">Available markets</p>
                    </div>
                    <div className="col-sm-6">
                        <h5 className="mb-0 font-size-20">{ markets.length }</h5>
                        <p className="text-muted">Total number of markets</p>
                    </div>
                </div>
                <ReactApexChart options={ state.options }
                                series={ [((numberOfRetailers / markets.length) * 100).toFixed(2)] }
                                type="radialBar" />
            </CardBody>
        </Card>
    );
}
