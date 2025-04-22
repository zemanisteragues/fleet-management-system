import React from 'react';
import { Table } from 'components/ui';
import { useSelector } from 'react-redux';
import moment from 'moment';
import NumberFormat from 'react-number-format';
// import toWords from 'number-to-words';
import { ToWords } from 'to-words';

const toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
        currency: true,
        ignoreDecimal: false,
        ignoreZeroCurrency: false,
        doNotAddOnly: false,
        currencyOptions: {
            // can be used to override defaults for the selected locale
            name: 'Rupee',
            plural: 'Rupees',
            symbol: '₹',
            fractionalUnit: {
                name: 'Paisa',
                plural: 'Paise',
                symbol: '',
            },
        },
    },
});
const ContentTable = ({ subTotal, igst, grandTotal, trips }) => {
    const { THead, TBody, Tr, Th, Td, TFoot } = Table;

    const TFootRows = ({ label, value }) => {
        return (
            <Tr>
                <Td className="!border-t-0" colSpan="2"></Td>
                <Td className="font-semibold !border-t-0">{label}</Td>
                <Td className="!py-5 !border-t-0">
                    <PriceAmount amount={value} />
                </Td>
            </Tr>
        );
    };

    const PriceAmount = ({ amount }) => {
        return (
            <NumberFormat
                displayType="text"
                value={(Math.round(amount * 100) / 100).toFixed(2)}
                prefix={'₹'}
                thousandSeparator={true}
            />
        );
    };

    const words = toWords.convert(grandTotal || 0);
    return (
        <div>
            <Table>
                <THead>
                    <Tr>
                        <Th>#</Th>
                        <Th>Dates</Th>
                        <Th>From-To</Th>
                        <Th>Vehicle</Th>
                        <Th>Amount</Th>
                    </Tr>
                </THead>
                <TBody>
                    <>
                        {trips.map((trip, index) => (
                            <Tr key={index}>

                                <Td>{index + 1}</Td>

                                <Td>
                                    <>
                                        <b>Start Date: </b>
                                        {trip.dutyStartDateAndTime ? moment(trip.dutyStartDateAndTime).format(
                                            'DD MMM, hh:mm A'
                                        ) : 'N/A'}
                                        <br />
                                        <b>Release Date: </b>
                                        {trip.dutyEndDateAndTime ? moment(trip.dutyEndDateAndTime).format(
                                            'DD MMM, hh:mm A'
                                        ) : 'N/A'}
                                    </>
                                </Td>
                                <Td>
                                    <>
                                        <b>Pickup: </b>
                                        {trip.startFrom || 'N/A'}
                                        <br />
                                        <b>Drop: </b>
                                        {trip.endTo || 'N/A'}
                                    </>
                                </Td>
                                <Td>
                                    <>
                                        <div>
                                            <b>Vehicle: </b>
                                            {trip.carType || 'N/A'}
                                        </div>
                                        <div>
                                            <b>Registration No: </b>
                                            {trip.registrationNumber || 'N/A'}
                                        </div>
                                    </>
                                </Td>
                                <Td>
                                    <b>Total: &#8377; </b>
                                    {trip.subTotal || 0}
                                    {'/-'}
                                    <br />
                                </Td>
                            </Tr>
                        ))}
                    </>
                </TBody>

            </Table>
            <div className="flex flex-col mt-8 p-4 !border-t-2">
                <div className="" colSpan="2"></div>
                <div>
                    <div className="font-semibold text-base">IGST : <PriceAmount amount={igst || 0} />  </div>
                    <div className="font-semibold text-base">Grand Total : <PriceAmount amount={grandTotal || 0} /> </div>
                    <p className="capitalize font-bold">Rupees {words} /-</p>
                </div>

            </div>
        </div>
    );
};

export default ContentTable;
