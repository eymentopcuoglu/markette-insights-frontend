import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// MetisMenu
import MetisMenu from "metismenujs";

export default function SidebarContent(props) {

    const location = useLocation();

    const activateParentDropdown = (item) => {
        item.classList.add('mm-active');
        const parent = item.parentElement;

        if (parent) {
            parent.classList.add('mm-active'); // li
            const parent2 = parent.parentElement;

            if (parent2) {
                parent2.classList.add("mm-show");

                const parent3 = parent2.parentElement;

                if (parent3) {
                    parent3.classList.add('mm-active'); // li
                    parent3.childNodes[0].classList.add('mm-active'); //a
                    const parent4 = parent3.parentElement;
                    if (parent4) {
                        parent4.classList.add('mm-active');
                    }
                }
            }
            return false;
        }
        return false;
    }

    const initMenu = () => {
        new MetisMenu("#side-menu");
        let matchingMenuItem = null;
        const ul = document.getElementById("side-menu");
        const items = ul.getElementsByTagName("a");
        for (let i = 0; i < items.length; ++i) {
            if (location.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) {
            activateParentDropdown(matchingMenuItem);
        }

    }
    useEffect(() => {
        document.body.setAttribute('data-sidebar', 'dark');
        initMenu();
    }, []);

    return (
        <React.Fragment>
            <div id="sidebar-menu">

                <ul className="metismenu list-unstyled" id="side-menu">
                    <li className="menu-title">Main</li>

                    <li>
                        <Link to="/dashboard" className="waves-effect">
                            <i className="mdi mdi-view-dashboard" />
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/overview" className=" waves-effect">
                            <i className="mdi mdi-eye" />
                            <span>Overview</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/product-analysis" className=" waves-effect">
                            <i className="mdi mdi-google-analytics" />
                            <span>Product Analysis</span>
                        </Link>
                        <Link to="/product-comparison" className=" waves-effect">
                            <i className="mdi mdi-compare" />
                            <span>Product Comparison</span>
                        </Link>

                    </li>
                </ul>
            </div>
        </React.Fragment>
    );
}