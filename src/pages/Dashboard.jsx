import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "reactstrap";

import actions from "../store/actions/index";

import MiniCard from "../components/MiniCard";
import NewsFeed from "../components/Dashboard/NewsFeed";
import ProductsWeekly from "../components/Dashboard/ProductsWeekly";
import MarketteNewsFeed from "../components/Dashboard/MarketteNewsFeed";
import MarketAvailability from "../components/Dashboard/MarketAvailability";
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
                <Col xs={ 12 } md={ 6 } xl={ 3 } className='order-xl-0'>
                    <NewsFeed />
                </Col>
                <Col xs={ 12 } md={ 12 } xl={ 6 } className='order-sm-first order-xl-1'>
                    <ProductsWeekly />
                </Col>
                <Col xs={ 12 } md={ 6 } xl={ 3 } className='order-xl-2'>
                    <MarketteNewsFeed />
                </Col>
            </Row>

            <Row className='mb-5'>
                <Col xs={ 12 } md={ 6 } xl={ 4 } className='mb-5'>
                    <MarketAvailability />
                </Col>
                <Col xs={ 12 } md={ 6 } xl={ 4 } className='mb-5'>
                    <SavedFilters />
                </Col>
                <Col xs={ 12 } md={ 12 } xl={ 4 } className='mb-5'>
                    <LastViewedProducts />
                </Col>
            </Row>
        </React.Fragment>
    );
}