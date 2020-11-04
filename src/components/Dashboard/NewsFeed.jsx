import { Alert, Card, CardBody } from "reactstrap";
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default function NewsFeed() {
    const { clientProducts, markets } = useSelector(state => state.data);
    return (
        <Card className='dashboard-components overflow-hidden'>
            <PerfectScrollbar>
                <CardBody>
                    <h4 className="card-title">News Feed</h4>
                    <p className="card-title-desc"> You can find out the news about the retailers and their products</p>
                    { clientProducts && markets ? clientProducts.map(item => {
                        return item.logs.filter(log => moment(log.created_at).format('DD.MM.YYYY') === moment(new Date()).format('DD.MM.YYYY'))
                            .map((log, key) => {
                                const lastPrice = parseInt(log.pricen1) / 100;
                                const firstPrice = parseInt(log.pricen2) / 100;
                                const market = markets[parseInt(log.market) - 1].name;
                                if (firstPrice > lastPrice)
                                    return <Alert key={ key } color="danger">
                                        { item.product_info.name } - { firstPrice }₺ -> { lastPrice }₺ ({ market })
                                    </Alert>
                                else
                                    return <Alert key={ key } color="success">
                                        { item.product_info.name } - { firstPrice }₺ -> { lastPrice }₺ ({ market })
                                    </Alert>
                            });
                    }) : null }
                </CardBody>
            </PerfectScrollbar>
        </Card>
    );
}