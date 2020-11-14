import React from 'react';
import { Card, CardBody, Col, Row } from "reactstrap";
import CardWithText from "../CardWithText";

export default function ProductRow(props) {

    return (
        <Row>
            <Col xl="3" className='w-100'>
                <Row className='center h-100'>
                    <Col xl="3" className='w-100 h-100'>
                        <Card className="text-white bg-white w-100 h-75">
                            <CardBody className='center'>
                                <img src={ props.image } alt={ props.name } className='mw-100 mh-100' />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="9" className='h-100 w-100'>
                        <CardWithText text={ props.name } />
                    </Col>
                </Row>
            </Col>

            <Col xl="3" className='w-100'>
                <Row className='center h-100'>
                    <Col className='w-100 h-100'>
                        <Card className="text-white h-75 w-100 calculated-fields-background">
                            <CardBody className='center'>
                                <p className='font-size-16 font-weight-bold text-center text-black-50 margin-bottom-inherit'>{ props.minimumPrice }</p>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className='w-100 h-100'>
                        <Card className="text-white h-75 w-100 calculated-fields-background">
                            <CardBody className='center'>
                                <p className='font-size-16 font-weight-bold text-center text-black-50 margin-bottom-inherit'>{ props.averagePrice }</p>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className='w-100 h-100'>
                        <Card className="text-white h-75 w-100 calculated-fields-background">
                            <CardBody className='center'>
                                <p className='font-size-16 font-weight-bold text-center text-black-50 margin-bottom-inherit'>{ props.standardDeviation }</p>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Col>

            <Col xl="6" className='w-100'>
                <Row className='retailers h-100'>
                    { props.retailers ? props.retailers.map((retailer, key) => {
                        return (
                            <Col key={ key } xl="3" className='w-100 h-100'>
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