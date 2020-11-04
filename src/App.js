import React, { useEffect } from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from "react-redux";
import actions from './store/actions/index';

import { authProtectedRoutes, publicRoutes } from "./routes/";
import AppRoute from "./routes/Route";

import Layout from './components/Layout/Layout';
import NonAuthLayout from './components/Layout/NonAuthLayout';

// Import scss
import "./theme.scss";

export default function App(props) {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.auth.user.userCheckRequest());
    }, []);

    return (
        <React.Fragment>
            <Router>
                <Switch>

                    { publicRoutes.map((route, idx) => (
                        <AppRoute
                            path={ route.path }
                            component={ route.component }
                            layout={ NonAuthLayout }
                            key={ idx }
                            isAuthProtected={ false }
                        />
                    )) }

                    { authProtectedRoutes.map((route, idx) => (
                        <AppRoute
                            path={ route.path }
                            component={ route.component }
                            layout={ Layout }
                            key={ idx }
                            isAuthProtected={ true }
                        />
                    )) }

                </Switch>
            </Router>
        </React.Fragment>
    );
}