import React from 'react';
import { Card, CardBody } from "reactstrap";
import CurrentPricingComparisonChart from "../charts/CurrentPricingComparisonChart";

export default function CurrentPricingComparison(props) {
    return (
        <Card className='h-100'>
            <CardBody>
                <h4 className="card-title">Current Pricing Comparison</h4>
                <CurrentPricingComparisonChart selectedProduct1={ props.selectedProduct1 }
                                               selectedProduct2={ props.selectedProduct2 }
                                               selectedRetailers={ props.selectedRetailers } />
            </CardBody>
        </Card>
    );
}