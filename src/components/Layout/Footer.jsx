import React from 'react';
import { Container, Row, Col } from "reactstrap";

export default function Footer() {
    return (
        <React.Fragment>
            <footer className="footer">
                <Container fluid>
                    <Row>
                        <Col sm="12">
                            © { new Date().getFullYear() } Markette <span
                            className="d-none d-sm-inline-block"> - v0.6.1 </span>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </React.Fragment>
    );
}