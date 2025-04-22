import React, { useEffect, useCallback, useMemo } from 'react';
import { Tag } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import {
    getDrivers,
    setIsDrawerOpen,
    setUpdateDriverRecordData,
} from './store/dataSlice';
import useThemeClass from 'utils/hooks/useThemeClass';

import { Table } from 'components/ui';
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

const { Tr, Th, Td, THead, TBody } = Table;

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

const ActionColumn = ({ row }) => {
    const dispatch = useDispatch();
    const { textTheme } = useThemeClass();

    const onEdit = () => {
        const data = {
            firstName: row.firstName,
            lastName: row.lastName,
            phone: row.phone,
            address: row.address,
            licenseNumber: row.licenseNumber,
            licenseExpiry: row.licenseExpiry,
            licenseImage: '',
            isSubmit: false,
            driverId: row.id,
        };
        dispatch(setUpdateDriverRecordData(data));
        dispatch(setIsDrawerOpen(true));
    };

    const onDelete = () => {
        //dispatch(toggleDeleteConfirmation(true))
        //dispatch(setSelectedProduct(row.id))
    };

    return (
        <div className="flex text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>
        </div>
    );
};

const DriversList = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.drivers.data.drivers);
    const isSuccess = useSelector((state) => state.drivers.data.isSuccess);
    const loading = useSelector((state) => state.drivers.data.loading);

    useEffect(() => {
        dispatch(getDrivers());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getDrivers());
    }, [isSuccess]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Table compact>
                <THead>
                    <Tr>
                        <Th>#</Th>
                        <Th>First Name</Th>
                        <Th>Last Name</Th>
                        <Th>Phone</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                    </Tr>
                </THead>
                <TBody>
                    {data.map((driver, index) => (
                        <Tr key={index}>
                            <Td>{index + 1}</Td>
                            <Td>{driver.firstName}</Td>
                            <Td>{driver.lastName}</Td>
                            <Td>{driver.phone}</Td>
                            <Td>
                                {driver.isActive ? <Active /> : <InActive />}
                            </Td>
                            <Td>
                                <ActionColumn row={driver} />
                            </Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>
        </div>
    );
};

export default DriversList;
