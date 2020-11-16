import React from 'react';
import { Card, CardBody, Row, Col, Alert } from "reactstrap";
import { useSelector } from "react-redux";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";

export default function LatestTransactions(props) {

    const { markets } = useSelector(state => state.data);

    return (
        <Card className='pr-2 pa-components overflow-hidden'>
            <PerfectScrollbar>
                <CardBody>
                    <h4 className="card-title mb-4">Latest Changes in Pricing</h4>
                    <Row className='alert mt-2 mb-0 latest-column-titles'>
                        <Col className='center'>
                            <p className="m-0 font-size-14 font-weight-medium">Market</p>
                        </Col>
                        <Col className='center'>
                            <p className="m-0 font-size-14 font-weight-medium">First Price</p>
                        </Col>
                        <Col className='center'>
                            <p className="m-0  font-size-14 font-weight-medium">Last Price</p>
                        </Col>
                        <Col className='center'>
                            <p className="m-0 font-size-14 font-weight-medium">Date</p>
                        </Col>
                    </Row>
                    {
                        props.selectedProduct && props.selectedProduct.logs.map((log, key) => {
                                const lastPrice = parseInt(log.pricen1) / 100;
                                const firstPrice = parseInt(log.pricen2) / 100;
                                const market = markets[parseInt(log.market) - 1].name;
                                const date = moment(log.created_at).format('DD.MM.YYYY');
                                return (
                                    <Alert key={ key } className='w-100'
                                           color={ (firstPrice > lastPrice ? 'danger' : 'success') }>
                                        <Row className='my-2'>
                                            <Col className='center'>
                                                <p className="m-0 text-muted font-20">{ market }</p>
                                            </Col>
                                            <Col className='center'>
                                                <p className="m-0 text-muted font-20">{ firstPrice }₺</p>
                                            </Col>
                                            <Col className='center'>
                                                <p className="m-0 text-muted font-20">{ lastPrice }₺</p>
                                            </Col>
                                            <Col className='center'>
                                                <p className="m-0 text-muted font-20">{ date }</p>
                                            </Col>
                                        </Row>
                                    </Alert>
                                );
                            }
                        )
                    }
                </CardBody>
            </PerfectScrollbar>
        </Card>
    );

}