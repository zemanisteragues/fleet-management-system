import React, { useEffect } from 'react';
import { injectReducer } from 'store/index';
import reducer from './store';
import CreatePanel from './components/CreatePanel';
import { useDispatch, useSelector } from 'react-redux';
import { getDropdownData, resetDutySlipDetails } from './store/dataSlice';
import { Notification, toast } from 'components/ui';
import { getDutySlips } from '../list/store/dataSlice';

injectReducer('dutySlipsCreate', reducer);

const CreateDutySlip = () => {
    const dispatch = useDispatch();
    const success = useSelector((state) => state.dutySlipsCreate.data.success);
    useEffect(() => {
        dispatch(getDropdownData());
    }, [dispatch]);

    useEffect(() => {
        switch (success) {
            case true:
                toast.push(
                    <Notification title={'Success'} type={'success'}>
                        Record updated successfully
                    </Notification>
                );
                break;
            case false:
                toast.push(
                    <Notification title={'Failed'} type={'danger'}>
                        Record failed to update
                    </Notification>
                );
                break;
        }
        success && dispatch(getDutySlips());
    }, [success]);


    return (
        <div className='block lg:inline-block md:mx-2 md:mb-0 mb-4'>
            <CreatePanel />
        </div>
    );
};

export default CreateDutySlip;
