import React from 'react';
import { Button } from 'components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentStep, setCustomerId } from 'views/invoice/create/store/dataSlice';
const AddInvoice = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const CREATE_INVOICE_URL = '/invoice/create';
    return (
        <>
            <Button
                block
                variant="solid"
                size="sm"
                onClick={() => {
                    dispatch(setCustomerId(null))
                    dispatch(setCurrentStep(0));
                    navigate(CREATE_INVOICE_URL);
                }}
                icon={<HiPlusCircle />}
            >
                Create Invoice
            </Button>
        </>
    );
};

export default AddInvoice;
