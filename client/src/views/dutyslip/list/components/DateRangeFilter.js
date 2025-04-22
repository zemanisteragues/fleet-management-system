import React from 'react'
import {DatePicker} from 'components/ui';
import {useSelector, useDispatch} from 'react-redux';
import {setFilters} from '../store/dataSlice';
import moment from 'moment';

const DateRangeFilter = () => {
    const dispatch = useDispatch();
    const dateRange = useSelector(state => state.dutySlipsList.data.filters.dateRange);

    const handleRangePickerChange = (value) => {
        // convert values in array to date format using momentjs
        const dateRange = [moment(value?.[0])?.format('YYYY-MM-DD') || null, moment(value?.[1])?.format('YYYY-MM-DD') || null]
        dispatch(setFilters({name: 'dateRange', value: dateRange}));
        console.log('value', value);
    };

    return (
        <div className='block lg:inline-block md:mx-2 md:mb-0 mb-4'>
            <DatePicker.DatePickerRange
                placeholder="Select dates range"
                value={dateRange}
                inputFormat="DD/MM/YY"
                inputSize="sm"
                onChange={handleRangePickerChange}/>
        </div>
    )
}

export default DateRangeFilter