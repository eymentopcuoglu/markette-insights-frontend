import moment from "moment";

export function getMinimumPrice(product, selectedRetailers) {
    if (product.current_product_transactions.length === 0) {
        return null
    }

    let temp;
    let isAvailable = false;
    const currentPricing = product.current_product_transactions;

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
        temp = product.current_product_transactions
            .filter(item => selectedRetailers.some(retailer => retailer.value === parseInt(item.market)))
            .map(item => parseInt(item.pricen));
    } else {
        temp = product.current_product_transactions.map(item => parseInt(item.pricen));
    }
    //Get the index of minimum pricen
    const indexOfMinItem = product.current_product_transactions.findIndex(item => parseInt(item.pricen) === Math.min(...temp));
    if (indexOfMinItem < 0) {
        console.log('THERE IS A PROBLEM!, indexOfMinItem:', indexOfMinItem);
        console.log('product.current_product_transactions: ', product.current_product_transactions);
        console.log('product: ', product.product_info, product.product_id);
        console.log('temp:', temp);
    }
    return {
        minimumPrice: product.current_product_transactions[indexOfMinItem].pricen,
        minimumMarket: product.current_product_transactions[indexOfMinItem].market
    }
}

export function getAveragePrice(product, selectedRetailers) {
    if (product.current_product_transactions.length === 0) {
        return null
    }
    let temp;
    let isAvailable = false;
    const currentPricing = product.current_product_transactions;

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
        temp = product.current_product_transactions
            .filter(item => selectedRetailers.some(retailer => retailer.value === parseInt(item.market)))
            .map(item => parseInt(item.pricen));
    } else {
        temp = product.current_product_transactions.map(item => parseInt(item.pricen));
    }
    const total = temp.reduce((acc, c) => acc + c, 0);
    return (total / temp.length / 100).toFixed(2);
}


export function getMean(products) {
    return products.reduce((acc, product) => (acc += product)) / products.length;
}

export function getStandardDeviation(product, selectedRetailers) {
    if (product.current_product_transactions.length === 0) {
        return null
    }
    let temp;
    let isAvailable = false;
    const currentPricing = product.current_product_transactions;

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
        temp = product.current_product_transactions
            .filter(item => selectedRetailers.some(retailer => retailer.value === parseInt(item.market)))
            .map(item => parseInt(item.pricen));
    } else {
        temp = product.current_product_transactions.map(item => parseInt(item.pricen));
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