import React from 'react';
import SelectCustomer from './SelectCustomer';
import DutySlips from './DutySlips';

const StepOne = () => {
    return (
        <div>
            <SelectCustomer />
            <DutySlips />
        </div>
    );
};

export default StepOne;
