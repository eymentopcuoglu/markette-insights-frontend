export default async function check() {
    const response = await fetch('http://localhost:8000/users/check', {
        method: 'GET',
        credentials: 'include'
    });
    return await response.json();
}