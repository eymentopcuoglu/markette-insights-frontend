import React from 'react';
import { Link } from "react-router-dom";

//Import Menus
import LanguageMenu from "./LanguageMenu";
import ProfileMenu from "./ProfileMenu";
//import SettingsButton from "../Menus/settings-button";

//Import Images
import marketteLight from '../../assets/images/markette_light.png';


export default function Topbar(props) {
    return (
        <React.Fragment>
            <header id="page-topbar">
                <div className="navbar-header">
                    <div className="d-flex">
                        <div className="navbar-brand-box">
                            <Link to="/dashboard" className="logo logo-light">
                                    <span className="logo-lg">
                                        <img src={ marketteLight } alt="" height="30" />
                                    </span>
                            </Link>
                        </div>
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