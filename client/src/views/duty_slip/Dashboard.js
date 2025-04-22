import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Button } from 'components/ui';
import { useNavigate } from 'react-router-dom';
import DisplayList from './DutySlipsList';
import { injectReducer } from 'store/index';
import reducer from './store';
import { Notification, toast } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { resetData } from './store/dataSlice';
import { AdaptableCard } from 'components/shared';

injectReducer('dutySlips', reducer);

const CREATE_DUTY_SLIP_PATH = 'duty_slip/create';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onCreateDutySlipClick = () => {
        window.open(`${window.location.origin}/${CREATE_DUTY_SLIP_PATH}`);

        //navigate(CREATE_DUTY_SLIP_PATH);
    };

    const success = useSelector((state) => state.dutySlips.data.isSuccess);

    useEffect(() => {
        dispatch(resetData());
    }, [dispatch]);

    const openNotification = () => {
        toast.push(
            <Notification title={'Success'} type={'success'}>
                Record updated successfully
            </Notification>
        );
    };

    useEffect(() => {
        success && openNotification();
    }, [success]);

    return (
        <>
            <AdaptableCard className="h-full" bodyClass="h-full">
                <div className="lg:flex items-center justify-between mb-4">
                    <h3 className="mb-4 lg:mb-0">Duty Slips</h3>
                    <Button
                        variant="solid"
                        color="blue-600"
                        size="sm"
                        onClick={() => onCreateDutySlipClick()}
                    >
                        Create a new duty slip
                    </Button>
                </div>
                <DisplayList />
                {/* <TablePagination /> */}
            </AdaptableCard>
        </>
    );
};

export default Dashboard;
