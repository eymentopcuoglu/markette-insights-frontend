import { API_URL } from "../constants";

async function productComparisonFetch(firstProduct, secondProduct, retailers) {
    let url = API_URL + '/product-comparison?firstProduct=' + firstProduct + '&secondProduct=' + secondProduct;
    if (retailers && retailers.length !== 0)
        url = url + '&retailers=' + retailers.join();
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
    });
    return await response.json();
}

export default {
    productComparisonFetch
}