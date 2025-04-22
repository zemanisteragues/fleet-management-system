import React from 'react';

import CustomerSearch from './components/CustomerSearch';
import AddCustomer from './components/AddCustomer';
import CustomerFilters from './components/CustomerFilters';
import CustomerType from './components/CustomerType';

function CustomersTableTools() {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <CustomerSearch />
            <CustomerFilters />
            <CustomerType />
            <AddCustomer />
        </div>
    );
}

export default CustomersTableTools;
