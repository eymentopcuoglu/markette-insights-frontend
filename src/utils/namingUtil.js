export function getMarketName(marketId, markets) {
    return markets.find(market => market.id === marketId).name;
}

export function getCategoryId(subCategories, subCategoryId) {
    return subCategories.find(subCategory => subCategory.id === subCategoryId).category_id;
}