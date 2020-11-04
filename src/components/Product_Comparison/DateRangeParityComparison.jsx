import { Card, CardBody } from "reactstrap";
import React from "react";
import DateRangeParityComparisonChart from "../charts/DateRangeParityComparisonChart";

export default function ProductDataRange(props) {

    return (
        <Card className='h-100'>
            <CardBody>
                <h4 className="card-title mb-4">Parity Comparison with Date Range</h4>
                <DateRangeParityComparisonChart selectedProduct1={ props.selectedProduct1 }
                                                selectedProduct2={ props.selectedProduct2 }
                                                startDate={ props.startDate }
                                                endDate={ props.endDate } />
            </CardBody>
        </Card>
    );
}