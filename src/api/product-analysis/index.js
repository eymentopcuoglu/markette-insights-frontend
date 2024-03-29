import { API_URL } from "../constants";

async function productAnalysisFetch(product_id, startDate, endDate) {
    const response = await fetch(API_URL + '/application/product-analysis/' + product_id + '/' + startDate.toISOString() + '/' + endDate.toISOString(), {
        method: 'GET',
        credentials: 'include',
    });
    return await response.json();
}

export default {
    productAnalysisFetch
}