import React, { useEffect, useState } from 'react';
import { Select } from 'components/ui';
import {
    getCustomers,
    getDutySlipsByCustomerId,
    setHasFetchedInvoiceDetails,
} from '../store/dataSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
    setCustomerId,
    setDutySlips,
    setSelectedDutySlip,
} from '../store/dataSlice';

const SelectedCustomer = () => {
    const dispatch = useDispatch();
    const customers = useSelector(
        (state) => state.invoiceCreate.data.customers
    );

    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(getCustomers({ query: '' }));
    }, [dispatch]);

    useEffect(() => {
        const updatedOptions = customers.map(({ id, label }) => ({
            value: id,
            label,
        }));
        setOptions(updatedOptions);
    }, [setOptions, customers]);

    const promiseOptions = () => {
        setTimeout(() => {
            setOptions(customers);
            setLoading(false);
        }, 1500);
    };

    const onFocus = () => {
        if (options.length === 0) {
            setLoading(true);
            promiseOptions();
        }
    };

    return (
        <div className="mt-4">
            <span className="text-sm">Select Customer</span>
            <Select
                placeholder="Select Customer..."
                options={options}
                onFocus={onFocus}
                isLoading={loading}
                onChange={(newValue) => {
                    dispatch(setCustomerId(newValue.value));
                    dispatch(setDutySlips([]));
                    dispatch(setSelectedDutySlip([]));
                    dispatch(setHasFetchedInvoiceDetails(false));
                    dispatch(
                        getDutySlipsByCustomerId({ customerId: newValue.value })
                    );
                }}
            />
        </div>
    );
};

export default SelectedCustomer;
