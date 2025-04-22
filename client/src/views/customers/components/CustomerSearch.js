import React from 'react';
import { Input, Button } from 'components/ui';
import { useDispatch } from 'react-redux';
import { HiOutlineSearch } from 'react-icons/hi';
import {
    getCustomersByQuery,
    resetFilters,
    setSearchQuery,
} from '../store/dataSlice';

const CustomerSearch = () => {
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        dispatch(resetFilters());
        dispatch(setSearchQuery(e.target.value));
        dispatch(getCustomersByQuery());
    };

    return (
        <>
            <Input
                className="max-w-md md:w-52 md:mb-0 mb-4"
                size="sm"
                placeholder="Search customers"
                prefix={<HiOutlineSearch className="text-lg" />}
                onChange={handleSearch}
            />
        </>
    );
};

export default CustomerSearch;
