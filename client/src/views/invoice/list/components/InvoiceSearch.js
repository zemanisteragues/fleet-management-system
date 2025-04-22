import React from 'react';
import { Input, Button } from 'components/ui';
import { useDispatch } from 'react-redux';
import { HiOutlineSearch } from 'react-icons/hi';
//import { getCustomersByQuery, setSearchQuery } from '../store/dataSlice';

const InvoiceSearch = () => {
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        // dispatch(setSearchQuery(e.target.value));
        // dispatch(getCustomersByQuery());
    };

    return (
        <>
            <Input
                className="max-w-md md:w-56 md:mb-0 mb-4 min-w-[160px]"
                size="sm"
                placeholder="Search invoices"
                prefix={<HiOutlineSearch className="text-lg" />}
                onChange={handleSearch}
            />
        </>
    );
};

export default InvoiceSearch;
