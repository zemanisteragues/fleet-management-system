import * as Yup from 'yup';
import { useState } from 'react';
import { apiGetDutyTypes } from 'services/DutyTypeServices';
// const MIN_UPLOAD = 1;
export let subTotal;

export const dutyTypeOptions = [
    {
        value: '8h80km',
        label: '8H 80KMS',
        color: 'bg-pink-500',
    },
    {
        value: '4h40km',
        label: '4H 40KMS',
        color: 'bg-yellow-500',
    },
    {
        value: '250km',
        label: '250 KMS Per Day',
        color: 'bg-orange-500',
    },
    {
        value: '300km',
        label: '300 KMS Per Day',
        color: 'bg-lime-600',
    },
    {
        value: 'flatRate',
        label: 'Flat Rate',
        color: 'bg-purple-500',
    },
];

export const dutyTypes = async () => {
    let ret = [];
    let data = await apiGetDutyTypes();

    data.dutyTypes.forEach((item) => {
        if (item.status === "ACTIVE") {
            ret.push(item)
        }
    })

    ret.push({
        "dutyType": "Flat Rate",
        "hours": 0,
        "days": 0,
        "kms": 0,
        "status": "ACTIVE"
    })
    return ret;
}

export const dutyTypeMapper = {
    '8h80km': {
        totalHours: 8,
        totalKms: 80,
    },
    '4h40km': {
        totalHours: 4,
        totalKms: 40,
    },
    '250km': {
        totalHours: 1000000000,
        totalKms: 250,
    },
    '300km': {
        totalHours: 1000000000,
        totalKms: 300,
    },
    flatRate: {
        totalHours: 1000000000,
        totalKms: 1000000000,
    },
};

const parseNumber = (value) => {
    const number = parseFloat(value);
    return isNaN(number) ? 0 : number;
};

export const calculateExtraTime = async (dutyType = '', totalHours, totalMinutes) => {
    if (dutyType === 'Flat Rate' || dutyType.includes('DAY')) return 0;

    const data = await dutyTypes();
    const dutyTypeObject = data.find(item => item.dutyType === dutyType);
    const dutyTypeTotalHours = dutyTypeObject ? dutyTypeObject?.hours : 0;
    const extraHours = parseNumber(totalHours) - dutyTypeTotalHours;
    const extraMinutes = parseNumber(totalMinutes);
    return extraHours < 0 ? '00:00' : `${extraHours}:${extraMinutes}`;
};

export const calculateNightHalt = (dutyType, totalHours) => {
    let ret = 0;
    if (totalHours >= 24) {
        totalHours = parseNumber(totalHours);
        ret = Math.floor((totalHours / 24));
        console.log(ret)
    }
    return ret;
};

export const calculateExtraTimeCost = async (
    dutyType,
    totalHours,
    totalMinutes,
    perExtraHrPrice
) => {
    if (dutyType === 'Flat Rate' || dutyType.includes('DAY')) return 0;

    const data = await dutyTypes();
    const dutyTypeObject = data.find(item => item.dutyType === dutyType);
    const dutyTypeTotalHours = dutyTypeObject ? dutyTypeObject.hours : 0;

    const extraHours = parseNumber(totalHours) - dutyTypeTotalHours;
    const extraMinutes = parseNumber(totalMinutes);
    const extraTimeInHours = extraHours + extraMinutes / 60;
    return extraTimeInHours < 0
        ? 0
        : extraTimeInHours * parseNumber(perExtraHrPrice);
};

export const calculateExtraKms = async (dutyType, totalKms, totalHours) => {
    if (dutyType === 'Flat Rate') return 0;

    let ret = 0;
    if (dutyType.includes('DAY')) {
        console.log(dutyType)
        const totalDays = Math.ceil(totalHours / 24);
        const data = await dutyTypes();
        const dutyTypeObject = data.find(item => item.dutyType === dutyType);
        const dutyTypeTotalKms = dutyTypeObject ? dutyTypeObject.kms : 0;
        const totalKmsAllowed = totalDays * dutyTypeTotalKms;
        const extraKms = parseNumber(totalKms) - totalKmsAllowed;
        ret = extraKms < 0 ? 0 : extraKms;
    } else {
        const data = await dutyTypes();
        const dutyTypeObject = data.find(item => item.dutyType === dutyType);
        const dutyTypeTotalKms = dutyTypeObject ? dutyTypeObject.kms : 0;
        const extraKms = parseNumber(totalKms) - dutyTypeTotalKms;
        ret = extraKms < 0 ? 0 : extraKms;
    }
    return ret;
};

