import React from 'react';
import { Input, Button } from 'components/ui';
import { useDispatch } from 'react-redux';
import { HiOutlineSearch } from 'react-icons/hi';
import { setFilters } from '../store/dataSlice';

const DriverSearch = () => {
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        dispatch(setFilters({ key: 'currentPage', value: 1 }));
        dispatch(setFilters({ key: 'query', value: e.target.value }));
    };

    return (
        <>
            <Input
                className="max-w-md md:w-52 md:mb-0 mb-4"
                size="sm"
                placeholder="Search driver..."
                prefix={<HiOutlineSearch className="text-lg" />}
                onChange={handleSearch}
            />
        </>
    );
};

export default DriverSearch;
