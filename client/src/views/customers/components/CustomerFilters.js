import React from 'react';
import { Select } from 'components/ui';
import { HiOutlineFilter } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import {
    setCustomerType,
    getCustomersByQuery,
    resetFilters,
} from '../store/dataSlice';

const options = [
    { value: 'all', label: 'Individuals + Companies', color: 'bg-gray-500' },
    { value: '0', label: 'Individuals', color: 'bg-emerald-500' },
    { value: '1', label: 'Companies', color: 'bg-red-500' },
];

const CustomerFilters = () => {
    const dispatch = useDispatch();
    const customerType = useSelector(
        (state) => state.customers.data.customerType
    );
    const companyIndex = options.findIndex(
        (option) => option.value === customerType
    );

    const onStatusFilterChange = (option) => {
        dispatch(resetFilters());
        dispatch(setCustomerType(option.value));
        dispatch(getCustomersByQuery());
    };

    return (
        <>
            <div className="block lg:inline-block md:mx-2 md:mb-0 mb-4">
                <Select
                    options={options}
                    size="sm"
                    placeholder="Select Type"
                    className="min-w-[130px]"
                    onChange={onStatusFilterChange}
                    value={options[companyIndex]}
                />
            </div>
        </>
    );
};

export default CustomerFilters;
