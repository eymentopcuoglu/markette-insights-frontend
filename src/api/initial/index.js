async function initialFetch(clientId, userId) {
    const response = await fetch('http://localhost:8000/application/initial/' + clientId + '/' + userId, {
        method: 'GET',
        credentials: 'include'
    });
    return await response.json();
}

export default {
    initialFetch
}