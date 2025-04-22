import React from 'react';
import CreateDutySlip from 'views/dutyslip/create';
import DateRangeFilter from './DateRangeFilter';
import DutyTypeFilter from './DutyTypeFilter';
import BookingSearch from './BookingSearch';

const DutySlipsHeader = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            {/* <DateRangeFilter /> */}
            <BookingSearch/>
            <DutyTypeFilter />
            <CreateDutySlip />
        </div>
    );
};

export default DutySlipsHeader;
