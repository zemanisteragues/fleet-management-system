import React from 'react';
import { Select } from 'components/ui';
import { HiOutlineFilter } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../store/dataSlice';

const options = [
    { value: 'all', label: 'All', color: 'bg-gray-500' },
    { value: 'individual', label: 'Individuals', color: 'bg-emerald-500' },
    { value: 'company', label: 'Companies', color: 'bg-red-500' },
];

const InvoiceCustomerTypeFilter = () => {
    const dispatch = useDispatch();

    const data = useSelector((state) => state.invoicesList.data);
    console.log('data', data);

    const companyType = useSelector(
        (state) => state.invoicesList.data.filters.companyType
    );

    const companyIndex = options.findIndex(
        (option) => option.value === companyType
    );

    const onStatusFilterChange = (option) => {
        dispatch(setFilters({ name: 'customerType', value: option.value }));
        // dispatch(getCustomersByQuery());
    };

    return (
        <>
            <div className="block lg:inline-block md:mx-2 md:mb-0 mb-4">
                <Select
                    options={options}
                    size="sm"
                    className="min-w-[150px]"
                    onChange={onStatusFilterChange}
                    value={options[companyIndex]}
                />
            </div>
        </>
    );
};

export default InvoiceCustomerTypeFilter;
