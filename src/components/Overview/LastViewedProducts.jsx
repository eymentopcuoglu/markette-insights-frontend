import React from 'react';
import { Card, CardBody } from "reactstrap";

export default function LastViewedProducts() {
    return (
        <React.Fragment>
            <Card className='h-100'>
                <CardBody>
                    <h4 className="card-title mb-3">Last Viewed Products</h4>
                    <div className="inbox-wid center h-100">
                        <p className='text-center font-size-24 font-weight-medium'>AVAILABLE VERY SOON!</p>
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}