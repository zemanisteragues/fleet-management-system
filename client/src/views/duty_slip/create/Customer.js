import React, { useEffect } from 'react';
import { TextField, Autocomplete, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers, setCustomerId, setTableData } from './store/dataSlice';

const Customer = () => {
    const dispatch = useDispatch();
    const customers = useSelector(
        (state) => state.createDutySlip.data.customers
    );
    const customerId = useSelector(
        (state) => state.createDutySlip.data.customerId
    );
    const hasSubmit = useSelector(
        (state) => state.createDutySlip.data.hasSubmit
    );

    const currentPage = useSelector(
        (state) => state.createDutySlip.data.currentPage
    );

    const [inputValue, setInputValue] = React.useState('');

    const isError = hasSubmit && customerId === null ? true : false;

    useEffect(() => {
        dispatch(getCustomers({ query: 'a' }));
    }, [dispatch]);

    useEffect(() => {
        if (inputValue.length < 3) {
            dispatch(getCustomers({ query: inputValue }));
        }
    }, [inputValue]);

    const customerIndex = customers.findIndex(
        (customer) => customer.id === customerId
    );

    if (currentPage === 'view') {
        return (
            <Grid item xs={12}>
                <TextField
                    label="Customer Name"
                    value={customers[customerIndex].label}
                    disabled
                    fullWidth
                />
            </Grid>
        );
    }
    return (
        <Grid item xs={12}>
            <Autocomplete
                disablePortal
                options={customers}
                defaultValue={customers[customerIndex]}
                isOptionEqualToValue={(option, value) =>
                    option.id === value.id && option.label === value.label
                }
                onChange={(_, newValue) => {
                    if (newValue === null) {
                        dispatch(setCustomerId(null));
                    } else {
                        dispatch(setCustomerId(newValue.id));
                    }
                }}
                onInputChange={(_, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Customer Name"
                        error={isError}
                        helperText={isError && 'Customer ID is mandatory'}
                    />
                )}
            />
        </Grid>
    );
};

export default Customer;
