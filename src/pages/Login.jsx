import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, Alert, Button } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';

import actions from '../store/actions/index';
import markette from "../assets/images/markette_dark.png";


export default function Login(props) {
    const [state, setState] = useState({
        username: "",
        password: ""
    });

    const dispatch = useDispatch();
    const history = useHistory();

    const { user, error } = useSelector(state => state.auth);
    const handleSubmit = (event, values) => {
        dispatch(actions.auth.login.loginRequest(values.email, values.password, history));
    }

    return (
        <React.Fragment>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8" lg="6" xl="5">
                            <Card className="overflow-hidden">
                                <CardBody className="pt-0">
                                    <h3 className="text-center mt-4">
                                        <Link to="\" className="logo logo-admin"><img src={ markette } height="30"
                                                                                      alt="logo" /></Link>
                                    </h3>
                                    <div className="p-3">
                                        <h4 className="text-muted font-size-18 mb-1 text-center">Welcome Back !</h4>
                                        <p className="text-muted text-center">Sign in to continue to Markette.</p>
                                        { user && <Alert color="success">
                                            Your Login is successful.</Alert> }

                                        { error && <Alert color="danger">
                                            { error }</Alert> }
                                        <AvForm className="form-horizontal mt-4"
                                                onValidSubmit={ handleSubmit }>

                                            <label htmlFor="email">Email</label>
                                            <AvField name="email" placeholder="Enter Email"
                                                     value={ state.username } type="email" />

                                            <label htmlFor="password">Password</label>
                                            <AvField name="password" type="password" value={ state.password }
                                                     placeholder="Enter password" />

                                            <div className="form-group row mt-4">
                                                <Col xs="6">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input"
                                                               id="customControlInline" />
                                                        <label className="custom-control-label"
                                                               htmlFor="customControlInline">Remember me</label>
                                                    </div>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Button color="primary"
                                                            className="w-md waves-effect waves-light" type="submit">Log
                                                        In</Button>
                                                </Col>
                                            </div>
                                            <div className="form-group mb-0 row">
                                                <Col xs="12" className="mt-4">
                                                    <Link to="/forget-password" className="text-muted"><i
                                                        className="mdi mdi-lock" /> Forgot your password?</Link>
                                                </Col>
                                            </div>
                                        </AvForm>
                                    </div>
                                </CardBody>
                            </Card>
                            <div className="mt-5 text-center">
                                <p>Don't have an account ? <Link to="/register" className="text-primary"> Signup
                                    Now </Link></p>
                                <p>© 2020 Markette</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}



