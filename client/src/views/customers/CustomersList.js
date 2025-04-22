import React, { useEffect } from 'react';
import { Tag } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import {
    getCustomers,
    getCustomersByQuery,
    resetFilters,
} from './store/dataSlice';

// import CustomerEditDialog from './CustomerEditDialog'
import { Table, Input } from 'components/ui';
import ActionColumn from './components/ActionColumn';

const { Tr, Th, Td, THead, TBody, Sorter } = Table;

const Active = () => {
    return (
        <Tag className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100 border-0 rounded">
            Active
        </Tag>
    );
};

const InActive = () => {
    return (
        <Tag className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100 border-0 rounded">
            Inactive
        </Tag>
    );
};

const Company = () => {
    return (
        <Tag className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100 border-0 rounded">
            Company
        </Tag>
    );
};

const Individual = () => {
    return (
        <Tag className="bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-100 border-0 rounded">
            Individual
        </Tag>
    );
};

const CustomersList = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.customers.data.customers);
    const loading = useSelector((state) => state.customers.data.loading);
    const success = useSelector((state) => state.customers.data.isSuccess);

    useEffect(() => {
        dispatch(getCustomersByQuery());
    }, [dispatch]);

    useEffect(() => {
        success && dispatch(resetFilters());
        success && dispatch(getCustomersByQuery());
    }, [success]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Table compact>
                <THead>
                    <Tr>
                        <Th>#</Th>
                        <Th>Type</Th>
                        <Th>Name</Th>
                        <Th>Contact</Th>
                        <Th>Address</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                    </Tr>
                </THead>
                <TBody>
                    {data.map((customer, index) => (
                        <Tr key={customer.id}>
                            <Td>{index + 1}</Td>
                            <Td>
                                {customer.isCompany ? (
                                    <Company />
                                ) : (
                                    <Individual />
                                )}
                            </Td>
                            <Td>
                                {customer.isCompany
                                    ? `${customer.companyName}`
                                    : `${customer.firstName} ${customer.lastName}`}
                            </Td>
                            <Td>{customer.phone}</Td>
                            <Td>{customer.address}</Td>
                            <Td>
                                {customer.isActive ? <Active /> : <InActive />}
                            </Td>
                            <Td>
                                <ActionColumn row={customer} />
                            </Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>
        </div>
    );
};

export default CustomersList;
