import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";

import actions from "../store/actions/index";
import api from '../api/index';

//Import Components
import MiniCard from '../components/MiniCard';
import DateWrapper from "../components/DateWrapper";
import SelectWrapper from "../components/SelectWrapper";
import InsertRow from "../components/Insert_Tracking/InsertRow";
import { getChannelName, getMarketName } from "../utils/namingUtil";

export default function InsertTracking(props) {


    const dispatch = useDispatch();
    const {
        numberOfProducts,
        numberOfRetailers,
        averageStandardDeviation,
        categories,
        brands,
        suppliers,
        markets,
        channels
    } = useSelector(state => state.data);

    const [inserts, setInserts] = useState([]);

    //Select filters
    const [selectedCategories, setSelectedCategories] = useState(null);
    const [selectedBrands, setSelectedBrands] = useState(null);
    const [selectedChannels, setSelectedChannels] = useState(null);
    const [selectedSuppliers, setSelectedSuppliers] = useState(null);
    const [selectedRetailers, setSelectedRetailers] = useState(null);

    //Date filters
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [isAlertShown, setIsAlertShown] = useState(false);

    const [state, setState] = useState({
        breadcrumbItems: [
            { title: "Markette", link: "#" },
            { title: "Insert Tracking", link: "#" }
        ]
    });

    //Date Wrapper change handler
    const onDateChange = dates => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const onButtonClick = () => {
        if (!startDate || !endDate)
            setIsAlertShown(true)
        else
            api.insertTracking.insertTrackingFetch(startDate, endDate, selectedChannels && selectedChannels.map(e => e.value),
                selectedRetailers && selectedRetailers.map(e => e.value), selectedSuppliers && selectedSuppliers.map(e => e.value),
                selectedCategories && selectedCategories.map(e => e.value),
                selectedBrands && selectedBrands.map(e => e.value))
                .then(data => {
                    setInserts(data);
                })
                .catch(error => {
                })
    }

    useEffect(() => {
        console.log('aAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        dispatch(actions.breadcrumb.setBreadcrumbItems("Insert Tracking", state.breadcrumbItems));
        api.insertTracking.insertTrackingInitialFetch()
            .then(data => {
                setInserts(data);
            })
            .catch(error => {
            })
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

    useEffect(() => {
        if (selectedSuppliers && selectedSuppliers.length !== 0) {
            setSelectedBrands(brands.filter(brand => selectedSuppliers.some(selectedSupplier => selectedSupplier.value === brand.supplier_id))
                .map(item => ({
                    label: item.name,
                    value: item.id
                })));
        }
    }, [selectedSuppliers]);

    return (
        <React.Fragment>
            { isAlertShown ? (
                <SweetAlert
                    title="Please provide a date interval"
                    onConfirm={ () => setIsAlertShown(false) }
                />
            ) : null }
            <Row>
                <MiniCard icon='mdi-cube-outline' title='Number of Products' value={ numberOfProducts } />
                <MiniCard icon='mdi-buffer' title='Number of Retailers' value={ numberOfRetailers } />
                <MiniCard icon='mdi-tag-text-outline' title='Price Standard Deviation'
                          value={ averageStandardDeviation } />
                <MiniCard icon='mdi-briefcase-check' title='Availability'
                          value={ ((numberOfRetailers / markets.length) * 100).toFixed(2) + '%' } />
            </Row>

            <Row className='mt-3 mb-1 d-flex align-items-center justify-content-end'>

                <Col xs={ 12 } md={ 6 } className='center col-xl'>
                    <DateWrapper isDataRange={ true } startDate={ startDate } endDate={ endDate }
                                 onDateChange={ onDateChange } />
                </Col>

                <Col xs={ 12 } md={ 6 } className='center col-xl'>
                    <SelectWrapper title='Channel' data={ channels } selectedOptions={ selectedChannels }
                                   setSelectedOptions={ setSelectedChannels } />
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
                    <SelectWrapper title='Category' data={ categories } selectedOptions={ selectedCategories }
                                   setSelectedOptions={ setSelectedCategories } />
                </Col>

                <Col xs={ 12 } md={ 6 } className='center col-xl'>
                    <SelectWrapper title='Supplier' data={ suppliers } selectedOptions={ selectedSuppliers }
                                   setSelectedOptions={ setSelectedSuppliers } />
                </Col>

                <Col xs={ 12 } md={ 6 } className='center col-xl'>
                    <SelectWrapper title='Brand'
                                   data={ (selectedSuppliers && selectedSuppliers.length !== 0) ? brands.filter(brand => {
                                       for (let i = 0; i < selectedSuppliers.length; i++) {
                                           if (brand.supplier_id === selectedSuppliers[i].value)
                                               return true;
                                       }
                                       return false;
                                   }) : brands } selectedOptions={ selectedBrands }
                                   setSelectedOptions={ setSelectedBrands } />
                </Col>

                <Col xs={ 12 } md={ 6 } className='w-100 d-flex justify-content-center align-bottom col-xl'>
                    <Button className="btn btn-secondary mb-0 w-75"
                            onClick={ onButtonClick }>
                        <p className='font-size-14 text-center m-auto overflow-wrap-normal'>Search</p>
                    </Button>
                </Col>

            </Row>

            <Row className='mt-5 mb-1 table-column-titles'>
                <Col xs={ 2 } className='w-100'>
                    <Card className="text-white bg-primary w-100 h-75">
                        <CardBody className='center'>
                            <p className='font-size-17 text-center m-auto overflow-wrap-normal'>Channel</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={ 2 } className='w-100'>
                    <Card className="text-white bg-primary w-100 h-75">
                        <CardBody className='center'>
                            <p className='font-size-17 text-center m-auto overflow-wrap-normal'>Retailer</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={ 2 } className='w-100'>
                    <Card className="text-white bg-primary w-100 h-75">
                        <CardBody className='center'>
                            <p className='font-size-17 text-center m-auto overflow-wrap-normal'>Starting Date</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={ 2 } className='w-100'>
                    <Card className="text-white bg-primary w-100 h-75">
                        <CardBody className='center'>
                            <p className='font-size-17 text-center m-auto overflow-wrap-normal'>Ending Date</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={ 2 } className='w-100'>
                    <Card className="text-white bg-primary w-100 h-75">
                        <CardBody className='center'>
                            <p className='font-size-17 text-center m-auto overflow-wrap-normal'>Duration</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={ 1 } className='w-100'>
                    <Card className="text-white bg-primary w-100 h-75">
                        <CardBody className='center'>
                            <p className='font-size-17 text-center m-auto overflow-wrap-normal'>Number of Pages</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs={ 1 } className='w-100'>
                    <Card className="text-white bg-primary w-100 h-75">
                        <CardBody className='center'>
                            <p className='font-size-17 text-center m-auto overflow-wrap-normal'>Download</p>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            {
                inserts.length !== 0 ? inserts.map(insert =>
                    <InsertRow key={ insert.id }
                               channel={ getChannelName(insert.markets.channel_id, channels) }
                               retailer={ getMarketName(insert.market_id, markets) }
                               startDate={ insert.start_date } endDate={ insert.end_date }
                               duration={ insert.duration } numOfPages={ insert.num_of_pages }
                               url={ insert.url } />
                ) : <Row className='vh-25'><p className='font-size-20 text-center m-auto overflow-wrap-normal'>No
                    inserts to display...</p></Row>
            }
        </React.Fragment>
    )
}