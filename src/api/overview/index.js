async function fetchPricingWithDate(clientId, date) {
    const response = await fetch('http://localhost:8000/application/overview?client=' + clientId + '&date=' + date.toISOString(), {
        method: 'GET',
        credentials: 'include',
    });
    return await response.json();
}

export default {
    fetchPricingWithDate
}