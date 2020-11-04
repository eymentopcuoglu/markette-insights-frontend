import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

//Import Images
import usFlag from '../../assets/images/flags/us_flag.jpg';
import turkeyFlag from '../../assets/images/flags/turkey_flag.jpg';


export default function LanguageMenu(props) {

    const [state, setState] = useState({
        menu: false
    });

    //!!!! Prevstate was used here check it out!!!!!
    const toggle = () => {
        setState({
            menu: !state.menu
        });
    };

    return (
        <React.Fragment>
            <Dropdown isOpen={ state.menu } toggle={ toggle } id="languagemenu"
                      className={ "d-none ml-2 " + props.class }>
                <DropdownToggle tag="button" className="btn header-item waves-effect">
                    <img className="mr-2" src={ usFlag } alt="Header Language" height="16" /> English <span
                    className="mdi mdi-chevron-down" />
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem tag="a" href="#" className="notify-item"><img src={ turkeyFlag } alt="user"
                                                                                className="mr-1" height="12" />
                        <span className="align-middle"> Türkçe (Available very soon!) </span></DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
}