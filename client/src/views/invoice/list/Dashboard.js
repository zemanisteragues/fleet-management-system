import React, { useEffect } from 'react';
import { injectReducer } from 'store/index';
import reducer from './store';
import { useDispatch, useSelector } from 'react-redux';
import { resetData } from './store/dataSlice';
import { Notification, toast, Button } from 'components/ui';
import { AdaptableCard } from 'components/shared';
import InvoiceHeader from './components/InvoiceHeader';
import InvoiceTable from './components/InvoiceTable';

injectReducer('invoicesList', reducer);
function Dashboard() {
    const dispatch = useDispatch();
    const success = useSelector((state) => state.invoicesList.data.isSuccess);

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
                <h3 className="mb-4 lg:mb-0">Invoice</h3>
                <InvoiceHeader />
            </div>
            <InvoiceTable />
            {/* <TablePagination /> */}
        </AdaptableCard>
    );
}

export default Dashboard;
