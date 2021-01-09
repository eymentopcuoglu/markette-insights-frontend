import moment from "moment";

//If 'current_product_transactions' should be used, 0 flag should be supplied. If 'product_transactions' should be used, 1 flag should be supplied.
export function getMinimumPrice(product, selectedRetailers, flag) {
    let pricing;
    if (flag === 0)
        pricing = product.current_product_transactions;
    else
        pricing = product.product_transactions;
    if (pricing.length === 0) {
        return null
    }

    let temp;
    let isAvailable = false;
    const currentPricing = pricing;

    if (selectedRetailers) {
        //Check whether the item is available in some of the selected retailers
        for (let i = 0; i < currentPricing.length; i++) {
            if (selectedRetailers.some(retailer => retailer.value === parseInt(currentPricing[i].market))) {
                isAvailable = true;
                break;
            }
        }
    }
    if (selectedRetailers && isAvailable) {
        //Filter by selected markets and convert current_product_transactions to have only pricen field
        temp = pricing
            .filter(item => selectedRetailers.some(retailer => retailer.value === parseInt(item.market)))
            .map(item => parseInt(item.pricen));
    } else {
        temp = pricing.map(item => parseInt(item.pricen));
    }
    //Get the index of minimum pricen
    const indexOfMinItem = pricing.findIndex(item => parseInt(item.pricen) === Math.min(...temp));
    if (indexOfMinItem < 0) {
        console.log('THERE IS A PROBLEM!, indexOfMinItem:', indexOfMinItem);
        console.log('product.current_product_transactions: ', product.current_product_transactions);
        console.log('product: ', product.product_info, product.product_id);
        console.log('temp:', temp);
    }
    return {
        minimumPrice: pricing[indexOfMinItem].pricen,
        minimumMarket: pricing[indexOfMinItem].market
    }
}

export function getAveragePrice(product, selectedRetailers, flag) {
    let pricing;
    if (flag === 0)
        pricing = product.current_product_transactions;
    else
        pricing = product.product_transactions;
    if (pricing.length === 0) {
        return null
    }
    let temp;
    let isAvailable = false;
    const currentPricing = pricing;

    if (selectedRetailers) {
        //Check whether the item is available in some of the selected retailers
        for (let i = 0; i < currentPricing.length; i++) {
            if (selectedRetailers.some(retailer => retailer.value === parseInt(currentPricing[i].market))) {
                isAvailable = true;
                break;
            }
        }
    }
    if (selectedRetailers && isAvailable) {
        //Filter by selected markets and convert current_product_transactions to have only pricen field
        temp = pricing
            .filter(item => selectedRetailers.some(retailer => retailer.value === parseInt(item.market)))
            .map(item => parseInt(item.pricen));
    } else {
        temp = pricing.map(item => parseInt(item.pricen));
    }
    const total = temp.reduce((acc, c) => acc + c, 0);
    return (total / temp.length / 100).toFixed(2);
}


export function getMean(products) {
    return products.reduce((acc, product) => (acc += product)) / products.length;
}

export function getStandardDeviation(product, selectedRetailers, flag) {
    let pricing;
    if (flag === 0)
        pricing = product.current_product_transactions;
    else
        pricing = product.product_transactions;
    if (pricing.length === 0) {
        return null
    }
    let temp;
    let isAvailable = false;
    const currentPricing = pricing;

    if (selectedRetailers) {
        //Check whether the item is available in some of the selected retailers
        for (let i = 0; i < currentPricing.length; i++) {
            if (selectedRetailers.some(retailer => retailer.value === parseInt(currentPricing[i].market))) {
                isAvailable = true;
                break;
            }
        }
    }
    if (selectedRetailers && isAvailable) {
        //Filter by selected markets and convert current_product_transactions to have only pricen field
        temp = pricing
            .filter(item => selectedRetailers.some(retailer => retailer.value === parseInt(item.market)))
            .map(item => parseInt(item.pricen));
    } else {
        temp = pricing.map(item => parseInt(item.pricen));
    }

    const mean = getMean(temp);
    return (Math.sqrt(temp.reduce((acc, item) => acc + Math.pow(item - mean, 2), 0) / (temp.length)) / 100).toFixed(2);
}

