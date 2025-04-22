import React, { useEffect } from 'react';
import { Tag, Button, Badge } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'components/ui';
import { getDutySlips } from '../store/dataSlice';
import moment from 'moment';
import { AiOutlineEye } from 'react-icons/ai';
import {
    HiOutlinePencil,
} from 'react-icons/hi';
import Status from './Status';
import CancelDutySlip from './CancelDutySlip';
import { setIsOpen, setDutySlipDetails } from '../../create/store/dataSlice';
import { dutyTypes } from 'views/dutyslip/create/constants/utils';

const { Tr, Th, Td, THead, TBody } = Table;

// using momentjs to convert duty time to readable format in DD-MM-YYYY hh:mm A
const dt2ReadableFormat = (dutyStartTime, dutyEndTime) => {
    const dutyStart = moment(dutyStartTime).format('DD-MMMM, hh:mm A');
    const dutyEnd = moment(dutyEndTime).format('DD-MMMM hh:mm A');
    return `${dutyStart} to ${dutyEnd}`;
};

const dt2ReadableFormatSingleDate = (dutyTime) => {
    const dutyStart = moment(dutyTime).format('DD-MMMM, hh:mm A');
    return `${dutyStart}`;
};

const DutySlipsTable = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.dutySlipsList.data.dutySlips);
    const pageSize = useSelector(state => state.dutySlipsList.data.filters.pageSize);
    const pageIndex = useSelector(state => state.dutySlipsList.data.filters.pageIndex);

    useEffect(() => {
        dispatch(getDutySlips());
    }, [dispatch]);

    const loading = useSelector((state) => state.dutySlipsList.data.loading);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleViewButtonClick = (duty) => {
        dispatch(setDutySlipDetails(duty));
        dispatch(setIsOpen(true));
    };

    const getDutyType = (dutyType) => {
        const dutyTypeObj = dutyTypes().find(
            (duty) => duty.dutyType === dutyType
        );
        return dutyTypeObj.dutyType;
    };

    const DutyTypeTag = ({ dutyType }) => {
        // const dutyTypeObj = dutyTypes().find(
        //     (duty) => duty.dutyTypes === dutyType
        // );
        return <Badge
            content={dutyType}
            innerClass={"bg-orange-500"}
        />
    };

    return (
        <div>
            <Table compact>
                <THead>
                    <Tr>
                        <Th>#</Th>
                        <Th>Start Date</Th>
                        <Th>End Date</Th>
                        <Th>Customer</Th>
                        <Th>Passenger</Th>
                        <Th>From-To</Th>
                        <Th>Driver</Th>
                        <Th>Vehicle</Th>
                        <Th>DutyType</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                        <Th>View</Th>
                    </Tr>
                </THead>
                <TBody>
                    {data.map((duty, index) => (
                        <Tr key={duty.id}>
                            <Td>{(pageSize * (pageIndex-1)) + index + 1}</Td>
                            <Td>
                                {dt2ReadableFormatSingleDate(duty.dutyStartDateAndTime)}
                            </Td>
                            <Td>
                                {dt2ReadableFormatSingleDate(duty.dutyEndDateAndTime)}
                            </Td>
                            <Td>{duty.customerName}</Td>
                            <Td>{duty.bookedByPassengerName || '-'}</Td>
                            <Td>{`${duty.startFrom} - ${duty.endTo}`}</Td>
                            <Td>{duty.driverName}</Td>
                            <Td>{duty.registrationNumber}</Td>
                            <Td><DutyTypeTag dutyType={duty.dutyType}/></Td>
                            <Td>
                                <Status status={duty.status} />
                            </Td>
                            <Td>
                                <CancelDutySlip
                                    status={duty.status}
                                    id={duty.id}
                                />
                            </Td>
                            <Td>
                                <Button
                                    size="xs"
                                    icon={<HiOutlinePencil />}
                                    onClick={() => handleViewButtonClick(duty)}
                                    disabled={duty.status === 'close'? true: false }
                                >
                                    Edit
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>
        </div>
    );
};

export default DutySlipsTable;
