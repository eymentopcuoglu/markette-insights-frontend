async function productAnalysisFetch(product_id, startDate, endDate) {
    const response = await fetch('https://api.markette-insights.com/product-analysis/' + product_id + '/' + startDate.toISOString() + '/' + endDate.toISOString(), {
        method: 'GET',
        credentials: 'include',
    });
    return await response.json();
}

export default {
    productAnalysisFetch
}