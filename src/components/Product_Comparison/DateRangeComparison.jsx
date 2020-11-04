import { Card, CardBody } from "reactstrap";
import React from "react";
import DateRangeComparisonChart from "../charts/DateRangeComparisonChart";

export default function ProductDataRange(props) {

    return (
        <Card className='h-100'>
            <CardBody>
                <h4 className="card-title mb-4">Average Pricing Comparison with Date Range</h4>
                <DateRangeComparisonChart selectedProduct1={ props.selectedProduct1 }
                                          selectedProduct2={ props.selectedProduct2 }
                                          startDate={ props.startDate }
                                          endDate={ props.endDate } />
            </CardBody>
        </Card>
    );
}