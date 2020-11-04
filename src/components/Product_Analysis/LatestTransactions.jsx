import React from 'react';
import { Card, CardBody, Row, Col } from "reactstrap";
import { useSelector } from "react-redux";
import moment from "moment";

//Import Images
export default function LatestTransactions(props) {

    const { markets } = useSelector(state => state.data);

    return (
        <React.Fragment>
            <Card className='h-100'>
                <CardBody>
                    <h4 className="card-title mb-4">Latest Changes in Pricing</h4>
                    {
                        props.selectedProduct ? props.selectedProduct.logs.map((log, key) => {
                                const lastPrice = parseInt(log.pricen1) / 100;
                                const firstPrice = parseInt(log.pricen2) / 100;
                                const market = markets[parseInt(log.market) - 1].name;
                                const date = moment(log.created_at).format('DD.MM.YYYY');
                                return (
                                    <Row key={ key } className='my-2'>
                                        <Col lg='4' className='center'>
                                            <img src={ props.selectedProduct.product_info.imageurl } alt="product"
                                                 className="avatar-xs rounded-circle mr-2 float-left" />
                                            <p className='m-auto'>{ props.selectedProduct.product_info.name }</p>
                                        </Col>
                                        <Col className='center'>
                                            <i className={ "mdi mdi-checkbox-blank-circle  text-" + (firstPrice > lastPrice ? 'danger' : 'success') } />
                                            <p className="m-0 text-muted font-16"> { market }</p>
                                        </Col>
                                        <Col className='center'>
                                            <p className="m-0 text-muted font-16">First Price: { firstPrice }₺</p>
                                        </Col>
                                        <Col className='center'>
                                            <p className="m-0 text-muted font-16">Last Price: { lastPrice }₺</p>
                                        </Col>
                                        <Col className='center'>
                                            <p className="m-0 text-muted font-16">{ date }</p>
                                        </Col>

                                    </Row>
                                );
                            }
                        ) : null
                    }
                </CardBody>
            </Card>
        </React.Fragment>
    );

}