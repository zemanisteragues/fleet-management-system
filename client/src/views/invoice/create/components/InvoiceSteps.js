import React, { useEffect, useState } from 'react';
import { Steps, Button } from 'components/ui';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

import { useSelector, useDispatch } from 'react-redux';
import { getInvoiceDetails, setCurrentStep } from '../store/dataSlice';
const InvoiceSteps = () => {
    const dispatch = useDispatch();

    const currentStep = useSelector(
        (state) => state.invoiceCreate.data.currentStep
    );
    const hasFetchedInvoiceDetails = useSelector(
        (state) => state.invoiceCreate.data.hasFetchedInvoiceDetails
    );

    useEffect(() => {
        currentStep === 1 &&
            !hasFetchedInvoiceDetails &&
            dispatch(getInvoiceDetails());
    }, [currentStep]);

    return (
        <div className="col-start-2 col-span-4 mt-4">
            <Steps current={currentStep}>
                <Steps.Item title="Duty Slips" />
                <Steps.Item title="Invoice Details" />
                <Steps.Item title="Preview Invoice" />
            </Steps>
            <div>
                {currentStep === 0 && <StepOne />}
                {currentStep === 1 && <StepTwo />}
                {currentStep === 2 && <StepThree />}
            </div>
        </div>
    );
};

export default InvoiceSteps;
