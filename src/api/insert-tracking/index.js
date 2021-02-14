async function insertTrackingFetch(startDate, endDate, channels, retailers, suppliers, categories, brands) {
    let url = 'https://api.markette-insights.com/application/insert-tracking?startDate=' + startDate.toISOString() + '&endDate=' + endDate.toISOString();
    if (channels && channels.length !== 0)
        url = url + '&channels=' + channels.join();
    if (retailers && retailers.length !== 0)
        url = url + '&retailers=' + retailers.join();
    if (suppliers && suppliers.length !== 0)
        url = url + '&suppliers=' + suppliers.join();
    if (categories && categories.length !== 0)
        url = url + '&categories=' + categories.join();
    if (brands && brands.length !== 0)
        url = url + '&brands=' + brands.join();
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
    });
    return await response.json();
}

export default {
    insertTrackingFetch
}