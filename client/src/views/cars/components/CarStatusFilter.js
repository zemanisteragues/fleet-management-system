import React from 'react';
import { Select } from 'components/ui';
import { HiOutlineFilter } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../store/dataSlice';

const options = [
    { value: 'all', label: 'Active + Inactive', color: 'bg-gray-500' },
    { value: '1', label: 'Active', color: 'bg-emerald-500' },
    { value: '0', label: 'Inactive', color: 'bg-red-500' },
];

const CarStatusFilter = () => {
    const dispatch = useDispatch();
    const carStatusType = useSelector(
        (state) => state.cars.data.filters.carStatus
    );
    const carStatusTypeIndex = options.findIndex(
        (option) => option.value === carStatusType
    );

    const onStatusFilterChange = (option) => {
        dispatch(setFilters({ key: 'currentPage', value: 1 }));
        dispatch(setFilters({ key: 'carStatus', value: option.value }));
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
                    value={options[carStatusTypeIndex]}
                />
            </div>
        </>
    );
};

export default CarStatusFilter;
