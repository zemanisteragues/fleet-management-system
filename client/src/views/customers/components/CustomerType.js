import React from 'react';
import { Select } from 'components/ui';
import { HiOutlineFilter } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import {
    setCustomerStatus,
    getCustomersByQuery,
    resetFilters,
} from '../store/dataSlice';

const options = [
    { value: 'all', label: 'Active + Inactive', color: 'bg-gray-500' },
    { value: '1', label: 'Active', color: 'bg-emerald-500' },
    { value: '0', label: 'Inactive', color: 'bg-red-500' },
];

const CustomerType = () => {
    const dispatch = useDispatch();
    const companyType = useSelector(
        (state) => state.customers.data.customerStatus
    );
    const companyIndex = options.findIndex(
        (option) => option.value === companyType
    );

    const onStatusFilterChange = (option) => {
        dispatch(resetFilters());
        dispatch(setCustomerStatus(option.value));
        dispatch(getCustomersByQuery());
    };

    console.log('company type', companyType);
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

export default CustomerType;
