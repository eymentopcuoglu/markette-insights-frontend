import { all, call, fork, takeEvery } from "redux-saga/effects";

import {
    CHANGE_SIDEBAR_TYPE,
} from "../../actionTypes";

//for set attribute according to layout types and sidebar types
function changeBodyAttribute(attribute, value) {
    if (document.body) document.body.setAttribute(attribute, value);
    return true;
}

// commom function for managing body class
function manageBodyClass(cssClass, action = "toggle") {
    switch (action) {
        case "add":
            if (document.body) document.body.classList.add(cssClass);
            break;
        case "remove":
            if (document.body) document.body.classList.remove(cssClass);
            break;
        default:
            if (document.body) document.body.classList.toggle(cssClass);
            break;
    }

    return true;
}

//for change sidebar type
function* changeLeftSidebarType({ payload: { sidebarType, isMobile } }) {
    try {
        switch (sidebarType) {
            case "compact":
                yield call(manageBodyClass, "sidebar-enable", "add");
                if (!isMobile) {
                    yield call(changeBodyAttribute, "data-sidebar-size", "small");
                    yield call(manageBodyClass, "sidebar-enable", "remove");
                    yield call(manageBodyClass, "vertical-collpsed", "remove");
                }
                break;
            case "icon":
                yield call(changeBodyAttribute, "data-keep-enlarged", "true");
                yield call(manageBodyClass, "vertical-collpsed", "add");
                break;
            case "condensed":
                yield call(manageBodyClass, "sidebar-enable", "add");
                if (!isMobile) yield call(manageBodyClass, "vertical-collpsed", "add");
                break;
            default:
                yield call(changeBodyAttribute, "data-sidebar-size", "");
                yield call(manageBodyClass, "sidebar-enable", "remove");
                if (!isMobile) yield call(manageBodyClass, "vertical-collpsed", "remove");
                break;
        }
    } catch (error) {
    }
}

export function* watchChangeLeftSidebarType() {
    yield takeEvery(CHANGE_SIDEBAR_TYPE, changeLeftSidebarType);
}

function* layoutSaga() {
    yield all([
        fork(watchChangeLeftSidebarType),
    ]);
}

export default layoutSaga;