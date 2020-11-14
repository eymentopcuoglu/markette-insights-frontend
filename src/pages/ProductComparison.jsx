import React, { useEffect, useState } from 'react';
import { Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import actions from "../store/actions/index";

//Import Components
import DateWrapper from "../components/DateWrapper";
import ProductDescription from "../components/Product_Analysis/ProductDescription";
import SelectWrapper from "../components/SelectWrapper";
import ProductActivity from "../components/ProductActivity";
import ChartDescription from "../components/Product_Comparison/ChartDescription";
import MinimumPrice from "../components/Product_Comparison/MinimumPrice";
import CurrentPricingComparison from "../components/Product_Comparison/CurrentPricingComparison";
import DateRangeComparison from "../components/Product_Comparison/DateRangeComparison";

import { getAvailability, getMinimumPrice } from "../utils/pricingUtil";
import { getMarketName } from "../utils/namingUtil";
import YTDPricingComparison from "../components/Product_Comparison/YTDPricingComparison";
import DateRangeParityComparison from "../components/Product_Comparison/DateRangeParityComparison";
import moment from "moment";
import DateRangeComparisonChart from "../components/charts/DateRangeComparisonChart";

export default function ProductComparison(props) {

    const { markets, channels, clientProducts } = useSelector(state => state.data);
    const dispatch = useDispatch();

    const [selectedChannels, setSelectedChannels] = useState(null);
    const [selectedRetailers, setSelectedRetailers] = useState(null);
    const [selectedSKU1, setSelectedSKU1] = useState(null);
    const [selectedProduct1, setSelectedProduct1] = useState(null);
    const [selectedSKU2, setSelectedSKU2] = useState(null);
    const [selectedProduct2, setSelectedProduct2] = useState(null);
    const [state, setState] = useState({
        breadcrumbItems: [
            { title: "Markette", link: "#" },
            { title: "Product Comparison", link: "#" }
        ]
    });

    //Date filters
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    const [activity1, setActivity1] = useState({ activityFrequency: 0, activityLength: 0 });
    const [activity2, setActivity2] = useState({ activityFrequency: 0, activityLength: 0 });

    //Date Wrapper change handler
    const onDateChange = dates => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    useEffect(() => {
        dispatch(actions.breadcrumb.setBreadcrumbItems("Product Comparison", state.breadcrumbItems));
    }, []);


    useEffect(() => {
        if (selectedChannels && selectedChannels.length !== 0) {
            setSelectedRetailers(markets.filter(market => selectedChannels.some(selectedChannel => selectedChannel.value === market.channel_id))
                .map(item => ({
                    label: item.name,
                    value: item.id
                })));
        }
    }, [selectedChannels]);

    //Change selectedProduct based on selectedSKU state
    useEffect(() => {
        if (selectedSKU1) {
            const product = clientProducts.find(item => item.product_id === selectedSKU1.value);
            if (product.current_product_transactions.length === 0) {
                setSelectedProduct1({
                    ...selectedProduct1, ...product,
                    minimumMarket: '',
                    minimumPrice: '',
                    availability: 0
                });
            } else {
                const minimumPricing = getMinimumPrice(product);
                const minimumPrice = (minimumPricing.minimumPrice / 100) + '₺';
                const minimumMarket = getMarketName(minimumPricing.minimumMarket, markets);
                const availability = getAvailability(product, markets);
                setSelectedProduct1({
                    ...selectedProduct1, ...product,
                    minimumMarket,
                    minimumPrice,
                    availability
                });
            }
        }
    }, [selectedSKU1]);

    //Change selectedProduct based on selectedSKU state
    useEffect(() => {
        if (selectedSKU2) {
            const product = clientProducts.find(item => item.product_id === selectedSKU2.value);
            if (product.current_product_transactions.length === 0) {
                setSelectedProduct2({
                    ...selectedProduct2, ...product,
                    minimumMarket: '',
                    minimumPrice: '',
                    availability: 0
                });
            } else {
                const minimumPricing = getMinimumPrice(product);
                const minimumPrice = (minimumPricing.minimumPrice / 100) + '₺';
                const minimumMarket = getMarketName(minimumPricing.minimumMarket, markets);
                const availability = getAvailability(product, markets);
                setSelectedProduct2({
                    ...selectedProduct2, ...product,
                    minimumMarket,
                    minimumPrice,
                    availability
                });
            }
        }
    }, [selectedSKU2]);


    useEffect(() => {
        if (clientProducts.length !== 0 && !selectedSKU1 && !selectedSKU2) {
            setSelectedSKU1({
                label: clientProducts[0].product_info.name,
                value: clientProducts[0].product_id
            });
            setSelectedSKU2({
                label: clientProducts[1].product_info.name,
                value: clientProducts[1].product_id
            });
            const today = new Date();
            const beforeWeek = moment(today).subtract(6, 'day').toDate();
            setEndDate(today);
            setStartDate(beforeWeek);
        }
    }, [clientProducts]);

    return (
        <>
            <Row className='center'>
                <Col xl='2' className='center'>
                    <SelectWrapper title='Channel' data={ channels } selectedOptions={ selectedChannels }
                                   setSelectedOptions={ setSelectedChannels } />
                </Col>
                <Col xl='2' className='center'>
                    <SelectWrapper title='Retailer' data={ (selectedChannels && selectedChannels.length !== 0)  ? markets.filter(market => {
                        for (let i = 0; i < selectedChannels.length; i++) {
                            if (market.channel_id === selectedChannels[i].value)
                                return true;
                        }
                        return false;
                    }) : markets } selectedOptions={ selectedRetailers }
                                   setSelectedOptions={ setSelectedRetailers } />
                </Col>
                <Col xl='2' className='center'>
                    <DateWrapper isDataRange={ true } startDate={ startDate } endDate={ endDate }
                                 onDateChange={ onDateChange } />
                </Col>
            </Row>

            <Row className='center mt-4 product-comparison-sticky'>
                <Col xl='5'>
                    <ProductDescription image={ selectedProduct1 ? selectedProduct1.product_info.imageurl : '' }
                                        name={ selectedProduct1 ? selectedProduct1.product_info.name : '' }
                                        selectTitle='Product 1'
                                        isInComparison={ true }
                                        data={ clientProducts }
                                        selectedOptions={ selectedSKU1 }
                                        setSelectedOptions={ setSelectedSKU1 } />
                </Col>
                <Col xl='1' className='center'>
                    <i className="mdi mdi-48px mdi-sword-cross" />
                </Col>
                <Col xl='5'>
                    <ProductDescription image={ selectedProduct2 ? selectedProduct2.product_info.imageurl : '' }
                                        name={ selectedProduct2 ? selectedProduct2.product_info.name : '' }
                                        selectTitle='Product 2'
                                        isInComparison={ true }
                                        data={ clientProducts }
                                        selectedOptions={ selectedSKU2 }
                                        setSelectedOptions={ setSelectedSKU2 } />
                </Col>
            </Row>

            <Row className='center my-5 h-100'>
                <Col xl='3'>
                    <MinimumPrice icon='mdi-tag-text-outline' title='Minimum Price'
                                  value={ selectedProduct1 ? selectedProduct1.minimumMarket + ' - ' +
                                      selectedProduct1.minimumPrice : 'Please select a product' } />
                </Col>
                <Col xl='2' className="text-center">
                    <ProductActivity title='Availability'
                                     value={ selectedProduct1 ? [selectedProduct1.availability] : [0] } />
                </Col>
                <Col xl='1' />
                <Col xl='3'>
                    <MinimumPrice icon='mdi-tag-text-outline' title='Minimum Price'
                                  value={ selectedProduct2 ? selectedProduct2.minimumMarket + ' - ' +
                                      selectedProduct2.minimumPrice : 'Please select a product' } />
                </Col>
                <Col xl='2' className="text-center">
                    <ProductActivity title='Availability'
                                     value={ selectedProduct2 ? [selectedProduct2.availability] : [0] } />
                </Col>
            </Row>

            <Row className='d-flex align-items-center justify-content-around my-5 h-100'>
                <Col lg={ 5 }>
                    <CurrentPricingComparison selectedProduct1={ selectedProduct1 }
                                              selectedProduct2={ selectedProduct2 }
                                              selectedRetailers={ selectedRetailers }/>
                </Col>
                <Col lg={ 5 }>
                    <ChartDescription />
                </Col>
            </Row>

            <Row className='d-flex align-items-center justify-content-around my-5 h-100'>
                <Col lg={ 5 }>
                    <DateRangeComparison selectedProduct1={ selectedProduct1 }
                                         selectedProduct2={ selectedProduct2 }
                                         selectedRetailers={ selectedRetailers }
                                         setActivity1={ setActivity1 }
                                         setActivity2={ setActivity2 }
                                         startDate={ startDate }
                                         endDate={ endDate } />
                </Col>
                <Col lg={ 5 }>
                    <ChartDescription />
                </Col>
            </Row>

            <Row className='d-flex align-items-center justify-content-around my-5 h-100'>
                <Col lg={ 5 }>
                    <YTDPricingComparison selectedProduct1={ selectedProduct1 }
                                          selectedProduct2={ selectedProduct2 }
                                          selectedRetailers={ selectedRetailers }/>
                </Col>
                <Col lg={ 5 }>
                    <ChartDescription />
                </Col>
            </Row>

            <Row className='d-flex align-items-center justify-content-around my-5 h-100'>
                <Col lg={ 5 }>
                    <DateRangeParityComparison selectedProduct1={ selectedProduct1 }
                                               selectedProduct2={ selectedProduct2 }
                                               selectedRetailers={ selectedRetailers }
                                               startDate={ startDate }
                                               endDate={ endDate } />
                </Col>
                <Col lg={ 5 }>
                    <ChartDescription />
                </Col>
            </Row>

            <Row className='d-flex align-items-center justify-content-around my-5 h-100'>
                <Col lg='2'>
                    <ProductActivity title='Activity Frequency' value={ [activity1.activityFrequency] } />
                </Col>
                <Col lg='5'>
                    <ChartDescription />
                </Col>
                <Col lg='2'>
                    <ProductActivity title='Activity Frequency' value={ [activity2.activityFrequency] } />
                </Col>
            </Row>
        </>
    )
}