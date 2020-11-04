import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import actions from "../store/actions/index";
import { getMinimumPrice, getAveragePrice, getStandardDeviation } from '../utils/pricingUtil';

//Import Components
import MiniCard from '../components/MiniCard';
import DateWrapper from "../components/DateWrapper";
import SelectWrapper from "../components/SelectWrapper";
import SearchBar from "../components/SearchBar";
import ProductRow from "../components/Overview/ProductRow";

export default function Overview(props) {

    function getCategory(subCategory) {
        return subCategories[subCategory - 1].category_id;
    }

    const dispatch = useDispatch();
    const centerClass = 'd-flex justify-content-center align-items-center';
    const { numberOfProducts, numberOfRetailers, averageStandardDeviation, categories, subCategories, brands, subBrands, markets, channels, clientProducts } = useSelector(state => state.data);

    //Select filters
    const [selectedCategories, setSelectedCategories] = useState(null);
    const [selectedBrands, setSelectedBrands] = useState(null);
    const [selectedChannels, setSelectedChannels] = useState(null);
    const [selectedSizes, setSelectedSizes] = useState(null);
    const [selectedSubCategories, setSelectedSubCategories] = useState(null);
    const [selectedSubBrands, setSelectedSubBrands] = useState(null);
    const [selectedRetailers, setSelectedRetailers] = useState(null);
    const [selectedSKUs, setSelectedSKUs] = useState(null);

    //Date Filter
    const [date, setDate] = useState(new Date());

    //Search Filter
    const [search, setSearch] = useState('');

    const [state, setState] = useState({
        breadcrumbItems: [
            { title: "Markette", link: "#" },
            { title: "Overview", link: "#" }
        ]
    });

    const handleSearchBar = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        dispatch(actions.breadcrumb.setBreadcrumbItems("Overview", state.breadcrumbItems));
    }, []);

    useEffect(() => {
        if (markets && clientProducts) {
            const data = markets.filter(market => {
                return clientProducts.some(product => product.current_product_transactions.some(item => parseInt(item.market) === market.id));
            }).map(item => ({
                label: item.name,
                value: item.id
            }));
            setSelectedRetailers(data);
        }
    }, [markets, selectedCategories, selectedBrands, selectedChannels, selectedSizes, selectedSubCategories, selectedSubBrands, selectedSKUs]);

    return (
        <React.Fragment>

            <Row>
                <MiniCard icon='mdi-cube-outline' title='Number of Products' value={ numberOfProducts } />
                <MiniCard icon='mdi-buffer' title='Number of Retailers' value={ numberOfRetailers } />
                <MiniCard icon='mdi-tag-text-outline' title='Price Standard Deviation'
                          value={ averageStandardDeviation } />
                <MiniCard icon='mdi-briefcase-check' title='Availability'
                          value={ ((numberOfRetailers / markets.length) * 100).toFixed(2) + '%' } />
            </Row>

            <Row className='d-flex align-items-center'>
                <Col xl='3' className={ centerClass }>
                    {/*<DateWrapper isDataRange={ false } startDate={ date } onDateChange={ setDate } />*/ }
                </Col>
                <Col className={ centerClass }>
                    <SelectWrapper title='Category' data={ categories } selectedOptions={ selectedCategories }
                                   setSelectedOptions={ setSelectedCategories } />
                </Col>
                <Col className={ centerClass }>
                    <SelectWrapper title='Brand' data={ brands } selectedOptions={ selectedBrands }
                                   setSelectedOptions={ setSelectedBrands } />
                </Col>
                <Col className={ centerClass }>
                    <SelectWrapper title='Channel' data={ channels } selectedOptions={ selectedChannels }
                                   setSelectedOptions={ setSelectedChannels } />
                </Col>
                <Col className={ centerClass }>
                    <SelectWrapper title='Size' data={ [{ name: 'AVAILABLE VERY SOON!' }] }
                                   selectedOptions={ selectedSizes } setSelectedOptions={ setSelectedSizes } />
                </Col>
            </Row>


            <Row className='d-flex align-items-center'>
                <Col xl='3'>
                    <SearchBar value={ search } handleChange={ handleSearchBar } />
                </Col>
                <Col className={ centerClass }>
                    <SelectWrapper title='Sub Category'
                                   data={ selectedCategories ? subCategories.filter(subCategory => {
                                       for (let i = 0; i < selectedCategories.length; i++) {
                                           if (subCategory.category_id === selectedCategories[i].value)
                                               return true;
                                       }
                                       return false;
                                   }) : subCategories }
                                   selectedOptions={ selectedSubCategories }
                                   setSelectedOptions={ setSelectedSubCategories } />
                </Col>
                <Col className={ centerClass }>
                    <SelectWrapper title='Sub Brand' data={ selectedBrands ? subBrands.filter(subBrand => {
                        for (let i = 0; i < selectedBrands.length; i++) {
                            if (subBrand.brand_id === selectedBrands[i].value)
                                return true;
                        }
                        return false;
                    }) : subBrands } selectedOptions={ selectedSubBrands }
                                   setSelectedOptions={ setSelectedSubBrands } />
                </Col>
                <Col className='center'>
                    <SelectWrapper title='Retailer' data={ selectedChannels ? markets.filter(market => {
                        for (let i = 0; i < selectedChannels.length; i++) {
                            if (market.channel_id === selectedChannels[i].value)
                                return true;
                        }
                        return false;
                    }) : markets } selectedOptions={ selectedRetailers }
                                   setSelectedOptions={ setSelectedRetailers } />
                </Col>
                <Col className={ centerClass }>
                    <SelectWrapper title='SKU' data={ [{ name: 'AVAILABLE VERY SOON!' }] }
                                   selectedOptions={ selectedSKUs } setSelectedOptions={ setSelectedSKUs } />
                </Col>
            </Row>


            <PerfectScrollbar>
                <Row className='mt-5'>
                    <Col xl="3" className='center w-100'>
                        <Card className="text-white bg-primary w-100">
                            <CardBody>
                                <p className='font-size-17 text-center m-auto overflow-wrap-normal'>Products</p>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col xl="3">
                        <Row>
                            <Col xl="4">
                                <Card className="text-white bg-primary">
                                    <CardBody>
                                        <p className='font-size-17 text-center m-auto overflow-wrap-normal'>Minimum
                                            Price</p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl="4">
                                <Card className="text-white bg-primary">
                                    <CardBody>
                                        <p className='font-size-17 text-center m-auto overflow-wrap-normal'>Average
                                            Price</p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl="4">
                                <Card className="text-white bg-primary">
                                    <CardBody>
                                        <p className='font-size-17 text-center m-auto overflow-wrap-normal'>Standard
                                            Deviation</p>
                                    </CardBody>
                                </Card>
                            </Col>

                        </Row>
                    </Col>

                    <Col xl="6">
                        <Row className='retailers'>
                            { selectedRetailers ? selectedRetailers.map((retailer, key) => (
                                <Col key={ key } xl="3">
                                    <Card className="text-white bg-primary w-100">
                                        <CardBody>
                                            <p className='font-size-17 text-center m-auto overflow-wrap-normal'>{ retailer.label }</p>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )) : ''
                            }
                        </Row>
                    </Col>
                </Row>

                { clientProducts
                    //Search filter
                    .filter(product => product.product_info.name.toLowerCase().indexOf(search) !== -1)

                    //Sub category filter
                    .filter(product => {
                        if (selectedSubCategories) {
                            for (let i = 0; i < selectedSubCategories.length; i++) {
                                if (product.category_id === selectedSubCategories[i].value)
                                    return true;
                            }
                            return false;
                        }
                        return true;
                    })

                    //Category filter
                    .filter(product => {
                        if (selectedCategories) {
                            for (let i = 0; i < selectedCategories.length; i++) {
                                if (getCategory(product.category_id) === selectedCategories[i].value)
                                    return true;
                            }
                            return false;
                        }
                        return true;
                    })

                    .map((product, key) => {
                        const minimumPrice = getMinimumPrice(product, selectedRetailers);
                        const averagePrice = getAveragePrice(product, selectedRetailers);
                        const standardDeviation = getStandardDeviation(product, selectedRetailers);
                        return (
                            <ProductRow key={ key }
                                        name={ product.product_info.name } image={ product.product_info.imageurl }
                                        minimumPrice={ minimumPrice && ('' + (minimumPrice.minimumPrice / 100) + '₺ ' + markets[minimumPrice.minimumMarket - 1].name) }
                                        averagePrice={ averagePrice && (averagePrice + '₺') }
                                        standardDeviation={ standardDeviation && standardDeviation }
                                        retailers={ selectedRetailers }
                                        product={ product }
                            />
                        );
                    }) }
            </PerfectScrollbar>
        </React.Fragment>
    )
}