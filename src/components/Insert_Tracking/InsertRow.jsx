import React from 'react';
import { Button, Card, CardBody, Col, Row } from "reactstrap";

export default function InsertRow(props) {

    return (
        <Row className='mt-1 mb-1 table-column-titles no-wrap'>
            <Col xs={ 2 } className='w-100'>
                <Card className="text-white bg-white h-75 w-100 ">
                    <CardBody className='center'>
                        <p className='font-size-16 text-center text-black-50 margin-bottom-inherit'>{ props.channel }</p>
                    </CardBody>
                </Card>
            </Col>
            <Col xs={ 2 } className='w-100'>
                <Card className="text-white bg-white h-75 w-100 ">
                    <CardBody className='center'>
                        <p className='font-size-16 text-center text-black-50 margin-bottom-inherit'>{ props.retailer }</p>
                    </CardBody>
                </Card>
            </Col>
            <Col xs={ 2 } className='w-100'>
                <Card className="text-white bg-white h-75 w-100 ">
                    <CardBody className='center'>
                        <p className='font-size-16 text-center text-black-50 margin-bottom-inherit'>{ props.startDate }</p>
                    </CardBody>
                </Card>
            </Col>
            <Col xs={ 2 } className='w-100'>
                <Card className="text-white bg-white h-75 w-100 ">
                    <CardBody className='center'>
                        <p className='font-size-16 text-center text-black-50 margin-bottom-inherit'>{ props.endDate }</p>
                    </CardBody>
                </Card>
            </Col>
            <Col xs={ 2 } className='w-100'>
                <Card className="text-white bg-white h-75 w-100 ">
                    <CardBody className='center'>
                        <p className='font-size-16 text-center text-black-50 margin-bottom-inherit'>{ props.duration }</p>
                    </CardBody>
                </Card>
            </Col>
            <Col xs={ 1 } className='w-100'>
                <Card className="text-white bg-white h-75 w-100 ">
                    <CardBody className='center'>
                        <p className='font-size-16 text-center text-black-50 margin-bottom-inherit'>{ props.numOfPages }</p>
                    </CardBody>
                </Card>
            </Col>
            <Col xs={ 1 } className='w-100'>
                <a href={ props.url }>
                    <Button className="btn btn-secondary h-75 w-100">
                        <p className='font-size-14 text-center m-auto overflow-wrap-normal'><i
                            className='mdi mdi-24px mdi-download' /></p>
                    </Button>
                </a>
            </Col>
        </Row>
    );
}