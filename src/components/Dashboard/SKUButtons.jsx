import {  Row } from "reactstrap";
import React from "react";
import SKUButton from "./SKUButton";


export default function SKUButtons(props) {
    return (
        <Row className='d-flex align-items-center mt-3 mb-2'>
            <SKUButton position={ 1 } setCurrentSKU={ props.setCurrentSKU } />
            <SKUButton position={ 2 } setCurrentSKU={ props.setCurrentSKU } />
            <SKUButton position={ 3 } setCurrentSKU={ props.setCurrentSKU } />
            <SKUButton position={ 4 } setCurrentSKU={ props.setCurrentSKU } />
            <SKUButton position={ 5 } setCurrentSKU={ props.setCurrentSKU } />
        </Row>
    );

}