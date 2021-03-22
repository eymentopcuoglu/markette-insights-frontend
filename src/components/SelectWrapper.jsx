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

    const getPlaceHolderText = (length) => {
        if (length === 1)
            return '1 item selected'
        else
            return length + ' items selected'
    }

    return (
        <FormGroup className="mb-0 w-100">
            <Label className="control-label">{ props.title }</Label>
            <Select
                controlShouldRenderValue={ false }
                hideSelectedOptions={ false }
                value={ props.selectedOptions }
                isMulti={ !props.isSearchable }
                onChange={ props.setSelectedOptions }
                className="select2 select2-multiple"
                closeMenuOnSelect={ false }
                styles={ customStyles }
                placeholder={ (props.selectedOptions && props.selectedOptions.length !== 0) ?
                    getPlaceHolderText(props.selectedOptions.length) : 'Select...' }
                theme={ theme => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary25: '#bdb8e0',
                        primary50: '#ada6d8',
                        primary75: '#9d95d0',
                        primary: '#8c83c9',
                    },
                }) }
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
            />
        </FormGroup>
    );
}