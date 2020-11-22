import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import actions from "../store/actions/index";
import { getMinimumPrice, getAveragePrice, getStandardDeviation } from '../utils/pricingUtil';
import { getCategoryId } from '../utils/namingUtil';

//Import Components
import MiniCard from '../components/MiniCard';
import DateWrapper from "../components/DateWrapper";
import SelectWrapper from "../components/SelectWrapper";
import SearchBar from "../components/SearchBar";
import ProductRow from "../components/Overview/ProductRow";

export default function Overview(props) {


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

    const [selectSKUData, setSelectSKUData] = useState(null);
    const [shownData, setShownData] = useState(null);


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
            let temp = clientProducts;
            const isSelectedSubCategory = selectedSubCategories && selectedSubCategories.length !== 0;
            const isSelectedSubBrand = selectedSubBrands && selectedSubBrands.length !== 0;
            const isSelectedCategory = selectedCategories && selectedCategories.length !== 0;
            const isSelectedBrand = selectedBrands && selectedBrands.length !== 0;

            if (isSelectedSubCategory) {
                temp = temp.filter(product => selectedSubCategories.some(subCategory => subCategory.value === product.category_id));
            }
            if (isSelectedSubBrand) {
                temp = temp.filter(product => selectedSubBrands.some(subBrand => subBrand.value === product.sub_brand_id));
            }
            if (isSelectedCategory && !isSelectedSubCategory) {
                temp = temp.filter(product => selectedCategories.some(category => category.value === getCategoryId(subCategories, product.category_id)));
            }
            if (isSelectedBrand && !isSelectedSubBrand) {
                temp = temp.filter(product => selectedBrands.some(brand => brand.value === product.product_info.brand_id));
            }
            setShownData(temp);
            temp = temp.map(item => ({
                name: item.product_info.name,
                id: item.product_id
            }));
            setSelectSKUData(temp);
        }
    }, [selectedCategories, selectedSubCategories, selectedBrands, selectedSubBrands, selectedSizes]);


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
    }, [markets, selectedSizes, selectedSubCategories, selectedSubBrands, selectedSKUs]);

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


            <Row className='d-flex align-items-center mt-2'>
                <Col xl='3'>
                    <SearchBar value={ search } handleChange={ handleSearchBar } />
                </Col>
                <Col className={ centerClass }>
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
                <Col className={ centerClass }>
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
                <Col className='center'>
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
                <Col className={ centerClass }>
                    <SelectWrapper title='SKU' data={ selectSKUData }
                                   selectedOptions={ selectedSKUs } setSelectedOptions={ setSelectedSKUs } />
                </Col>
            </Row>

            <PerfectScrollbar className='overflow-inherit'>

                <Row className='mt-5 mb-3 table-column-titles'>

                    <Col xl="3" className='w-100'>
                        <Card className="text-white bg-primary w-100 h-75">
                            <CardBody className='center'>
                                <p className='font-size-17 text-center m-auto overflow-wrap-normal'>Products</p>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col xl="3">
                        <Row>
                            <Col xl="4">
                                <Card className="text-white calculated-fields-title-background h-75">
                                    <CardBody className='center'>
                                        <p className='font-size-17 text-center m-auto overflow-wrap-normal'>Minimum
                                            Price</p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl="4">
                                <Card className="text-white calculated-fields-title-background h-75">
                                    <CardBody className='center'>
                                        <p className='font-size-17 text-center m-auto overflow-wrap-normal'>Average
                                            Price</p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl="4">
                                <Card className="text-white calculated-fields-title-background h-75">
                                    <CardBody className='center'>
                                        <p className='font-size-17 text-center m-auto overflow-wrap-normal'>Standard
                                            Deviation</p>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>

                    <Col xl="6">
                        <Row className='retailers h-100'>
                            { selectedRetailers ? selectedRetailers.map((retailer, key) => (
                                <Col key={ key } xl="3">
                                    <Card className="text-white bg-primary w-100 h-75">
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
                { shownData && shownData
                    //Search filter
                    .filter(product => product.product_info.name.toLowerCase().indexOf(search) !== -1)

                    .filter(product => {
                        if (selectedSKUs && selectedSKUs.length !== 0) {
                            return selectedSKUs.some(sku => sku.value === product.product_id);
                        } else
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