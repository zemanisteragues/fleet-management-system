import React from 'react';
import InvoiceSteps from './components/InvoiceSteps';
import Submit from './components/Submit';
import { injectReducer } from 'store/index';
import reducer from './store';

injectReducer('invoiceCreate', reducer);

const Dashboard = () => {
    return (
        <div>
            <h3>Create Invoice</h3>
            <div className="h-screen mb-20">
                <InvoiceSteps />
            </div>
            <Submit />
        </div>
    );
};

export default Dashboard;
