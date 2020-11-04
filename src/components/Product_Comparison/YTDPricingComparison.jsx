import { Card, CardBody } from "reactstrap";
import React from "react";
import YTDPricingComparisonChart from "../charts/YTDPricingComparisonChart";


export default function YTDPricingComparison(props) {
    return (
        <Card className='h-100'>
            <CardBody>
                <h4 className="card-title mb-4">Year-to-date Pricing</h4>
                    <YTDPricingComparisonChart selectedProduct1={ props.selectedProduct1 }
                                               selectedProduct2={ props.selectedProduct2 }
                    />
            </CardBody>
        </Card>
    );
}