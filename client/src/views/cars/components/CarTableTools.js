import React from 'react';
import CreateCar from './CreateCar';
import CarStatusFilter from './CarStatusFilter';
import CarSearch from './CarSearch';

const CarTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <CarSearch />
            <CarStatusFilter />
            <CreateCar />
        </div>
    );
};

export default CarTableTools;
