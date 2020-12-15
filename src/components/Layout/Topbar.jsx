import React, { useState } from 'react';
import { Link } from "react-router-dom";

//Import Menus
import LanguageMenu from "./LanguageMenu";
import ProfileMenu from "./ProfileMenu";
//import SettingsButton from "../Menus/settings-button";

//Import Images
import marketteLight from '../../assets/images/markette_light.png';
import marketteSm from '../../assets/images/markette-sm.png';
import actions from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";


export default function Topbar(props) {

    const { is_toggle, leftSideBarType } = useSelector(state => state.layout);
    const dispatch = useDispatch();

    const [state, setState] = useState({
        isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    });

    const sidebarToggle = () => {
        if (leftSideBarType === "default") {
            dispatch(actions.layout.changeSidebarType("condensed", state.isMobile));
        } else if (leftSideBarType === "condensed") {
            dispatch(actions.layout.changeSidebarType("default", state.isMobile));
        }
    }
    return (
        <React.Fragment>
            <header id="page-topbar">
                <div className="navbar-header">
                    <div className="d-flex">
                        <div className="navbar-brand-box">
                            <Link to="/dashboard" className="logo logo-light">
                                <span className="logo-sm">
                                    <img src={ marketteSm } alt="" height="22" />
                                </span>
                                <span className="logo-lg">
                                        <img src={ marketteLight } alt="" height="30" />
                                    </span>
                            </Link>
                        </div>
                        <button type="button" onClick={ sidebarToggle }
                                className="btn btn-sm px-3 font-size-24 header-item waves-effect"
                                id="vertical-menu-btn">
                            <i className="mdi mdi-menu" />
                        </button>
                    </div>
                    <div className="d-flex">
                        <LanguageMenu class="d-md-block" />
                        <ProfileMenu />
                    </div>
                </div>
            </header>
        </React.Fragment>
    );
}