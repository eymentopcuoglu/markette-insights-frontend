import { Card, CardBody } from "reactstrap";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import ProductsWeeklyChart from "../charts/ProductsWeeklyChart";
import SKUButtons from "./SKUButtons";

export default function ProductsWeekly(props) {

    const { userProducts } = useSelector(state => state.data);
    const [currentSKU, setCurrentSKU] = useState(0);

    return (
        <Card className='dashboard-components'>
            <CardBody>
                <h4 className="card-title mb-4">{ userProducts.length === 0 ? 'Products' : userProducts[currentSKU].product_name }</h4>
                    <ProductsWeeklyChart currentSKU={ currentSKU } />
                    <SKUButtons setCurrentSKU={ setCurrentSKU } />
            </CardBody>
        </Card>
    );
}