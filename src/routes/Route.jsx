import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


const AppRoute = ({
                      component: Component,
                      isAuthProtected,
                      layout: Layout,
                      ...rest
                  }) => {
    const { isAuthenticated } = useSelector(state => state.auth);
    const location = useLocation();
    return (
        <Route
            { ...rest }
            render={ props => {
                if (isAuthProtected && !isAuthenticated) {
                    return (
                        <Redirect to={ { pathname: "/login", state: { from: location } } } exact />
                    );
                } else {
                    if (!isAuthProtected && isAuthenticated) return (
                        <Redirect to={ { pathname: "/dashboard", state: { from: location } } } exact />);
                    else
                        return (
                            <Layout>
                                <Component { ...props } />
                            </Layout>
                        );
                }

            } }
        />
    );
}

export default AppRoute;

