import React from 'react';
import { Grid, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setExtraTime } from './store/dataSlice';

const ExtraTime = () => {
    const dispatch = useDispatch();

    const extraTime =
        useSelector((state) => state.createDutySlip.data.extraTime) || '';
    const hasSubmit = useSelector(
        (state) => state.createDutySlip.data.hasSubmit
    );

    const hasError = hasSubmit && !extraTime;
    const currentPage = useSelector(
        (state) => state.createDutySlip.data.currentPage
    );
    const isDisabled = currentPage === 'view' ? true : false;
    return (
        <>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    id="extraTime"
                    name="extraTime"
                    label="Extra time"
                    type="number"
                    value={extraTime}
                    onChange={(e) => {
                        dispatch(setExtraTime(e.target.value));
                    }}
                    error={hasError}
                    helperText={hasError && 'Extra time field is mandatory'}
                    disabled={isDisabled}
                />
            </Grid>
        </>
    );
};

export default ExtraTime;