export const calculateExtraKmCost = async (
    dutyType,
    totalKms,
    perExtraKmPrice,
    totalHours
) => {
    if (dutyType === 'Flat Rate') return 0;
    const extraKms = await calculateExtraKms(dutyType, totalKms, totalHours);
    return extraKms < 0 ? 0 : extraKms * parseNumber(perExtraKmPrice);
};

export const calculateTotalCost = async (
    dutyType,
    totalHours,
    totalMinutes,
    perExtraHrPrice,
    totalKms,
    perExtraKmPrice,
    basePrice,
    tollTax,
    perNightHaltPrice
) => {
    if (dutyType === 'Flat Rate') return 0;
    const extraTimeCost = await calculateExtraTimeCost(
        dutyType,
        totalHours,
        totalMinutes,
        perExtraHrPrice
    );
    const extraKmCost = await calculateExtraKmCost(
        dutyType,
        totalKms,
        perExtraKmPrice,
        totalHours
    );
    const nightHalt = perNightHaltPrice > 0 ? calculateNightHalt(dutyType, totalHours) * parseNumber(perNightHaltPrice) : 0;
    const dailyFair = totalHours > 24 ? parseNumber(basePrice) * Math.ceil(totalHours / 24) : basePrice;
    subTotal = parseNumber(extraTimeCost) + parseNumber(extraKmCost) + parseNumber(tollTax) + parseNumber(nightHalt) + parseNumber(dailyFair)

    return (
        parseNumber(extraTimeCost) +
        parseNumber(extraKmCost) +
        parseNumber(tollTax) +
        parseNumber(nightHalt) +
        parseNumber(dailyFair)
    );
};

export const validationSchema = Yup.object().shape({
    customer: Yup.string().required('Please select customer!'),
    bookedByPassengerPhone: Yup.string().matches(
        /^[6789]\d{9}$/,
        'Invalid mobile number'
    ),
    car: Yup.string().required('Please select at least one vehicle!'),
    driver: Yup.string().required('Please select at least one driver!'),
    dutyStartDateAndTime: Yup.date()
        .required('Start Date is Required!')
        .nullable(),
    dutyEndDateAndTime: Yup.date()
        .nullable()
        .required('End Date is Required!')
        .min(
            Yup.ref('dutyStartDateAndTime'),
            'End date must be after start date'
        ),
    dutyType: Yup.string().required('Please select duty type!'),
    basePrice: Yup.number()
        .required('Base Price is required')
        .positive('Base Price must be a positive number'),
    perExtraKmPrice: Yup.number()
        .required('Per Extra Km Price is required')
        .positive('Must be a positive number')
        .moreThan(-1, 'Must be a positive number'),
    perExtraHrPrice: Yup.number()
        .required('Per Extra Hr Price is required')
        .positive('Must be a positive number')
        .moreThan(-1, 'Must be a positive number'),
    dutyStartKm: Yup.number()
        .required('Duty Start Km is required')
        .positive('Must be a positive number')
        .moreThan(-1, 'Must be a positive number'),
    dutyEndKm: Yup.number()
        .required('Duty End Km is required')
        .positive('Must be a positive number')
        .min(Yup.ref('dutyStartKm'), 'End Km must be greater than Start Km'),
    tollTax: Yup.number()
        .positive('Toll tax must be a positive integer')
        .integer('Toll tax must be a positive integer'),
    nightHaltCharges: Yup.number()
        .positive('Night halt charges must be a positive integer')
        .integer('Night halt charges must be a positive integer')
        .moreThan(-1, 'Must be a positive number'),

    // tollUpload: Yup
    //     .mixed()
    //     .test('isUploaded', 'Please upload a file', function (value) {
    //         const tollTaxValue = this.parent.tollTax;
    //         return !tollTaxValue || (!!value && value !== '');
    //     }),
    // dutySlipsUpload: Yup
    //     .array()
    //     .min(MIN_UPLOAD, 'At least one file is required!'),
    startFrom: Yup.string().required('Start From is required!'),
    endTo: Yup.string().required('End To is required!'),
});
