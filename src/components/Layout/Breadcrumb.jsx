import React from 'react';
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';


export default function Breadcrumb(props) {

    const { title, breadcrumbItems } = useSelector(state => state.breadcrumb);
    const itemLength = breadcrumbItems.length;

    return (
        <React.Fragment>
            <Row>
                <Col sm="6">
                    <div className="page-title-box">
                        <h4>{ title }</h4>
                        <ol className="breadcrumb m-0">
                            {
                                breadcrumbItems.map((item, key) =>
                                    (key + 1) === itemLength ?
                                        <li key={ key } className="breadcrumb-item active">{ item.title }</li>
                                        : <li key={ key } className="breadcrumb-item"><Link to="#">{ item.title }</Link>
                                        </li>
                                )
                            }
                        </ol>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}