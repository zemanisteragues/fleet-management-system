import React, { useEffect } from 'react';
import { Table } from 'components/ui';
import { Card } from 'components/ui';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import duration from 'dayjs/plugin/duration';
import {
    calculateExtraTime,
    calculateExtraTimeCost,
    calculateExtraKms,
    calculateExtraKmCost,
    calculateTotalCost,
} from '../constants/utils';
import { use } from 'i18next';
import { min, set } from 'lodash';

dayjs.extend(minMax);
dayjs.extend(duration);

const { Tr, Th, Td, THead, TBody } = Table;

const CostDetails = (props) => {
    const { values, errors, touched } = props;

    const {
        dutyStartKm,
        dutyEndKm,
        dutyStartDateAndTime,
        dutyEndDateAndTime,
        perExtraKmPrice,
        perExtraHrPrice,
        dutyType,
        basePrice,
        tollTax,
        nightHaltCharges,
    } = values;

    console.log(values);

    const { ignoreLastDay } = values;

    const totalKm = dutyEndKm - dutyStartKm;

    const startDate = dayjs(dutyStartDateAndTime);
    const endDate = dayjs(dutyEndDateAndTime);
    const duration = endDate.diff(startDate);
    let actualHours = Math.floor(duration / 3600000);
    let actualMinutes = Math.floor((duration - actualHours * 3600000) / 60000);
    let actualDays = Math.floor(actualHours / 24);
    const [hours, setHours] = React.useState(actualHours);
    const [minutes, setMinutes] = React.useState(actualMinutes);
    const [days, setDays] = React.useState(actualDays);

    const [extraHours, setExtraHours] = React.useState(0);
    const [extraHoursCost, setExtraHoursCost] = React.useState(0);
    const [extraKms, setExtraKms] = React.useState(0);
    const [extraKmsCost, setExtraKmsCost] = React.useState(0);
    const [totalCost, setTotalCost] = React.useState(0);

    useEffect(() => {
        console.log('ignoreLastDay');
        if (ignoreLastDay) {
            if (hours > 24) {
                let temp = hours - hours % 24;
                setHours(temp);
                setMinutes(0);
            }
        } else {
            setHours(actualHours);
            setMinutes(actualMinutes);
        }
    }, [ignoreLastDay, dutyEndDateAndTime, dutyStartDateAndTime]);


    useEffect(() => {
        const fetch = async () => {
            let _extraTime = await calculateExtraTime(dutyType, hours, minutes)
            let _extraKms = await calculateExtraKms(dutyType, totalKm, hours)
            let _extraTimeCost = await calculateExtraTimeCost(dutyType, hours, minutes, perExtraHrPrice)
            let _extraKmsCost = await calculateExtraKmCost(dutyType, totalKm, perExtraKmPrice, hours)
            let _totalCost = await calculateTotalCost(dutyType, hours, minutes, perExtraHrPrice, totalKm, perExtraKmPrice, basePrice, tollTax, nightHaltCharges)
            setTotalCost(_totalCost);
            setExtraKmsCost(_extraKmsCost);
            setExtraHoursCost(_extraTimeCost);
            setExtraKms(_extraKms);
            setExtraHours(_extraTime);
        }
        fetch();
    }, [hours, minutes, days, dutyType, totalKm, perExtraHrPrice, perExtraKmPrice, basePrice, tollTax, nightHaltCharges]);


    return (
        <Card>
            <Table compact>
                <THead>
                    <Tr>
                        <Th>Total Time</Th>
                        <Th>Extra Time</Th>
                        <Th>Extra Time Cost</Th>
                        <Th>Total KM</Th>
                        <Th>Extra KM</Th>
                        <Th>Extra KM Cost</Th>
                        <Th>Sub Total</Th>
                    </Tr>
                </THead>
                <TBody>
                    <Tr>
                        <Td>
                            <span className="font-medium heading-text">{`${hours}:${minutes}`}</span>
                        </Td>
                        <Td>
                            <span className="font-medium heading-text">
                                {extraHours || '00:00'}
                            </span>
                        </Td>
                        <Td>
                            <span className="font-medium heading-text">
                                {extraHoursCost}
                            </span>
                        </Td>
                        <Td>
                            <span className="font-medium heading-text">
                                {totalKm}
                            </span>
                        </Td>
                        <Td>
                            <span className="font-medium heading-text">
                                {extraKms}
                            </span>
                        </Td>
                        <Td>
                            <span className="font-medium heading-text">
                                {extraKmsCost}
                            </span>
                        </Td>
                        <Td>
                            <span className="font-medium heading-text">
                                {totalCost}
                            </span>
                        </Td>
                    </Tr>
                </TBody>
            </Table>
        </Card>
    );
};

export default CostDetails;
