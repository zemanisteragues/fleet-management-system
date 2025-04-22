import React, { useEffect, useCallback, useMemo } from 'react';
import { Tag } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import {
    getCars,
    setIsDrawerOpen,
    setUpdateCarRecordData,
} from '../store/dataSlice';
import useThemeClass from 'utils/hooks/useThemeClass';

import { Table } from 'components/ui';
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import DeleteDialog from './DeleteDialog';

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
    //const navigate = useNavigate()

    const onEdit = () => {
        //open Drawer with ID
        const data = {
            registrationNumber: row.registrationNumber,
            carType: row.carType,
            isSubmit: false,
            carId: row.id,
        };
        dispatch(setUpdateCarRecordData(data));
        dispatch(setIsDrawerOpen(true));
    };

    if (!row.isActive) {
        return <div className="flex text-lg">-</div>;
    }

    return (
        <div className="flex text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>
            <DeleteDialog id={row.id} />
        </div>
    );
};

const CarsList = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.cars.data.cars);
    const isSuccess = useSelector((state) => state.cars.data.isSuccess);
    const loading = useSelector((state) => state.cars.data.loading);

    const { filters } = useSelector((state) => state.cars.data);
    const { currentPage, carStatus, query } = filters;

    useEffect(() => {
        dispatch(getCars());
    }, [currentPage, carStatus, query, dispatch]);

    useEffect(() => {
        isSuccess && dispatch(getCars());
    }, [isSuccess, dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    console.log('filter', filters);
    return (
        <div>
            <Table compact>
                <THead>
                    <Tr>
                        <Th>#</Th>
                        <Th>Registration Number</Th>
                        <Th>Vehicle Description</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                    </Tr>
                </THead>
                <TBody>
                    {data.map((car, index) => (
                        <Tr key={index}>
                            <Td>{(currentPage - 1) * 10 + index + 1}</Td>
                            <Td>{car.registrationNumber}</Td>
                            <Td>{car.carType}</Td>
                            <Td>{car.isActive ? <Active /> : <InActive />}</Td>
                            <Td>
                                <ActionColumn row={car} />
                            </Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>
        </div>
    );
};

export default CarsList;
