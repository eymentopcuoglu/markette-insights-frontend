import { Button, Col, Tooltip } from "reactstrap";
import React, { useState } from "react";
import { useSelector } from "react-redux";


export default function SKUButton(props) {

    const [isOpen, setIsOpen] = useState(false);
    const userProducts = useSelector(state => state.data.userProducts);
    const toggle = () => {
        setIsOpen(!isOpen);
    }
    return (
        <Col className='d-flex justify-content-center'>
            <Button type="button" color="primary" className="waves-effect waves-light"
                    onClick={ () => props.setCurrentSKU(props.position - 1) }
                    id={ 'SKU' + props.position }>SKU { props.position }</Button>
            <Tooltip placement="bottom" isOpen={ isOpen } target={ 'SKU' + props.position } toggle={ toggle }>
                { userProducts.length === 0 ? '' : userProducts[props.position - 1].product_name }
            </Tooltip>
        </Col>
    );

}