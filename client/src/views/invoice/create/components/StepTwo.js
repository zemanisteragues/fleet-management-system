import React from 'react';
import BasicInformation from './BasicInformation';
import TripsInfo from './TripsInfo';
import AmountInfo from './AmountInfo';

const StepTwo = () => {
    return (
        <div className="mt-4">
            <div className="justify-between">
                <h3 className="text-center">Invoice Details</h3>
            </div>
            <BasicInformation />

            <TripsInfo />

            <AmountInfo />
        </div>
    );
};

export default StepTwo;
