import React, { useState } from 'react';
import { DatePicker } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';

const InvoiceDateRange = () => {
    const dispatch = useDispatch();
    const [dateRange, setDateRange] = useState([
        new Date(2022, 11, 1),
        new Date(2022, 11, 5),
    ]);
    //const dateRange = useSelector((state) => state.invoicesList.data.filters.dateRange);
    console.log('data', dateRange);
    return (
        <div>
            <DatePicker.DatePickerRange
                placeholder="Select dates range"
                value={dateRange}
                onChange={() => {}}
            />
        </div>
    );
};

export default InvoiceDateRange;
