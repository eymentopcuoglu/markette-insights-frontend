import React from "react";
import { Redirect } from "react-router-dom";

import Login from '../pages/Login';
// import Logout from '../pages/Authentication/Logout';
// import Pagesregister from '../pages/Authentication/Register';
// import ForgetPassword from '../pages/Authentication/ForgetPassword';
// import LockScreen from "../pages/Authentication/pages-lock-screen";

//Dashboard
import Dashboard from '../pages/Dashboard';
import Overview from "../pages/Overview";
import ProductAnalysis from "../pages/ProductAnalysis";
import ProductComparison from "../pages/ProductComparison";
import InsertTracking from "../pages/InsertTracking";

// import Pages404 from "../pages/Extra Pages/pages-404";
// import Pages500 from "../pages/Extra Pages/pages-500";
// import Overview from "../pages/Overview/Overview";
// import ProductAnalysis from "../pages/product-analysis/ProductAnalysis";
// import ProductComparison from "../pages/product-comparison/ProductComparison";

const authProtectedRoutes = [
    { path: "/dashboard", component: Dashboard },
    { path: "/overview", component: Overview },
    { path: '/insert-tracking', component: InsertTracking },
    { path: "/product-analysis", component: ProductAnalysis },
    { path: "/product-comparison", component: ProductComparison },
    { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
];

const publicRoutes = [
    // { path: "/logout", component: Logout },
    { path: "/login", component: Login },
    // { path: "/register", component: Pagesregister },
    // { path: '/forget-password', component: ForgetPassword },
    // { path: '/pages-lock-screen', component: LockScreen },
    // { path: "/pages-404", component: Pages404 },
    // { path: "/pages-500", component: Pages500 },
];

export { authProtectedRoutes, publicRoutes };
