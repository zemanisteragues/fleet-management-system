import React from 'react';
import CustomersList from './CustomersList';
import CustomersTableTools from './CustomersTableTools';
import { AdaptableCard } from 'components/shared';
import { injectReducer } from 'store/index';
import reducer from './store';
import TablePagination from './components/TablePagination';
import { useDispatch, useSelector } from 'react-redux';
import { resetData } from './store/dataSlice';
import { Notification, toast, Button } from 'components/ui';
import { useEffect } from 'react';

injectReducer('customers', reducer);

function Dashboard() {
    const dispatch = useDispatch();
    const success = useSelector((state) => state.customers.data.isSuccess);
    const message = useSelector((state) => state.customers.data.message);

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

    const openFailedNotification = () => {
        toast.push(
            <Notification title={'Failed'} type={'danger'}>
                {message}
            </Notification>
        );
    };

    useEffect(() => {
        success === false && openFailedNotification();
    }, [success]);

    return (
        <>
            <AdaptableCard className="h-full" bodyClass="h-full">
                <div className="lg:flex items-center justify-between mb-4">
                    <h3 className="mb-4 lg:mb-0">Customers</h3>
                    <CustomersTableTools />
                </div>
                <CustomersList />
                <TablePagination />
            </AdaptableCard>
        </>
    );
}

export default Dashboard;
