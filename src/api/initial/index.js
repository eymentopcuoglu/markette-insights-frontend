async function initialFetch(clientId, userId) {
    const response = await fetch('http://api.markette-insights.com/application/initial/' + clientId + '/' + userId, {
        method: 'GET',
        credentials: 'include'
    });
    return await response.json();
}

export default {
    initialFetch
}