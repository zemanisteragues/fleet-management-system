import { Card, Upload } from 'components/ui';
import { injectReducer } from 'store/index';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Customer from './Customer';
import Driver from './Driver';
import DutySlipRows from './DutySlipRows';
import ExtraTime from './ExtraTime';
import Grid from '@mui/material/Grid';
import Locations from './Locations';
import Passenger from './Passenger';
import React, { useState, useEffect } from 'react';
import reducer from './store';
import TextField from '@mui/material/TextField';
import Vehicle from './Vehicle';
import Submit from './Submit';
import Uploader from './Uploader';
import { useDispatch, useSelector } from 'react-redux';
import { resetData } from './store/dataSlice';
injectReducer('createDutySlip', reducer);

const BookingForm = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetData());
    }, [dispatch]);

    return (
        <>
            <h3 className="mb-3">Create new duty slips</h3>
            <Box sx={{ width: '100%' }}>
                <Grid container spacing={2}>
                    <Customer />
                    <Passenger />
                    <Vehicle />
                    <Driver />
                    <DutySlipRows />
                    <ExtraTime />
                </Grid>
                <Uploader />
                <Submit />
            </Box>
        </>
    );
};

export default BookingForm;
