import React from 'react';
import { Card, CardBody, Col, Row } from "reactstrap";
import CardWithText from "../CardWithText";

export default function ProductRow(props) {

    return (
        <Row>
            <Col xl="3">
                <Row className='d-flex justify-content-center align-items-center h-75'>
                    <Col xl="3">
                        <Card className="text-white bg-white">
                            <CardBody className='text-center'>
                                <img src={ props.image } alt={ props.name } className='mw-100 mh-100' />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="9">
                        <CardWithText text={ props.name } />
                    </Col>

                </Row>
            </Col>

            <Col xl="3">
                <Row>
                    <Col>
                        <CardWithText text={ props.minimumPrice } />
                    </Col>
                    <Col>
                        <CardWithText text={ props.averagePrice } />
                    </Col>
                    <Col>
                        <CardWithText text={ props.standardDeviation } />
                    </Col>
                </Row>
            </Col>

            <Col xl="6">
                <Row className='retailers'>
                    { props.retailers ? props.retailers.map((retailer, key) => {
                        return (
                            <Col key={ key } xl="3">
                                <Card className="text-white bg-white h-75 w-100">
                                    <CardBody className='center'>
                                        <p className='font-size-16 text-center text-black-50 margin-bottom-inherit'>{ props.product.current_product_transactions.find(item => parseInt(item.market) === retailer.value) ?
                                            ((props.product.current_product_transactions.find(item => parseInt(item.market) === retailer.value).pricen) / 100) + '₺' : 'Out of stock' }</p>
                                    </CardBody>
                                </Card>
                            </Col>
                        )
                    }) : '' }
                </Row>
            </Col>
        </Row>
    );
}