export function getAvailability(product, markets) {
    const numOfMarkets = product.current_product_transactions.length;
    return ((numOfMarkets / markets.length) * 100).toFixed(2);
}

export function reduceAndGetAverage(products) {
    return products.reduce((allDates, date) => {
        if (allDates.some((e) => moment(e.created_at).format('DD.MM.YYYY') === moment(date.created_at).format('DD.MM.YYYY'))) {
            const filtered = allDates.filter((e) => moment(e.created_at).format('DD.MM.YYYY') === moment(date.created_at).format('DD.MM.YYYY')
            )[0];
            filtered.pricen += +date.pricen;
            filtered.count++;
        } else {
            allDates.push({
                ...date,
                count: 1
            })
        }
        return allDates
    }, [])
        .map(item => ({
            pricen: (item.pricen / (item.count * 100)),
            created_at: item.created_at
        }));
}

export function groupByMonth(products) {
    return products.reduce((allDates, date) => {
        if (allDates.some((e) => moment(e.created_at).format('MM.YYYY') === moment(date.created_at).format('MM.YYYY'))) {
            const filtered = allDates.filter((e) => moment(e.created_at).format('MM.YYYY') === moment(date.created_at).format('MM.YYYY')
            )[0];
            filtered.pricen += +date.pricen;
            filtered.count++;
        } else {
            allDates.push({
                ...date,
                count: 1
            })
        }
        return allDates
    }, [])
        .map(item => ({
            pricen: (item.pricen / (item.count)),
            created_at: item.created_at
        }));
}

export function fillDates(products, startDate, endDate) {
    let counter = 0;
    const theDate = new Date(startDate);
    const last = new Date(endDate);
    last.setDate(last.getDate() + 1);

    while (moment(new Date(theDate)).format('DD.MM.YYYY') !== moment(last).format('DD.MM.YYYY')) {
        const currentItem = products[counter];
        if (!currentItem) {
            products.splice(counter, 0, { pricen: null, market: products[0].market, created_at: new Date(theDate) });
            theDate.setDate(theDate.getDate() + 1);
            counter++;
            continue;
        }
        if (moment(new Date(currentItem.created_at)).format('DD.MM.YYYY') !== moment(new Date(theDate)).format('DD.MM.YYYY')) {
            products.splice(counter, 0, { pricen: null, market: products[0].market, created_at: new Date(theDate) });
        }
        theDate.setDate(theDate.getDate() + 1);
        counter++;
    }
    return products;
}

export function getActivity(pricing) {
    let counter = 0;
    let currentActivityPrice = 0;
    let isInActivity = false;
    let activityLength = 0;
    let activityFrequency = 0;

    for (let i = 1; i < pricing.length; i++) {
        if ((pricing[i].pricen === null) || (pricing[i - 1].pricen === null)) {
            isInActivity = false;
            counter = 0;
            currentActivityPrice = 0;
            continue;
        }
        if (pricing[i].pricen < pricing[i - 1].pricen) {
            currentActivityPrice = pricing[i - 1].pricen;
            isInActivity = true;
            counter++;
        } else if (isInActivity && (pricing[i].pricen === pricing[i - 1].pricen)) {
            counter++;
        } else {
            if (isInActivity && (currentActivityPrice === pricing[i].pricen)) {
                activityLength += counter;
                activityFrequency++;
                isInActivity = false;
                counter = 0;
                currentActivityPrice = 0;
            }
        }
    }

    return {
        activityFrequency: parseFloat(((activityFrequency / pricing.length) * 100).toFixed(2)),
        activityLength: parseFloat(((activityLength / pricing.length) * 100).toFixed(2))
    }
}