import { Card, CardBody, Row, Col } from "reactstrap";
import React from "react";
import SelectWrapper from "../SelectWrapper";


export default function ProductDescription(props) {
    return (
        <Card className={ 'margin-bottom-inherit h-100 ' + (props.isInComparison ? 'product-description' : '') }>
            <CardBody>
                <Row>
                    <Col xl='4' className='center'>
                        <img className="img-fluid p-3 mw-100 product-image" src={ props.image }
                             alt="Product" />
                    </Col>
                    <Col xl='8' className={ 'center ' + (props.isInComparison ? 'flex-wrap py-5' : '') }>
                        <p className='font-size-17 font-weight-medium text-center margin-bottom-inherit'>{ props.name }</p>
                        { props.isInComparison ?
                            <SelectWrapper isSearchable={ true }
                                           data={ props.data }
                                           selectedOptions={ props.selectedOptions }
                                           setSelectedOptions={ props.setSelectedOptions } /> : '' }
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}