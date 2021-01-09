import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";
import { createAndDownloadExcelFile } from "../../utils/excel";

export default function ExportToExcelButton(props) {
    const { markets } = useSelector(state => state.data);
    return (
        <Button className="btn export-to-excel-btn mb-0"
                onClick={ () => createAndDownloadExcelFile(props.data, markets, props.date, props.selectedRetailers) }>
            <p className='font-size-14 text-center m-auto overflow-wrap-normal'>Export to Excel</p>
        </Button>
    );
};