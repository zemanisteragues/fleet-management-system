import React, { useEffect, useState } from 'react';
import { FormContainer, Button, hooks } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { StickyFooter, ConfirmDialog } from 'components/shared';
import { AiOutlineSave } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { setCurrentStep, createInvoice, submitInvoice } from '../store/dataSlice';
import { calculateTaxesAndTotal } from './AmountInfo'
const Submit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const data = useSelector((state) => state.invoiceCreate.data);
    const details = useSelector((state) => state.invoiceCreate.data.dutySlips);

    const [data2, setdata2] = React.useState({});
    const [isPreviousDisabled, setIsPreviousDisabled] = React.useState(false);
    const [isNextDisabled, setIsNextDisabled] = React.useState(false);

    const isLoading = data.loading;
    const currentStep = data.currentStep;
    const customerId = data.customerId;
    const selectedDutySlips = data.selectedDutySlips;
    const basicInfoDetails = data.details
    // const details = data.details;

    useEffect(() => {
        setdata2(calculateTaxesAndTotal(details));
        if (currentStep === 0) {
            setIsPreviousDisabled(true || isLoading);
        } else {
            setIsPreviousDisabled(false || isLoading);
        }
    }, [currentStep,details ]);

    useEffect(() => {
        switch (currentStep) {
            case 0:
                setIsNextDisabled(
                    !customerId || selectedDutySlips.length === 0
                );
                break;
            case 1:
                setIsNextDisabled(
                    basicInfoDetails.representative.length === 0,
                );
                setIsNextDisabled(
                    basicInfoDetails.placeOfService.length === 0,
                );
                break;
        }
    }, [customerId, selectedDutySlips, currentStep, basicInfoDetails]);

    const handleNext = () => {
        dispatch(setCurrentStep(currentStep + 1));
    };

    const handlePrevious = () => {
        dispatch(setCurrentStep(currentStep - 1));
    };

    const SubmitButton = () => {
        const [open, setOpen] = useState(false);

        const handleClose = () => {
            console.log('Close');
            setOpen(false);
        };

        const handleConfirm = () => {
            // dispatch(createInvoice()); // can be removed as the api isn't being called 
            // recieved all the details need for creating an invoice
            const obj = {
                details: data.details, // containes invoice details. 
                dutySlips: selectedDutySlips, // containes all the duty slips attached.
                data: data2, // containes tax details and grand total
            }
            console.log(obj);
            dispatch(submitInvoice(obj));
            setOpen(false);
            navigate("/invoice");
        };

        return (
            <div className="flex flex-col gap-6">
                <div>
                    <Button
                        size="sm"
                        variant="solid"
                        loading={isLoading}
                        onClick={() => setOpen(true)}
                        icon={<AiOutlineSave />}
                        type="submit"
                        disabled={isNextDisabled}
                    >
                        Submit
                    </Button>
                </div>
                <ConfirmDialog
                    isOpen={open}
                    onClose={handleClose}
                    onRequestClose={handleClose}
                    type={'info'}
                    title={'Submit Invoice?'}
                    onCancel={handleClose}
                    onConfirm={handleConfirm}
                    confirmButtonColor={'blue-600'}
                >
                    <p>Once submitted, invoice cannot be edited.</p>
                </ConfirmDialog>
            </div>
        );
    };

    return (
        <>
            <StickyFooter
                className="-mx-8 px-8 flex items-center justify-between py-4"
                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
                <div></div>
                <div className="md:flex items-center">
                    <Button
                        size="sm"
                        className="ltr:mr-3 rtl:ml-3"
                        onClick={() => handlePrevious()}
                        type="button"
                        disabled={isPreviousDisabled}
                    >
                        Previous
                    </Button>
                    {currentStep === 2 && <SubmitButton />}
                    {currentStep < 2 && (
                        <Button
                            size="sm"
                            variant="solid"
                            loading={isLoading}
                            onClick={() => handleNext()}
                            icon={<AiOutlineSave />}
                            type="submit"
                            disabled={isNextDisabled}
                        >
                            Next
                        </Button>
                    )}
                </div>
            </StickyFooter>
        </>
    );
};

export default Submit;
