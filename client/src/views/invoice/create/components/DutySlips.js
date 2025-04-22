import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'components/ui';

import { DataTable } from 'components/shared';
import axios from 'axios';
import moment from 'moment';
import {
    addDutySlipItem,
    removeDutySlipItem,
    addAllDutySlipItem,
    removeAllDutySlipItem,
    setHasFetchedInvoiceDetails,
} from '../store/dataSlice';

const Checkable = () => {
    const dispatch = useDispatch();

    const data = useSelector((state) => state.invoiceCreate.data.dutySlips);
    const loading = useSelector((state) => state.invoiceCreate.data.loading);
    const selectDuty = useSelector((state) => state.selectedDutySlips);

    const [selectedRows, setSelectedRows] = useState([]);
    console.log('someee ', selectDuty);
    const [tableData, setTableData] = useState({
        total: 0,
        pageIndex: 1,
        pageSize: 50,
        query: '',
        sort: {
            order: '',
            key: '',
        },
    });

    const handleAction = (cellProps) => {
        console.log('Action clicked', cellProps);
    };

    const handleBatchAction = () => {
        console.log('selectedRows', selectedRows);
    };

    const columns = useMemo(
        () => [
            {
                header: 'Date',
                accessorKey: 'createdAt',
            },
            {
                header: 'Driver Name',
                accessorKey: 'driverName',
            },
            {
                header: 'Passenger',
                accessorKey: 'passengerName',
            },
            {
                header: 'Vehicle Used',
                accessorKey: 'registrationNumber',
            },
        ],
        []
    );

    const handlePaginationChange = (pageIndex) => {
        setTableData((prevData) => ({ ...prevData, ...{ pageIndex } }));
    };

    const handleSelectChange = (pageSize) => {
        setTableData((prevData) => ({ ...prevData, ...{ pageSize } }));
    };

    const handleSort = ({ order, key }) => {
        setTableData((prevData) => ({
            ...prevData,
            ...{ sort: { order, key } },
        }));
    };

    const handleRowSelect = (checked, row) => {
        console.log('check', checked);
        if (checked) {
            dispatch(addDutySlipItem(row.id));
        } else {
            dispatch(removeDutySlipItem(row.id));
        }
    };

    const handleAllRowSelect = (checked, rows) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original);
            const selectedIds = [];
            originalRows.forEach((row) => {
                selectedIds.push(row.id);
            });
            dispatch(addAllDutySlipItem(selectedIds));
            setSelectedRows(selectedIds);
        } else {
            setSelectedRows([]);
            dispatch(removeAllDutySlipItem());
        }
    };

    return (
        <>
            <DataTable
                selectable
                columns={columns}
                data={data}
                loading={loading}
                pagingData={tableData}
                onPaginationChange={handlePaginationChange}
                onSelectChange={handleSelectChange}
                onSort={handleSort}
                onCheckBoxChange={handleRowSelect}
                onIndeterminateCheckBoxChange={handleAllRowSelect}
            />
        </>
    );
};

const DutySlips = () => {
    const dispatch = useDispatch();

    const customerId = useSelector(
        (state) => state.invoiceCreate.data.customerId
    );

    const dutySlips = useSelector(
        (state) => state.invoiceCreate.data.dutySlips
    );
    console.log('thiss', dutySlips);
    useEffect(() => {
        dispatch(setHasFetchedInvoiceDetails(false));
    }, [dutySlips]);

    if (!customerId) {
        return null;
    }

    if (dutySlips.length === 0) {
        return (
            <div className="mt-8">
                <h4>No duty slips found for the customer</h4>
            </div>
        );
    }

    return (
        <div className="mt-8">
            <h4>Select Duty Slips for the customer</h4>
            <Checkable />
        </div>
    );
};

export default DutySlips;
