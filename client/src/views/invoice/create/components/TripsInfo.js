import React from 'react';
import { Table, Input } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { updateTrips } from '../store/dataSlice';
import { FaGasPump } from 'react-icons/fa';
import { FaRupeeSign } from 'react-icons/fa';
import NumberFormat from 'react-number-format';
const { Tr, Th, Td, THead, TBody } = Table;


const PriceInput = (props) => {
    return (
        <Input
            {...props}
            value={props.value}
            autoComplete="off"
            prefix={<FaRupeeSign />}
            size="sm"
        />
    );
};

const TripsRow = ({ row, index }) => {
    const dispatch = useDispatch();

    const renderInput = (label, key, value, isDisabled = true, prefix = '') => (
        <div>
            <label className="form-label">{label}</label>
            <Input
                type="text"
                className="form-control"
                value={value}
                disabled={isDisabled}
                size="sm"
                prefix={prefix}
                onChange={(e) => {
                    dispatch(
                        updateTrips({
                            key: key,
                            value: e.target.value,
                            index: index,
                        })
                    );
                }}
            />
        </div>
    );

    const renderNumberInput = (
        label,
        key,
        value,
        isDisabled = true,
        prefix = ''
    ) => {
        return (
            <div>
                <label className="form-label">{label}</label>
                <NumberFormat
                    value={value}
                    customInput={PriceInput}
                    allowNegative={false}
                    decimalScale={2}
                    onValueChange={(e) => {
                        dispatch(
                            updateTrips({
                                key: key,
                                value: e.value,
                                index: index,
                            })
                        );
                    }}
                />
            </div>
        );
    };

    return (
        <div className="grid grid-cols-12 gap-4 mt-2 mb-2">
            {renderInput(
                'Reporting Date',
                'startDate',
                moment(row.start_date).format('DD-MM-YYYY')
            )}
            {renderInput(
                'Release Date',
                'releaseDate',
                moment(row.release_date).format('DD-MM-YYYY')
            )}
            {renderInput('From', 'pickupLocation', row.pickupLocation)}
            {renderInput('To', 'dropLocation', row.dropLocation)}
            {renderInput(
                'Vehicle',
                'registrationNumber',
                row.registrationNumber
            )}
            {renderInput('Type', 'carType', row.carType)}
            {renderNumberInput(
                'Fare',
                'fare',
                row.fare,
                false,
                <FaRupeeSign />
            )}
            {renderInput('Total KM', 'totalKM', row.totalKM)}
            {renderNumberInput(
                'Fuel/KM',
                'fuelPerKM',
                row.fuelPerKM,
                false,
                <FaGasPump />
            )}
            {renderNumberInput(
                'Night Halt',
                'nightHalt',
                row.nightHalt,
                false,
                <FaRupeeSign />
            )}
            {renderNumberInput(
                'Toll',
                'toll',
                row.toll,
                false,
                <FaRupeeSign />
            )}
            {renderInput('Total', 'total', row.total, true, <FaRupeeSign />)}
        </div>
    );
};


 const TripsTable = (data) => {
    return (
        <div className="h-full" >
            <Table compact style={{
                height: '100%',
                border: '1px solid #e2e8f0',
            }}>
                <THead>
                    <Tr>
                        <Th>#</Th>
                        <Th>Booked By</Th>
                        <Th>Vehicle Id</Th>
                        <Th>Driver Name</Th>
                        <Th>Registration Number</Th>
                        <Th>Car Type</Th>
                        <Th>Base Price</Th>
                        <Th>Start KM</Th>
                        <Th>End KM</Th>
                        <Th>Duty Type</Th>
                        <Th>Sub Total</Th>
                    </Tr>
                </THead>
                <TBody>
                    {data.map((item, index) => {
                        return (
                            (
                                <Tr key={index} >
                                    <Td>{index+1}</Td>
                                    <Td>{item.bookedByPassengerName}</Td>
                                    <Td>{item.car_id}</Td>
                                    <Td>{item.driverName}</Td>
                                    <Td>{item.registrationNumber}</Td>
                                    <Td>{item.carType}</Td>
                                    <Td>{item.basePrice}</Td>
                                    <Td>{item.dutyStartKm}</Td>
                                    <Td>{item.dutyEndKm}</Td>
                                    <Td>{item.dutyType} </Td>
                                    <Td>₹ {item.subTotal}</Td>
                                </Tr>
                            )
                        )
                    })}
                </TBody>
            </Table>
        </div>
    )
}


const TripsInfo = () => {
    const dutySlips = useSelector(
        (state) => state.invoiceCreate.data.dutySlips
    );

    const seletctedCustomer = useSelector(
        (state) => state.invoiceCreate.data.selectedDutySlips
    );

    const trips = dutySlips.filter((item) => {
        for (let i = 0; i < seletctedCustomer.length; i++) {
            if (item.id === seletctedCustomer[i]) {
                return true;
            }
        }
    });

    return (
        <div>
            <h5 className="mt-6">Trip Information</h5>
            <p className="mb-6">Section to config trips information</p>
            {TripsTable(trips)}
        </div>
    );
};

export default TripsInfo;
