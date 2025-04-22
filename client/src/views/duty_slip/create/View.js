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
import { useDispatch } from 'react-redux';
import { resetData } from './store/dataSlice';
import { getDutySlipById } from './store/dataSlice';
import { setCurrentPage } from './store/dataSlice';

injectReducer('createDutySlip', reducer);

const View = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetData());
    }, [dispatch]);

    useEffect(() => {
        const path = window.location.pathname.substring(
            window.location.pathname.lastIndexOf('/') + 1
        );
        const requestParam = { id: path };
        console.log(requestParam);
        dispatch(getDutySlipById(requestParam));
        //dispatch(setCurrentPage('view'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.pathname]);

    return (
        <>
            <h3 className="mb-3">Duty Slip Details</h3>
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

export default View;
