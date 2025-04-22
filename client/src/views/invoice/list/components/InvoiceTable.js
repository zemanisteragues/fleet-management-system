import React, { useEffect } from 'react';
import { Tag, Button } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';

// import CustomerEditDialog from './CustomerEditDialog'
import { Table, Input } from 'components/ui';
import { getInvoices } from '../store/dataSlice';
import ActionColumn from './ActionColumn';
import moment from 'moment';
import { UPLOADS_URL } from 'constants/api.constant';

const { Tr, Th, Td, THead, TBody } = Table;

// CREATED','SENT','PAID','PARTIALLY_PAID','OVERDUE','CANCELLED
const Status = ({ status }) => {
    switch (status) {
        case 'CREATED':
            return (
                <Tag className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100 border-0 rounded">
                    Created
                </Tag>
            );
        case 'SENT':
            return (
                <Tag className="bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-100 border-0 rounded">
                    Sent
                </Tag>
            );
        case 'PAID':
            return (
                <Tag className="bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-100 border-0 rounded">
                    Paid
                </Tag>
            );
        case 'PARTIALLY_PAID':
            return (
                <Tag className="bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-100 border-0 rounded">
                    Partially Paid
                </Tag>
            );
        case 'OVERDUE':
            return (
                <Tag className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100 border-0 rounded">
                    Overdue
                </Tag>
            );
        case 'CANCELLED':
            return (
                <Tag className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100 border-0 rounded">
                    Cancelled
                </Tag>
            );
        default:
            return (
                <Tag className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100 border-0 rounded">
                    Created
                </Tag>
            );
    }
};

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

const InvoiceTable = () => {
    const dispatch = useDispatch();

    const data = useSelector((state) => state.invoicesList.data.invoices);

    useEffect(() => {
        dispatch(getInvoices());
    }, [dispatch]);

    const loading = useSelector((state) => state.invoicesList.data.loading);
    if (loading) {
        return <div>Loading...</div>;
    }

    const onInvoiceClick = (invoiceNum) => {
        window.open(`${UPLOADS_URL}/${invoiceNum}.pdf`);
    }

    return (
        <div className="h-full">
            <Table compact style={{ 
                height: '100%',
                border : '1px solid #e2e8f0',
                marginBottom : 200
                }}>
                <THead>
                    <Tr>
                        <Th>#</Th>
                        <Th>Invoice Number</Th>
                        <Th>Date</Th>
                        <Th>Customer</Th>
                        <Th>Total Amount</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                        <Th>View</Th>
                    </Tr>
                </THead>
                <TBody>
                    {data.map((customer, index) => (
                        <Tr key={customer.id}>
                            <Td>{index + 1}</Td>
                            <Td>{customer.invoice_number}</Td>
                            <Td>
                                {moment(customer.invoice_date).format(
                                    'DD MMM, YYYY'
                                )}
                            </Td>
                            <Td>{customer.billed_to}</Td>
                            <Td>₹ {customer.total}</Td>
                            <Td>
                                <Status status={customer.invoice_status} />
                            </Td>
                            <Td>
                                <ActionColumn
                                    currentStatus={customer.invoice_status}
                                    invoiceId={customer.id}
                                />
                            </Td>
                            <Td>
                                <Button size="xs" onClick={() => onInvoiceClick(customer?.invoice_number)}>View Invoice</Button>
                            </Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>
        </div>
    );
};

export default InvoiceTable;
