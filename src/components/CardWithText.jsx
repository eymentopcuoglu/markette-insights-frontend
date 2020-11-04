import React from "react";
import { Card, CardBody } from "reactstrap";

export default function CardWithText(props) {
    return (
        <Card className="text-white bg-white h-75 w-100">
            <CardBody className='center'>
                <p className='font-size-16 text-center text-black-50 margin-bottom-inherit'>{ props.text }</p>
            </CardBody>
        </Card>
    );
}