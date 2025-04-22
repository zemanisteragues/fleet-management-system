import React from 'react';
import InvoiceSearch from './InvoiceSearch';
import AddInvoice from './AddInvoice';
import InvoiceCustomerTypeFilter from './InvoiceCustomerTypeFilter';
import InvoiceDateRange from './InvoiceDateRange';

const InvoiceHeader = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <InvoiceSearch />
            <InvoiceCustomerTypeFilter />
            {/* <InvoiceDateRange /> */}
            <AddInvoice />
        </div>
    );
};

export default InvoiceHeader;
