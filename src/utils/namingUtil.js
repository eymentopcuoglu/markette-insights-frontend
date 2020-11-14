export function getMarketName(marketId, markets) {
    const marketName = markets.find(market => market.id === parseInt(marketId));
    if (marketName)
        return marketName.name;
    else
        return 'Could not find the market!';
}

export function getCategoryId(subCategories, subCategoryId) {
    return subCategories.find(subCategory => subCategory.id === subCategoryId).category_id;
}