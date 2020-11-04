import { SET_FILTERS } from "../../actionTypes";

const initialState = {
    category: null,
    subCategory: null,
    brand: null,
    subBrand: null,
    channel: null,
    retailer: null,
    size: null,
    sku: null
}

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILTERS:
            return { ...state, ...action.payload }
        default:
            return { ...state };
    }
}

export default filterReducer;