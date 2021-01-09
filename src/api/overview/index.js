async function fetchPricingWithDate(clientId, date) {
    const response = await fetch('https://api.markette-insights.com/application/overview?client=' + clientId + '&date=' + date.toISOString(), {
        method: 'GET',
        credentials: 'include',
    });
    return await response.json();
}

export default {
    fetchPricingWithDate
}