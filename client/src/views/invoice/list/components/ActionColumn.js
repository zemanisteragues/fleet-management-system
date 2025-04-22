import React, { useState } from 'react';
import { Select } from 'components/ui';
import { ConfirmDialog } from 'components/shared';
import { useDispatch } from 'react-redux';
import { updateStatus } from '../store/dataSlice';
import { current } from '@reduxjs/toolkit';

// CREATED','SENT','PAID','PARTIALLY_PAID','OVERDUE','CANCELLED
const selectOptions = [
    { value: 'CREATED', label: 'Created' },
    { value: 'SENT', label: 'Sent' },
    { value: 'PAID', label: 'Paid' },
    // { value: 'PARTIALLY_PAID', label: 'Partially Paid' },
    { value: 'OVERDUE', label: 'Overdue' },
    { value: 'CANCELLED', label: 'Cancelled' },
];

const ActionColumn = ({ currentStatus, invoiceId }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const onHandleChange = (e) => {
        const value = e.value;
        if (value === 'CANCELLED') {
            setOpen(true);
        } else {
            dispatch(updateStatus({ invoiceId: invoiceId, status: value }));
        }
    };

    if (currentStatus === 'CANCELLED') {
        return <div>-</div>;
    }
    return (
        <div>
            <ConfirmDialog
                isOpen={open}
                onClose={() => setOpen(false)}
                onRequestClose={() => setOpen(false)}
                type={'warning'}
                title={'Warning'}
                onCancel={() => setOpen(false)}
                onConfirm={() => {
                    dispatch(
                        updateStatus({
                            invoiceId: invoiceId,
                            status: 'CANCELLED',
                        })
                    );
                    setOpen(false);
                }}
                confirmButtonColor={'amber-600'}
            >
                <p>
                    Warning! Cancelled invoices will not be reverted. All the
                    duty slips will be free after this operation.
                </p>
            </ConfirmDialog>
            <Select
                placeholder="Please Select"
                options={selectOptions}
                value={selectOptions.find((obj) => obj.value === currentStatus)}
                onChange={onHandleChange}
                size="sm"
            ></Select>
        </div>
    );
};

export default ActionColumn;
