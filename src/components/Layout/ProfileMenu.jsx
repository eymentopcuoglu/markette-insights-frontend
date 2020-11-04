import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import actions from '../../store/actions'

export default function ProfileMenu(props) {
    const { image } = useSelector(state => state.data.client);
    const dispatch = useDispatch();
    const history = useHistory();

    const [state, setState] = useState({
        menu: false
    });

    //!!!! Prevstate was used here check it out!!!!!
    const toggle = () => {
        setState({
            menu: !state.menu
        });
    };

    const handleLogout = () => {
        dispatch(actions.auth.logout.logoutRequest(history));
    }

    return (
        <React.Fragment>
            <Dropdown isOpen={ state.menu } toggle={ toggle } className="d-inline-block">
                <DropdownToggle tag="button" className="btn header-item waves-effect"
                                id="page-header-user-dropdown">
                    <img className="rounded-circle header-profile-user" src={ image } alt="Header Avatar" />
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem onClick={ handleLogout } className="text-danger"><i
                        className="mdi mdi-power font-size-17 text-muted align-middle mr-1 text-danger" /> Logout</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
}