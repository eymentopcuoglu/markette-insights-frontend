import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { FormGroup, InputGroup, InputGroupAddon, Label } from "reactstrap";

export default function DateWrapper(props) {
    return (
        <FormGroup className="mb-0 w-100">
            <Label className="control-label">Date</Label>
            <InputGroup>
                { props.isDataRange ?
                    <DatePicker
                        selected={ props.startDate }
                        onChange={ date => props.onDateChange(date) }
                        startDate={ props.startDate }
                        endDate={ props.endDate }
                        selectsRange
                        className='form-control mb-0 w-100'
                        minDate={ new Date('2020-10-22') }
                        maxDate={ new Date() }
                    /> :
                    <DatePicker
                        selected={ props.startDate }
                        onChange={ date => props.onDateChange(date) }
                        className='form-control'
                        minDate={ new Date('2020-10-22') }
                        maxDate={ new Date() }
                    />
                }
                <InputGroupAddon addonType="append">
                    <span className="input-group-text"><i className="mdi mdi-calendar" /></span>
                </InputGroupAddon>
            </InputGroup>
        </FormGroup>
    );
};
