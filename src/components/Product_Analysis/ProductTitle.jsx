import { Card, CardBody } from "reactstrap";
import React from "react";

export default function ProductTitle(props) {
    return (
        <Card>
            <CardBody>
                <p className='font-size-15 text-center'>{ props.name }</p>
            </CardBody>
        </Card>
    );
}