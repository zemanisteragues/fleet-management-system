import React, { useEffect } from 'react';

import { Button, Notification, toast } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { injectReducer } from 'store/index';
import CarsList from './components/CarsList';
import CreateCar from './components/CreateCar';
import reducer from './store';
import { resetData } from './store/dataSlice';
import { AdaptableCard } from 'components/shared';
import TablePagination from './components/TablePagination';
import CarTableTools from './components/CarTableTools';

injectReducer('cars', reducer);
function Dashboard() {
    const dispatch = useDispatch();
    const success = useSelector((state) => state.cars.data.isSuccess);

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
        <div>
            <>
                <AdaptableCard className="h-full" bodyClass="h-full">
                    <div className="lg:flex items-center justify-between mb-4">
                        <h3 className="mb-4 lg:mb-0">Vehicles</h3>
                        <CarTableTools />
                    </div>
                    <CarsList />
                    <TablePagination />
                </AdaptableCard>
            </>
        </div>
    );
}

export default Dashboard;
