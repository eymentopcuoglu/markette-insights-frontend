import ExcelJS from 'exceljs';
import FileSaver from 'file-saver';
import { compareDates } from "./dateUtil";
import { getAveragePrice, getMinimumPrice, getStandardDeviation } from "./pricingUtil";
import { getMarketName } from "./namingUtil";

export const createAndDownloadExcelFile = (data, markets, date, selectedRetailers) => {
    if (!data)
        return [];
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Markette Insights';
    workbook.created = new Date();
    const worksheet = workbook.addWorksheet('Pricing', {
        views: [
            { state: 'frozen', ySplit: 1 }
        ]
    });
    console.log('SELECTED RETAILERS', selectedRetailers);
    worksheet.columns = [
        { header: 'Product Name', key: 'productName', width: 80 },
        { header: 'Minimum Price', key: 'minimumPrice', width: 16 },
        { header: 'Average Price', key: 'averagePrice', width: 14 },
        { header: 'Standard Deviation', key: 'standardDeviation', width: 18 },
        ...selectedRetailers.map(market => ({ header: market.label, key: 'market' + market.value }))
    ];
    const excelData = data.map(product => {
        const productName = product.product_info.name;
        let pricing;
        let minimumPrice, averagePrice, standardDeviation;
        if (compareDates(new Date(), date)) {
            pricing = product.current_product_transactions;
            minimumPrice = getMinimumPrice(product, selectedRetailers, 0);
            averagePrice = getAveragePrice(product, selectedRetailers, 0);
            standardDeviation = getStandardDeviation(product, selectedRetailers, 0);
        } else {
            pricing = product.product_transactions;
            minimumPrice = getMinimumPrice(product, selectedRetailers, 1);
            averagePrice = getAveragePrice(product, selectedRetailers, 1);
            standardDeviation = getStandardDeviation(product, selectedRetailers, 1);
        }
        const serializedPricing = pricing.reduce((obj, item) => ({
            ...obj,
            ['market' + item.market]: (item.pricen / 100)
        }), {});
        return {
            productName,
            minimumPrice: minimumPrice && (minimumPrice.minimumPrice / 100) + ' - ' + getMarketName(minimumPrice.minimumMarket, markets),
            averagePrice: averagePrice && parseFloat(averagePrice),
            standardDeviation: standardDeviation && parseFloat(standardDeviation),
            ...serializedPricing
        }
    });
    worksheet.insertRows(2, excelData);
    workbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        FileSaver.saveAs(blob, 'markette.xlsx');
    });
}