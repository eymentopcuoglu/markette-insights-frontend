import React from "react";
import ProductActivityChart from "./charts/ProductActivityChart";

export default function ProductActivity(props) {
    return (
        <>
            <h5 className="font-size-16 text-center">{ props.title }</h5>
            <ProductActivityChart value={ props.value } />
        </>
    );
}