import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import Select from "react-select";

export default function SelectWrapper(props) {
    const customStyles = {
        menu: provided => ({ ...provided, zIndex: 2 }),
        valueContainer: (provided, state) => ({
            ...provided,
            maxHeight: '38px'
        }),
    };

    return (
        <FormGroup className="mb-0 w-100">
            <Label className="control-label">{ props.title }</Label>
            <Select
                controlShouldRenderValue = { false }
                hideSelectedOptions={ false }
                value={ props.selectedOptions }
                isMulti={ !props.isSearchable }
                onChange={ props.setSelectedOptions }
                options={ props.data ?
                    (!props.isSearchable ?
                        props.data.map(item => ({
                            value: item.id,
                            label: item.name
                        })) :
                        props.data.map(clientProduct => ({
                            value: clientProduct.product_id,
                            label: clientProduct.product_info.name
                        }))) : [] }
                className="select2 select2-multiple"
                styles={ customStyles }
            />
        </FormGroup>
    );
}