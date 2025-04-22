import React, { useEffect } from 'react';
import { injectReducer } from 'store/index';
import reducer from './store';
import { useDispatch, useSelector } from 'react-redux';
import { resetData, getDutySlips } from './store/dataSlice';
import { Notification, toast, Button } from 'components/ui';
import { AdaptableCard } from 'components/shared';
import DutySlipsHeader from './components/DutySlipsHeader';
import DutySlipsTable from './components/DutySlipsTable';
import TablePagination from './components/TablePagination';

injectReducer('dutySlipsList', reducer);
function Dashboard() {
    const dispatch = useDispatch();
    const success = useSelector((state) => state.dutySlipsList.data.success);
    const message = useSelector((state) => state.dutySlipsList.data.message);
    const filters = useSelector((state) => state.dutySlipsList.data.filters);

    useEffect(() => {
        dispatch(resetData());
    }, [dispatch]);

    useEffect(() => {
        switch (success) {
            case true:
                toast.push(
                    <Notification title={'Success'} type={'success'}>
                        {message}
                    </Notification>
                );
                break;
            case false:
                toast.push(
                    <Notification title={'Failed'} type={'danger'}>
                        {message}
                    </Notification>
                );
                break;
        }
        success && dispatch(getDutySlips());
    }, [success]);

    useEffect(() => {
        dispatch(getDutySlips());
    }, [filters]);
    
    return (
        <AdaptableCard className="" bodyClass="">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Duty Slips</h3>
                <DutySlipsHeader />
            </div>
            <DutySlipsTable />
            <TablePagination />
        </AdaptableCard>
    );
}

export default Dashboard;
