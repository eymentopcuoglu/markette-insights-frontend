import React from 'react';
import { useSelector } from 'react-redux';

//Import Scrollbar
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import SidebarContent from "./SidebarContent";


export default function Navbar(props) {
    const { leftSideBarType } = useSelector(state => state.layout);
    return (
        <React.Fragment>
            <div className="vertical-menu">
                <div className="data-simplebar h-100">
                    { leftSideBarType !== "condensed" ?
                        leftSideBarType !== "icon" ?
                            <PerfectScrollbar>
                                <SidebarContent />
                            </PerfectScrollbar> : <SidebarContent />
                        :
                        <SidebarContent />
                    }
                </div>
            </div>
        </React.Fragment>
    );


}