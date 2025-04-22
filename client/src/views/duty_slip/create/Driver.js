import React, { useEffect } from 'react';
import { TextField, Autocomplete, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getDrivers, setDriverId, setTableData } from './store/dataSlice';

const Driver = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state);
    const drivers = useSelector((state) => state.createDutySlip.data.drivers);
    const driverId = useSelector((state) => state.createDutySlip.data.driverId);
    const hasSubmit = useSelector(
        (state) => state.createDutySlip.data.hasSubmit
    );

    const [inputValue, setInputValue] = React.useState('');

    const isError = hasSubmit && driverId === null ? true : false;

    useEffect(() => {
        dispatch(getDrivers({ query: '' }));
    }, [dispatch]);

    useEffect(() => {
        if (inputValue.length < 3) {
            dispatch(getDrivers({ query: inputValue }));
        }
    }, [inputValue]);

    const currentPage = useSelector(
        (state) => state.createDutySlip.data.currentPage
    );
    const isDisabled = currentPage === 'view' ? true : false;

    const driverIndex = drivers.findIndex((driver) => driver.id === driverId);
    const driverName = driverIndex !== -1 ? drivers[driverIndex].label : '';
    if (currentPage === 'view') {
        return (
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Driver Name"
                    value={driverName}
                    disabled
                    fullWidth
                />
            </Grid>
        );
    }

    return (
        <Grid item xs={12} sm={6}>
            <Autocomplete
                name="driverId"
                disablePortal
                options={drivers}
                id="driverId"
                isOptionEqualToValue={(option, value) =>
                    option.id === value.id && option.label === value.label
                }
                onChange={(_, newValue) => {
                    if (newValue === null) {
                        dispatch(setDriverId(null));
                    } else {
                        dispatch(setDriverId(newValue.id));
                    }
                }}
                onInputChange={(_, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Driver Name"
                        error={isError}
                        helperText={isError && 'Driver ID is mandatory'}
                    />
                )}
            />
        </Grid>
    );
};

export default Driver;
