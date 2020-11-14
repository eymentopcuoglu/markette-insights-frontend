import { Card, CardBody } from "reactstrap";
import React from "react";
import ProductDateRangeChart from "../charts/ProductDateRangeChart";
import CurrentPricingChart from "../charts/CurrentPricingChart";


export default function ProductDataRange(props) {

    return (
        <Card className='h-100'>
            <CardBody>
                <h4 className="card-title mb-4">{ props.selectedProduct ? props.selectedProduct.product_info.name : 'Please select an SKU' }</h4>
                <ProductDateRangeChart selectedProduct={ props.selectedProduct } startDate={ props.startDate }
                                       endDate={ props.endDate } setActivity={ props.setActivity }
                                       selectedRetailers={ props.selectedRetailers } />
            </CardBody>
        </Card>
    );
}