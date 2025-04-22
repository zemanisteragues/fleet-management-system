import React, { useEffect } from 'react';
import DriversList from './DriversList';
import { injectReducer } from 'store/index';
import reducer from './store';
import { useDispatch, useSelector } from 'react-redux';
import { resetData } from './store/dataSlice';
import { Notification, toast, Button } from 'components/ui';
import { AdaptableCard } from 'components/shared';
import CreateDriver from './CreateDriver';
import TablePagination from './components/TablePagination';
import DriverTableTools from './components/DriverTableTools';

injectReducer('drivers', reducer);
function Dashboard() {
    const dispatch = useDispatch();
    const success = useSelector((state) => state.drivers.data.isSuccess);

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
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Drivers</h3>
                <DriverTableTools />
            </div>
            <DriversList />
            <TablePagination />
        </AdaptableCard>
    );
}

export default Dashboard;
