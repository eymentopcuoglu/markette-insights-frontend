import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import errorReducer from "./auth/errorReducer";
import breadcrumbReducer from './breadcrumb/index';
import layoutReducer from "./layout/index";
import dataReducer from './data/index';
import filterReducer from "./filter/index";

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    breadcrumb: breadcrumbReducer,
    layout: layoutReducer,
    data: dataReducer,
    filter: filterReducer
});