import React, { useEffect, useState } from 'react';
import { Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

//Import Components
import SelectWrapper from "../components/SelectWrapper";
import DateWrapper from "../components/DateWrapper";
import LatestTransactions from "../components/Product_Analysis/LatestTransactions";
import CurrentPricing from "../components/Product_Analysis/CurrentPricing";
import ProductDataRange from "../components/Product_Analysis/ProductDataRange";

import actions from "../store/actions";
import ProductActivity from "../components/ProductActivity";
import ProductDescription from "../components/Product_Analysis/ProductDescription";
import moment from "moment";

export default function ProductAnalysis(props) {

    const dispatch = useDispatch();
    const centerClass = 'd-flex justify-content-center align-items-center';

    const { markets, channels, clientProducts } = useSelector(state => state.data);

    const [state, setState] = useState({
        breadcrumbItems: [
            { title: "Markette", link: "#" },
            { title: "Product Analysis", link: "#" }
        ]
    });

    //Select Filters
    const [selectedChannels, setSelectedChannels] = useState(null);
    const [selectedRetailers, setSelectedRetailers] = useState(null);
    const [selectedSKU, setSelectedSKU] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    //Date filters
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    const [activity, setActivity] = useState({ activityFrequency: 0, activityLength: 0 });

    //Date Wrapper change handler
    const onDateChange = dates => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };


    useEffect(() => {
        dispatch(actions.breadcrumb.setBreadcrumbItems("Product Analysis", state.breadcrumbItems));
    }, []);

    //Change selectedProduct based on selectedSKU state
    useEffect(() => {
        setSelectedProduct(selectedSKU ? clientProducts.find(item => item.product_id === selectedSKU.value) : null);
    }, [selectedSKU]);


    useEffect(() => {
        if (selectedChannels && selectedChannels.length !== 0) {
            setSelectedRetailers(markets.filter(market => selectedChannels.some(selectedChannel => selectedChannel.value === market.channel_id))
                .map(item => ({
                    label: item.name,
                    value: item.id
                })));
        }
    }, [selectedChannels]);

    useEffect(() => {
        if (clientProducts.length !== 0 && !selectedSKU) {
            setSelectedSKU({
                label: clientProducts[11].product_info.name,
                value: clientProducts[11].product_id
            });
            const today = new Date();
            const beforeWeek = moment(today).subtract(6, 'day').toDate();
            setEndDate(today);
            setStartDate(beforeWeek);
        }
    }, [clientProducts]);


    return (
        <React.Fragment>

            <Row className={ centerClass }>
                <Col xl='2'>
                    <SelectWrapper title='Products' isSearchable={ true }
                                   data={ clientProducts }
                                   selectedOptions={ selectedSKU }
                                   setSelectedOptions={ setSelectedSKU } />
                </Col>
                <Col xl='2' className={ centerClass }>
                    <SelectWrapper title='Channel' data={ channels } selectedOptions={ selectedChannels }
                                   setSelectedOptions={ setSelectedChannels } />
                </Col>
                <Col xl='2' className={ centerClass }>
                    <SelectWrapper title='Retailer'
                                   data={ (selectedChannels && selectedChannels.length !== 0) ? markets.filter(market => {
                                       for (let i = 0; i < selectedChannels.length; i++) {
                                           if (market.channel_id === selectedChannels[i].value)
                                               return true;
                                       }
                                       return false;
                                   }) : markets } selectedOptions={ selectedRetailers }
                                   setSelectedOptions={ setSelectedRetailers } />
                </Col>
                <Col xl='2' className={ centerClass }>
                    <DateWrapper isDataRange={ true } startDate={ startDate } endDate={ endDate }
                                 onDateChange={ onDateChange } />
                </Col>
            </Row>


            <Row className='center mt-4'>
                <Col xl='6'>
                    <ProductDescription image={ selectedProduct ? selectedProduct.product_info.imageurl : '' }
                                        name={ selectedProduct ? selectedProduct.product_info.name : '' } />
                </Col>
            </Row>

            <Row className='mt-5'>
                <Col xl='6'>
                    <LatestTransactions selectedProduct={ selectedProduct } />
                </Col>
                <Col xl="6">
                    <CurrentPricing selectedProduct={ selectedProduct }
                                    selectedRetailers={ selectedRetailers } />
                </Col>
            </Row>

            <Row className='my-5 h-100'>
                <Col xl='6'>
                    <ProductDataRange selectedProduct={ selectedProduct } setActivity={ setActivity }
                                      startDate={ startDate } endDate={ endDate }
                                      selectedRetailers={ selectedRetailers }
                    />
                </Col>
                <Col xl="6" className='center'>
                    <Col className='m-3'>
                        <ProductActivity title='Activity Frequency' value={ [activity.activityFrequency] } />
                    </Col>
                    <Col className='m-3'>
                        <ProductActivity title='Activity Length' value={ [activity.activityLength] } />
                    </Col>
                </Col>
            </Row>
        </React.Fragment>
    )
}