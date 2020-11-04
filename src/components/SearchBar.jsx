import React from 'react';
import { Form, Input } from "reactstrap";

export default function SearchBar(props) {

    return (
        <Form className="app-search">
            <div className="position-relative">
                <Input type="text" className="form-control" placeholder="Search..." onChange={ props.handleChange }
                       value={ props.value } />
                <span className="fa fa-search" />
            </div>
        </Form>
    );
}