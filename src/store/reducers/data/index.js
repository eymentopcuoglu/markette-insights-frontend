import {
    DATA_FETCH_REQUEST,
    DATA_FETCH_SUCCESS,
    DATA_FETCH_ERROR,
    PRODUCT_ANALYSIS_DATA_FETCH_REQUEST,
    PRODUCT_ANALYSIS_DATA_FETCH_ERROR,
    PRODUCT_ANALYSIS_DATA_FETCH_SUCCESS,
} from "../../actionTypes";

const initialState = {
    isLoading: false,
    numberOfProducts: 0,
    numberOfRetailers: 0,
    averageStandardDeviation: 0,
    userProducts: [],
    userFilters: [],
    clientProducts: [],
    error: null,
    categories: [],
    subCategories: [],
    brands: [],
    subBrands: [],
    channels: [],
    markets: [],
    client: { id: null, name: null, image: null },
    productAnalysisDateRangeChartData: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case DATA_FETCH_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case DATA_FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categories: [...action.payload.categories],
                subCategories: [...action.payload.subCategories],
                brands: [...action.payload.brands],
                subBrands: [...action.payload.subBrands],
                channels: [...action.payload.channels],
                markets: [...action.payload.markets],
                client: { ...action.payload.client },
                numberOfProducts: action.payload.numberOfProducts,
                numberOfRetailers: action.payload.numberOfRetailers,
                averageStandardDeviation: action.payload.averageStandardDeviation,
                clientProducts: [...action.payload.clientProducts],
                userProducts: [...action.payload.userProducts],
                userFilters: [action.payload.userFilters]
            };
        case PRODUCT_ANALYSIS_DATA_FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                productAnalysisDateRangeChartData: [...action.payload],
            };
        case DATA_FETCH_ERROR:
        case PRODUCT_ANALYSIS_DATA_FETCH_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state;
    }
}