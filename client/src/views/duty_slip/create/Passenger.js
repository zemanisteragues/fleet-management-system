import React from 'react';
import { Grid, TextField } from '@mui/material';
import { Card } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { setBookedByName, setBookedByPhone } from './store/dataSlice';

const Passenger = () => {
    const dispatch = useDispatch();

    const bookedByName =
        useSelector((state) => state.createDutySlip.data.bookedByName) || '';
    const bookedByPhoneNumber =
        useSelector((state) => state.createDutySlip.data.bookedByPhone) || '';
    const hasSubmit = useSelector(
        (state) => state.createDutySlip.data.hasSubmit
    );

    const currentPage = useSelector(
        (state) => state.createDutySlip.data.currentPage
    );
    const isDisabled = currentPage === 'view' ? true : false;

    return (
        <Grid item xs={12}>
            <Card
                header={<span>Booked by / Passenger</span>}
                headerClass="font-semibold text-lg"
                bodyClass="text-center"
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="bookedByName"
                            name="bookedByName"
                            label="Booked by Name*"
                            value={bookedByName}
                            onChange={(e) =>
                                dispatch(setBookedByName(e.target.value))
                            }
                            error={hasSubmit && !bookedByName}
                            helperText={
                                hasSubmit &&
                                !bookedByName &&
                                'Booked by name field is mandatory'
                            }
                            disabled={isDisabled}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="bookedByPhoneNumber"
                            name="bookedByPhoneNumber"
                            label="Booked by Phone Number"
                            value={bookedByPhoneNumber}
                            onChange={(e) =>
                                dispatch(setBookedByPhone(e.target.value))
                            }
                            error={hasSubmit && !bookedByPhoneNumber}
                            helperText={
                                hasSubmit &&
                                !bookedByName &&
                                'Booked by phone number field is mandatory'
                            }
                            disabled={isDisabled}
                        />
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
};

export default Passenger;
