export default async function check() {
    const response = await fetch('http://api.markette-insights.com/users/check', {
        method: 'GET',
        credentials: 'include'
    });
    return await response.json();
}