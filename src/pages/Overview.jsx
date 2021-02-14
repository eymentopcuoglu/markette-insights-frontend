import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import actions from "../store/actions/index";
import { getMinimumPrice, getAveragePrice, getStandardDeviation } from '../utils/pricingUtil';
import { getCategoryId, getMarketName } from '../utils/namingUtil';

//Import Components
import MiniCard from '../components/MiniCard';
import DateWrapper from "../components/DateWrapper";
import SelectWrapper from "../components/SelectWrapper";
import SearchBar from "../components/SearchBar";
import ProductRow from "../components/Overview/ProductRow";
import { compareDates } from "../utils/dateUtil";
import ExportToExcelButton from "../components/Overview/ExportToExcelButton";

export default function Overview(props) {


    const dispatch = useDispatch();
    const {
        numberOfProducts,
        numberOfRetailers,
        averageStandardDeviation,
        categories,
        subCategories,
        brands,
        subBrands,
        markets,
        channels,
        clientProducts
    } = useSelector(state => state.data);

    const { clientProducts: productPricingData, isLoading } = useSelector(state => state.overview);

    const { user } = useSelector(state => state.auth);

    //Select filters
    const [selectedCategories, setSelectedCategories] = useState(null);
    const [selectedBrands, setSelectedBrands] = useState(null);
    const [selectedChannels, setSelectedChannels] = useState(null);
    const [selectedSizes, setSelectedSizes] = useState(null);
    const [selectedSubCategories, setSelectedSubCategories] = useState(null);
    const [selectedSubBrands, setSelectedSubBrands] = useState(null);
    const [selectedRetailers, setSelectedRetailers] = useState(null);
    const [selectedSKUs, setSelectedSKUs] = useState(null);

    const [selectSKUData, setSelectSKUData] = useState(null);

    const [shownData, setShownData] = useState(null);

    //Set it to true if the date has been changed, set it to false after the data is fetched and ready
    const [dateChange, setDateChange] = useState(false);

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

    //Date Wrapper change handler
    const onDateChange = newDate => {
        if (!compareDates(new Date(), newDate)) {
            dispatch(actions.overview.overviewDataFetchRequest(user.clientId, newDate));
        }
        setDateChange(true);
        setDate(newDate);
    };

    useEffect(() => {
        dispatch(actions.breadcrumb.setBreadcrumbItems("Overview", state.breadcrumbItems));
    }, []);

    useEffect(() => {
        if (selectedCategories && selectedCategories.length !== 0) {
            setSelectedSubCategories(subCategories.filter(subCategory => selectedCategories.some(selectedCategory => selectedCategory.value === subCategory.category_id))
                .map(item => ({
                    label: item.name,
                    value: item.id
                })));
        }
    }, [selectedCategories]);

    useEffect(() => {
        if (selectedBrands && selectedBrands.length !== 0) {
            setSelectedSubBrands(subBrands.filter(subBrand => selectedBrands.some(selectedBrand => selectedBrand.value === subBrand.brand_id))
                .map(item => ({
                    label: item.name,
                    value: item.id
                })));
        }
    }, [selectedBrands]);

    useEffect(() => {
        if (selectedChannels && selectedChannels.length !== 0) {
            setSelectedRetailers(markets.filter(market => selectedChannels.some(selectedChannel => selectedChannel.value === market.channel_id))
                .map(item => ({
                    label: item.name,
                    value: item.id
                })));
        }
    }, [selectedChannels]);

    //Filter the data
    useEffect(() => {
        if (clientProducts) {
            let temp;
            //Check whether the date is today or not
            if (compareDates(new Date(), date)) {
                temp = clientProducts;
            } else {
                temp = productPricingData;
            }
            const isSelectedSubCategory = selectedSubCategories && selectedSubCategories.length !== 0;
            const isSelectedSubBrand = selectedSubBrands && selectedSubBrands.length !== 0;
            const isSelectedCategory = selectedCategories && selectedCategories.length !== 0;
            const isSelectedBrand = selectedBrands && selectedBrands.length !== 0;

            if (isSelectedSubCategory) {
                temp = temp.filter(product => selectedSubCategories.some(subCategory => subCategory.value === product.product_info.sub_category_id));
            }
            if (isSelectedSubBrand) {
                temp = temp.filter(product => selectedSubBrands.some(subBrand => subBrand.value === product.product_info.sub_brand_id));
            }
            if (isSelectedCategory && !isSelectedSubCategory) {
                temp = temp.filter(product => selectedCategories.some(category => category.value === product.product_info.category_id));
            }
            if (isSelectedBrand && !isSelectedSubBrand) {
                temp = temp.filter(product => selectedBrands.some(brand => brand.value === product.product_info.brand_id));
            }
            let selectSKUData = [...temp];

            //Search filter
            temp = temp.filter(product => product.product_info.name.toLowerCase().indexOf(search) !== -1);
            //SelectedSKU filter
            temp = temp.filter(product => {
                if (selectedSKUs && selectedSKUs.length !== 0) {
                    return selectedSKUs.some(sku => sku.value === product.product_id);
                } else
                    return true;
            });
            setShownData(temp);
            setDateChange(false);
            selectSKUData = selectSKUData.map(item => ({
                name: item.product_info.name,
                id: item.product_id
            }));
            setSelectSKUData(selectSKUData);
        }
    }, [productPricingData, date, selectedCategories, selectedSubCategories, selectedBrands, selectedSubBrands, selectedSizes, search, selectedSKUs]);


    useEffect(() => {
        if (markets && clientProducts) {
            const data = markets.filter(market => {
                if (compareDates(new Date(), date)) {
                    return clientProducts.some(product => product.current_product_transactions.some(item => parseInt(item.market) === market.id));
                } else {
                    return productPricingData.some(product => product.product_transactions.some(item => parseInt(item.market) === market.id));
                }
            }).map(item => ({
                label: item.name,
                value: item.id
            }));
            setSelectedRetailers(data);
        }
    }, [productPricingData, date, markets, selectedSizes, selectedSubCategories, selectedSubBrands, selectedSKUs]);

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
                <Col xs={ 12 } xl={ 3 }>
                    <Row className='d-flex justify-content-center align-items-end'>
                        <Col className='center'>
                            <DateWrapper isDataRange={ false } startDate={ date } onDateChange={ onDateChange } />
                        </Col>
                        <Col className='center'>
                            <ExportToExcelButton data={ shownData } date={ date }
                                                 selectedRetailers={ selectedRetailers } />
                        </Col>
                    </Row>
                </Col>
                <Col xs={ 12 } md={ 6 } className='center col-xl'>
                    <SelectWrapper title='Category' data={ categories } selectedOptions={ selectedCategories }
                                   setSelectedOptions={ setSelectedCategories } />
                </Col>
                <Col xs={ 12 } md={ 6 } className='center col-xl'>
                    <SelectWrapper title='Brand' data={ brands } selectedOptions={ selectedBrands }
                                   setSelectedOptions={ setSelectedBrands } />
                </Col>
                <Col xs={ 12 } md={ 6 } className='center col-xl'>
                    <SelectWrapper title='Channel' data={ channels } selectedOptions={ selectedChannels }
                                   setSelectedOptions={ setSelectedChannels } />
                </Col>
                <Col xs={ 12 } md={ 6 } className='center col-xl'>
                    <SelectWrapper title='Size' data={ [{ name: 'AVAILABLE VERY SOON!' }] }
                                   selectedOptions={ selectedSizes } setSelectedOptions={ setSelectedSizes } />
                </Col>
            </Row>


            <Row className='d-flex align-items-center mt-2'>
                <Col xs={ 12 } xl={ 3 }>
                    <SearchBar value={ search } handleChange={ handleSearchBar } />
                </Col>
                <Col xs={ 12 } md={ 6 } className='center col-xl'>
                    <SelectWrapper title='Sub Category'
                                   data={ (selectedCategories && selectedCategories.length !== 0) ? subCategories.filter(subCategory => {
                                       for (let i = 0; i < selectedCategories.length; i++) {
                                           if (subCategory.category_id === selectedCategories[i].value)
                                               return true;
                                       }
                                       return false;
                                   }) : subCategories }
                                   selectedOptions={ selectedSubCategories }
                                   setSelectedOptions={ setSelectedSubCategories } />
                </Col>
                <Col xs={ 12 } md={ 6 } className='center col-xl'>
                    <SelectWrapper title='Sub Brand'
                                   data={ (selectedBrands && selectedBrands.length !== 0) ? subBrands.filter(subBrand => {
                                       for (let i = 0; i < selectedBrands.length; i++) {
                                           if (subBrand.brand_id === selectedBrands[i].value)
                                               return true;
                                       }
                                       return false;
                                   }) : subBrands } selectedOptions={ selectedSubBrands }
                                   setSelectedOptions={ setSelectedSubBrands } />
                </Col>
                <Col xs={ 12 } md={ 6 } className='center col-xl'>
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
                <Col xs={ 12 } md={ 6 } className='center col-xl'>
                    <SelectWrapper title='SKU' data={ selectSKUData }
                                   selectedOptions={ selectedSKUs } setSelectedOptions={ setSelectedSKUs } />
                </Col>
            </Row>

            <PerfectScrollbar className='overflow-inherit'>

                <Row className='mt-5 mb-3 table-column-titles no-wrap'>

                    <Col xs={ 3 } className='w-100'>
                        <Card className="text-white bg-primary w-100 h-75">
                            <CardBody className='center'>
                                <p className='font-size-17 text-center m-auto overflow-wrap-normal'>Products</p>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col xs={ 4 }>
                        <Row className='no-wrap'>
                            <Col xs={ 4 }>
                                <Card
                                    className="text-white calculated-fields-title-background h-75 ">
                                    <CardBody className='center'>
                                        <p className='font-size-17 text-center m-auto overflow-wrap-normal'>Minimum
                                            Price</p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xs={ 4 }>
                                <Card
                                    className="text-white calculated-fields-title-background h-75">
                                    <CardBody className='center'>
                                        <p className='font-size-17 text-center m-auto overflow-wrap-normal'>Average
                                            Price</p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xs={ 4 }>
                                <Card
                                    className="text-white calculated-fields-title-background h-75 ">
                                    <CardBody className='center'>
                                        <p className='font-size-17 text-center m-auto overflow-wrap-normal'>Standard
                                            Deviation</p>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={ 5 }>
                        <Row className='retailers h-100 no-wrap'>
                            { selectedRetailers ? selectedRetailers.map((retailer, key) => (
                                <Col key={ key } xs={ 3 }>
                                    <Card className="text-white bg-primary w-100 h-75 ">
                                        <CardBody className='center'>
                                            <p className='font-size-17 text-center m-auto overflow-wrap-normal'>{ retailer.label }</p>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )) : ''
                            }
                        </Row>
                    </Col>
                </Row>
                { !isLoading && !dateChange && shownData && shownData
                    .map((product, key) => {
                        let minimumPrice, averagePrice, standardDeviation;
                        const isToday = compareDates(new Date(), date);
                        if (isToday) {
                            minimumPrice = getMinimumPrice(product, selectedRetailers, 0);
                            averagePrice = getAveragePrice(product, selectedRetailers, 0);
                            standardDeviation = getStandardDeviation(product, selectedRetailers, 0);
                        } else {
                            minimumPrice = getMinimumPrice(product, selectedRetailers, 1);
                            averagePrice = getAveragePrice(product, selectedRetailers, 1);
                            standardDeviation = getStandardDeviation(product, selectedRetailers, 1);
                        }
                        return (
                            <ProductRow key={ key }
                                        name={ product.product_info.name } image={ product.product_info.imageurl }
                                        minimumPrice={ minimumPrice && ('' + (minimumPrice.minimumPrice / 100) + '₺ ' + getMarketName(minimumPrice.minimumMarket, markets)) }
                                        averagePrice={ averagePrice && (averagePrice + '₺') }
                                        standardDeviation={ standardDeviation && standardDeviation }
                                        retailers={ selectedRetailers }
                                        pricing={ isToday ? product.current_product_transactions : product.product_transactions }
                            />
                        );
                    }) }
            </PerfectScrollbar>
        </React.Fragment>
    )
}