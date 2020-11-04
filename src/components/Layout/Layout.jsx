import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from "reactstrap";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Breadcrumb from "./Breadcrumb";
import { useSelector } from "react-redux";

export default function Layout(props) {

    const location = useLocation();
    const loading1 = useSelector(state => state.auth.isLoading);
    const loading2 = useSelector(state => state.data.isLoading);

    const capitalizeFirstLetter = string => {
        return string.charAt(1).toUpperCase() + string.slice(2);
    };

    //Loading Screen
    useEffect(() => {
        if (loading1 || loading2) {
            document.getElementById('preloader').style.display = "block";
            document.getElementById('status').style.display = "block";
        } else {
            document.getElementById('preloader').style.display = "none";
            document.getElementById('status').style.display = "none";
        }
    });


    useEffect(() => {
        window.scrollTo(0, 0);
        let currentage = capitalizeFirstLetter(location.pathname);

        document.title =
            currentage + " | Markette";

    }, []);

    return (
        <React.Fragment>
            <div id="preloader">
                <div id="status">
                    <div className="spinner-chase">
                        <div className="chase-dot" />
                        <div className="chase-dot" />
                        <div className="chase-dot" />
                        <div className="chase-dot" />
                        <div className="chase-dot" />
                        <div className="chase-dot" />
                    </div>
                </div>
            </div>
            <div id="layout-wrapper">
                <Topbar />
                <Navbar />
                <div className="main-content">
                    <div className="page-content">
                        <Container fluid>
                            <Breadcrumb />
                            { props.children }
                            <Footer />
                        </Container>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}