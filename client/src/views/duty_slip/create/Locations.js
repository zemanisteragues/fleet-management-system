import React from 'react';
import { Grid, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setFromLocation, setToLocation } from './store/dataSlice';

const Locations = () => {
    const dispatch = useDispatch();

    const fromLocation =
        useSelector((state) => state.createDutySlip.data.fromLocation) || '';
    const toLocation =
        useSelector((state) => state.createDutySlip.data.toLocation) || '';
    const hasSubmit = useSelector(
        (state) => state.createDutySlip.data.hasSubmit
    );

    const fromHasError = hasSubmit && !fromLocation;
    const toHasError = hasSubmit && !toLocation;

    return (
        <>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    id="from"
                    name="from"
                    label="From Location"
                    value={fromLocation}
                    onChange={(e) => {
                        dispatch(setFromLocation(e.target.value));
                    }}
                    error={fromHasError}
                    helperText={toHasError && 'This field is mandatory'}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    id="to"
                    name="to"
                    label="To Location"
                    value={toLocation}
                    onChange={(e) => {
                        dispatch(setToLocation(e.target.value));
                    }}
                    error={toHasError}
                    helperText={toHasError && 'This field is mandatory'}
                />
            </Grid>
        </>
    );
};

export default Locations;
