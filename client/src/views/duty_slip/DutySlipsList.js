import React, { useEffect, useCallback, useMemo } from 'react';
import { Tag } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { getDutySlips } from './store/dataSlice';
import useThemeClass from 'utils/hooks/useThemeClass';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Table } from 'components/ui';
import { HiOutlinePencil, HiOutlineTrash, HiOutlineEye } from 'react-icons/hi';
import DeleteDialog from './components/DeleteDialog';

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

const ActionColumn = ({ row }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { textTheme } = useThemeClass();

    const onEdit = () => {
        navigate('/duty_slip/view/' + row.duty_slip_id);
    };

    if (!row.isActive) {
        return (
            <div className="flex text-lg">
                <span></span>
            </div>
        );
    }

    return (
        <div className="flex text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlineEye />
            </span>
            <DeleteDialog id={row.duty_slip_id} />
        </div>
    );
};

const DutySlipsList = () => {
    const dispatch = useDispatch();

    const data = useSelector((state) => state.dutySlips.data.dutySlips);
    const isSuccess = useSelector((state) => state.dutySlips.data.isSuccess);
    const loading = useSelector((state) => state.dutySlips.data.loading);

    useEffect(() => {
        dispatch(getDutySlips());
    }, [dispatch]);

    useEffect(() => {
        isSuccess && dispatch(getDutySlips());
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
                        <Th>Date</Th>
                        <Th>Customer Type</Th>
                        <Th>Customer Name</Th>
                        <Th>Passenger Name</Th>
                        <Th>Passenger Phone</Th>
                        <Th>Driver</Th>
                        <Th>Car</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                    </Tr>
                </THead>
                <TBody>
                    {data.map((dutySlip, index) => (
                        <Tr key={index}>
                            <Td>{index + 1}</Td>
                            <Td>
                                {moment(dutySlip.createdAt).format(
                                    'DD-MM-YYYY'
                                )}
                            </Td>
                            <Td>
                                {dutySlip.isCompany ? (
                                    <Company />
                                ) : (
                                    <Individual />
                                )}
                            </Td>
                            <Td>
                                {dutySlip.isCompany
                                    ? dutySlip.companyName
                                    : dutySlip.customer_first_name +
                                      ' ' +
                                      dutySlip.customer_last_name}
                            </Td>
                            <Td>{dutySlip.passengerName}</Td>
                            <Td>{dutySlip.passengerPhone || '-'}</Td>
                            <Td>
                                {dutySlip.driver_first_name +
                                    ' ' +
                                    dutySlip.driver_last_name}
                            </Td>
                            <Td>{dutySlip.registrationNumber || '-'}</Td>
                            <Td>
                                {dutySlip.isActive ? <Active /> : <InActive />}
                            </Td>
                            <Td>
                                <ActionColumn row={dutySlip} />
                            </Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>
        </div>
    );
};

export default DutySlipsList;
