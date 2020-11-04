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
import { getMarket } from "../utils/namingUtil";
import YTDPricingComparison from "../components/Product_Comparison/YTDPricingComparison";
import DateRangeParityComparison from "../components/Product_Comparison/DateRangeParityComparison";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";


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

    //Date Wrapper change handler
    const onDateChange = dates => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    useEffect(() => {
        dispatch(actions.breadcrumb.setBreadcrumbItems("Product Comparison", state.breadcrumbItems));
    }, []);

    //Change selectedProduct based on selectedSKU state
    useEffect(() => {
        if (selectedSKU1) {
            const product = clientProducts.find(item => item.product_id === selectedSKU1.value);
            const minimumPricing = getMinimumPrice(product);
            const minimumPrice = (minimumPricing.minimumPrice / 100) + '₺';
            const minimumMarket = getMarket(minimumPricing.minimumMarket, markets);
            const availability = getAvailability(product, markets);
            setSelectedProduct1({
                ...selectedProduct1, ...product,
                minimumMarket,
                minimumPrice,
                availability
            });
        }
    }, [selectedSKU1]);

    //Change selectedProduct based on selectedSKU state
    useEffect(() => {
        if (selectedSKU2) {
            const product = clientProducts.find(item => item.product_id === selectedSKU2.value);
            const minimumPricing = getMinimumPrice(product);
            const minimumPrice = (minimumPricing.minimumPrice / 100) + '₺';
            const minimumMarket = getMarket(minimumPricing.minimumMarket, markets);
            const availability = getAvailability(product, markets);
            setSelectedProduct2({
                ...selectedProduct2, ...product,
                minimumMarket,
                minimumPrice,
                availability
            });
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

    const vh50 = {
        height: '50vh'
    };
    
    return (
        <>
            <Row className='center'>
                <Col xl='2' className='center'>
                    <SelectWrapper title='Channel' data={ channels } selectedOptions={ selectedChannels }
                                   setSelectedOptions={ setSelectedChannels } />
                </Col>
                <Col xl='2' className='center'>
                    <SelectWrapper title='Retailer' data={ selectedChannels ? markets.filter(market => {
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

            <Row className='center mt-4'>
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

            <PerfectScrollbar>
                <div style={ vh50 }>
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
                                                      selectedProduct2={ selectedProduct2 } />
                        </Col>
                        <Col lg={ 5 }>
                            <ChartDescription />
                        </Col>
                    </Row>

                    <Row className='d-flex align-items-center justify-content-around my-5 h-100'>
                        <Col lg={ 5 }>
                            <DateRangeComparison selectedProduct1={ selectedProduct1 }
                                                 selectedProduct2={ selectedProduct2 }
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
                                                  selectedProduct2={ selectedProduct2 } />
                        </Col>
                        <Col lg={ 5 }>
                            <ChartDescription />
                        </Col>
                    </Row>

                    <Row className='d-flex align-items-center justify-content-around my-5 h-100'>
                        <Col lg={ 5 }>
                            <DateRangeParityComparison selectedProduct1={ selectedProduct1 }
                                                       selectedProduct2={ selectedProduct2 }
                                                       startDate={ startDate }
                                                       endDate={ endDate } />
                        </Col>
                        <Col lg={ 5 }>
                            <ChartDescription />
                        </Col>
                    </Row>

                    <Row className='d-flex align-items-center justify-content-around my-5 h-100'>
                        <Col lg="5" className='center'>
                            <Row className='center'>
                                <Col className='m-5'>
                                    <ProductActivity title='Activity Frequency' value={ [25] } />
                                </Col>
                                <Col className='m-5'>
                                    <ProductActivity title='Activity Frequency' value={ [25] } />
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={ 5 }>
                            <ChartDescription />
                        </Col>
                    </Row>
                </div>
            </PerfectScrollbar>
        </>
    )
}