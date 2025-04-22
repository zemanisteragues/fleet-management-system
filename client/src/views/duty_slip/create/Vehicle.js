import React, { useEffect } from 'react';
import { TextField, Autocomplete, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getVehicles, setVehicleId } from './store/dataSlice';

const Vehicle = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state);
    const vehicles = useSelector((state) => state.createDutySlip.data.vehicles);
    const vehicleId = useSelector(
        (state) => state.createDutySlip.data.vehicleId
    );
    const hasSubmit = useSelector(
        (state) => state.createDutySlip.data.hasSubmit
    );

    const [inputValue, setInputValue] = React.useState('');

    const isError = hasSubmit && vehicleId === null ? true : false;

    useEffect(() => {
        dispatch(getVehicles({ query: '' }));
    }, [dispatch]);

    useEffect(() => {
        if (inputValue.length < 3) {
            dispatch(getVehicles({ query: inputValue }));
        }
    }, [inputValue]);

    const currentPage = useSelector(
        (state) => state.createDutySlip.data.currentPage
    );
    const isDisabled = currentPage === 'view' ? true : false;

    if (currentPage === 'view') {
        const vehicleIndex = vehicles.findIndex(
            (vehicle) => vehicle.id === vehicleId
        );
        const driverName =
            vehicleIndex !== -1 ? vehicles[vehicleIndex].label : '';
        return (
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Vehicle Name"
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
                name="vehicleId"
                disablePortal
                options={vehicles}
                id="vehicleId"
                isOptionEqualToValue={(option, value) =>
                    option.id === value.id && option.label === value.label
                }
                onChange={(_, newValue) => {
                    if (newValue === null) {
                        dispatch(setVehicleId(null));
                    } else {
                        dispatch(setVehicleId(newValue.id));
                    }
                }}
                onInputChange={(_, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Vehicle"
                        error={isError}
                        helperText={isError && 'Vehicle ID is mandatory'}
                    />
                )}
            />
        </Grid>
    );
};

export default Vehicle;
