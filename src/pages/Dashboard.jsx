import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "reactstrap";

import actions from "../store/actions/index";

import MiniCard from "../components/MiniCard";
import NewsFeed from "../components/Dashboard/NewsFeed";
import ProductsWeekly from "../components/Dashboard/ProductsWeekly";
import MarketteNewsFeed from "../components/Dashboard/MarketteNewsFeed";
import MarketAvailability from "../components/Overview/MarketAvailability";
import SavedFilters from "../components/Overview/SavedFilters";
import LastViewedProducts from "../components/Overview/LastViewedProducts";

export default function Dashboard(props) {

    const dispatch = useDispatch();
    const { numberOfProducts, numberOfRetailers, averageStandardDeviation, markets } = useSelector(state => state.data);

    const [state, setState] = useState({
        breadcrumbItems: [
            { title: "Markette", link: "#" },
            { title: "Dashboard", link: "#" }
        ]
    });

    useEffect(() => {
        dispatch(actions.breadcrumb.setBreadcrumbItems("Dashboard", state.breadcrumbItems));
    }, []);


    return (
        <React.Fragment>
            <Row>
                <MiniCard icon='mdi-cube-outline' title='Number of Products' value={ numberOfProducts } />
                <MiniCard icon='mdi-buffer' title='Number of Retailers' value={ numberOfRetailers } />
                <MiniCard icon='mdi-tag-text-outline' title='Price Standard Deviation'
                          value={ averageStandardDeviation } />
                <MiniCard icon='mdi-briefcase-check' title='Availability'
                          value={ ((numberOfRetailers / markets.length) * 100).toFixed(2) + '%' } />
            </Row>
            <Row className='mb-4'>
                <Col xl="3">
                    <NewsFeed />
                </Col>
                <Col lg="6">
                    <ProductsWeekly />
                </Col>
                <Col xl="3">
                    <MarketteNewsFeed />
                </Col>
            </Row>

            <Row className='mb-5'>
                <Col>
                    <Row>
                        <Col>
                            <MarketAvailability />
                        </Col>
                    </Row>
                    <Row>
                        <Col className='d-flex justify-content-center'>
                            {/*<Insert />*/ }
                        </Col></Row>
                </Col>
                <Col>
                    <SavedFilters />
                </Col>
                <Col>
                    <LastViewedProducts />
                </Col>
            </Row>
        </React.Fragment>
    );
}