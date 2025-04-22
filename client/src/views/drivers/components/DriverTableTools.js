import React from 'react';
import DriverSearch from './DriverSearch';
import CreateDriver from '../CreateDriver';
import DriverStatusFilter from './DriverStatusFilter';

const DriverTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <DriverSearch />
            <DriverStatusFilter />
            <CreateDriver />
        </div>
    );
};

export default DriverTableTools;
