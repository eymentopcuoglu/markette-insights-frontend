import React from 'react';
import { Col, Card, CardBody } from "reactstrap";


export default function MiniCard(props) {
    return (
        <Col xs={ 12 } md={ 6 } xl={ 3 }>
            <Card className="mini-stat bg-primary h-85">
                <CardBody className="mini-stat-img">
                    <div className="mini-stat-icon">
                        <i className={ "mdi " + props.icon + " float-right" } />
                    </div>
                    <div className="text-white">
                        <h6 className="text-uppercase mb-3 font-size-16">{ props.title }</h6>
                        <h2 className="mb-4">{ props.value }</h2>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
}