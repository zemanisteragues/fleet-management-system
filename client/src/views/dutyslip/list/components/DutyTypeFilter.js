import React, { useEffect } from 'react';
import { Select } from 'components/ui';
import { HiOutlineFilter } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { dutyTypes as options} from 'views/dutyslip/create/constants/utils';
import { setFilters } from '../store/dataSlice';

const DutyTypeFilter = () => {
    const dispatch = useDispatch();

    const onStatusFilterChange = (option) => {
        const optionsString = option.map((opt) => opt.value).join(',');
        if(optionsString === '') {
            dispatch(setFilters({name: 'dutyTypeStatus', value: 'all'}));
        } else {
            dispatch(setFilters({name: 'dutyTypeStatus', value: optionsString}));
        }
    };

    return (
        <>
            <div className="block lg:inline-block md:mx-2 md:mb-0 mb-4">
                <Select
                    options={options}
                    size="sm"
                    placeholder="Select Duty Type"
                    className="min-w-[150px]"
                    isMulti
                    onChange={onStatusFilterChange}
                    //value={options[companyIndex]}
                />
            </div>
        </>
    );
};

export default DutyTypeFilter;
