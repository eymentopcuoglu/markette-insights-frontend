import React from 'react';
import { Card, CardBody } from "reactstrap";
import CurrentPricingChart from "../charts/CurrentPricingChart";

export default function CurrentPricing(props) {
    return (
        <Card className='h-100'>
            <CardBody>
                <h4 className="card-title">Current Pricing</h4>
                <CurrentPricingChart selectedProduct={ props.selectedProduct } />
            </CardBody>
        </Card>
    );
}