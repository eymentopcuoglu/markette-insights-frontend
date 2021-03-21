import React from 'react';
import { Card, CardBody } from "reactstrap";

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default function MarketteNewsFeed() {
    return (
        <Card className='dashboard-components'>
            <CardBody>
                <h4 className="card-title mb-4">Markette News Feed</h4>
                <PerfectScrollbar>
                    <ol className="activity-feed mb-0">
                        <li className="feed-item">
                            <div className="feed-item-list">
                                <span className="date">Feb 27</span>
                                <span className="activity-text">Version 0.7.0 is out!</span>
                            </div>
                        </li>
                        <li className="feed-item">
                            <div className="feed-item-list">
                                <span className="date">Feb 14</span>
                                <span className="activity-text">Version 0.6.0 is out!</span>
                            </div>
                        </li>
                        <li className="feed-item">
                            <div className="feed-item-list">
                                <span className="date">Nov 4</span>
                                <span className="activity-text">Version 0.1.0 is out!</span>
                            </div>
                        </li>
                    </ol>
                </PerfectScrollbar>
            </CardBody>
        </Card>
    );
}