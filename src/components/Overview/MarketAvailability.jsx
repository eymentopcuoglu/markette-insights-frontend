import React from 'react';
import { Card, CardBody } from "reactstrap";
import C3Chart from 'react-c3js';
import 'c3/c3.css';
import { useSelector } from "react-redux";

export default function MarketAvailability() {
    const { numberOfRetailers, markets } = useSelector(state => state.data);

    const data = {
        columns: [
            ["Total number of markets in our system", markets.length],
            ["Availability", numberOfRetailers]
        ],
        type: "donut",
    };

    const donut = {
        title: "Availability",
        width: 30,
        label: { show: !1 }
    };

    const color = {
        pattern: ["#f0f1f4", "#7a6fbe", "#28bbe3", "#2f8ee0"]
    };

    return (
        <Card className="m-b-20 h-100">
            <CardBody>
                <h4 className="card-title mb-4">Market Availability</h4>
                <div className="row text-center mt-4">
                    <div className="col-sm-6">
                        <h5 className="mb-0 font-size-20">{ numberOfRetailers }</h5>
                        <p className="text-muted">Availability</p>
                    </div>
                    <div className="col-sm-6">
                        <h5 className="mb-0 font-size-20">{ markets.length }</h5>
                        <p className="text-muted">Total number of markets</p>
                    </div>

                </div>
                <C3Chart data={ data } donut={ donut } color={ color } />
            </CardBody>
        </Card>
    );
}
