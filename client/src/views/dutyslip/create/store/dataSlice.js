import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    apiGetDropdownData,
    apiCreateDutySlip,
    apiUpdateDutySlip,
} from 'services/BookingService';
import moment from 'moment';
import dayjs from 'dayjs';
import { subTotal } from '../constants/utils';

export const getDropdownData = createAsyncThunk(
    'dutySlipsList/data/getDropdownData',
    async () => {
        const response = await apiGetDropdownData();
        return response;
    }
);

export const createDutySlip = createAsyncThunk(
    'dutySlipsCreate/data/createDutySlip',
    async (data, thunkAPI) => {
        const dutySlipDetails = { ...data };
        const keysToReplace = ['customer', 'driver', 'car'];
        keysToReplace.forEach((key) => {
            dutySlipDetails[`${key}_id`] = dutySlipDetails[key];
            delete dutySlipDetails[key];
        });

        // const tollUploadFiles = dutySlipDetails?.tollUpload || [];
        // delete dutySlipDetails.tollUpload; // remove tollUpload from dutySlipDetails to prevent adding it in the loop below

        dutySlipDetails.dutySlipsUpload =
            dutySlipDetails?.dutySlipsUpload?.[0] || null;
        dutySlipDetails.dutyStartDateAndTime = moment(
            dutySlipDetails.dutyStartDateAndTime
        ).format('YYYY-MM-DD HH:mm:ss');
        // dutySlipDetails.nightHalt = moment(
            // dutySlipDetails.nightHalt
        // ).format('YYYY-MM-DD HH:mm:ss');
        dutySlipDetails.dutyEndDateAndTime = moment(
            dutySlipDetails.dutyEndDateAndTime
        ).format('YYYY-MM-DD HH:mm:ss');
        dutySlipDetails.ignoreLastDay = dutySlipDetails.ignoreLastDay ? 1 : 0;
        dutySlipDetails.subTotal = subTotal;
        const formData = new FormData();
        Object.keys(dutySlipDetails).forEach((key) => {
            formData.append(key, dutySlipDetails[key]);
        });

        console.log(dutySlipDetails, 'dutySlipDetails')
       // Append each tollUpload file separately
       if(Array.isArray(dutySlipDetails.tollUpload)) {
        dutySlipDetails.tollUpload.forEach((file) => {
            formData.append('tollUpload', file);
        });
        }else{
            formData.append('tollUpload', dutySlipDetails.tollUpload);    
        }
        try {
            const response = await apiCreateDutySlip(formData);
            return response.data;
        } catch (error) {
            console.error('Error creating duty slip:', error);
            return thunkAPI.rejectWithValue({
                errorMessage: 'Error creating duty slip',
            });
        }
    }
);

export const updateDutySlip = createAsyncThunk(
    'dutySlipsCreate/data/updateDutySlip',
    async (data, thunkAPI) => {
        const dutySlipDetails = { ...data };
        const dutySlipImage = dutySlipDetails?.dutySlipsUpload || dutySlipDetails?.dutySlipsUpload[0];
        const formData = new FormData();
        formData.append('id', dutySlipDetails.id);
        formData.append('basePrice', dutySlipDetails.basePrice);
        formData.append('bookedByPassengerName', dutySlipDetails.bookedByPassengerName);
        formData.append('bookedByPassengerPhone', dutySlipDetails.bookedByPassengerPhone);
        formData.append('car_id', dutySlipDetails.car);
        formData.append('customer_id', dutySlipDetails.customer);
        formData.append('driver_id', dutySlipDetails.driver);
        formData.append('dutyEndDateAndTime', moment(
            dutySlipDetails.dutyEndDateAndTime
        ).format('YYYY-MM-DD HH:mm:ss'));
        formData.append('dutyEndKm', dutySlipDetails.dutyEndKm);
        formData.append('dutySlipsUpload', dutySlipImage);
        formData.append('dutyStartDateAndTime', moment(
            dutySlipDetails.dutyStartDateAndTime
        ).format('YYYY-MM-DD HH:mm:ss'));
        formData.append('dutyStartKm', dutySlipDetails.dutyStartKm);
        formData.append('ignoreLastDay',  dutySlipDetails.ignoreLastDay ? 1 : 0);
        formData.append('perExtraHrPrice',  dutySlipDetails.perExtraHrPrice);
        formData.append('perExtraKmPrice',  dutySlipDetails.perExtraKmPrice);
        formData.append('nightHalt', dutySlipDetails.nightHalt);
        formData.append('nightHaltCharges', dutySlipDetails.nightHaltCharges);
        formData.append('startFrom', dutySlipDetails.startFrom);
        formData.append('endTo', dutySlipDetails.endTo);
        formData.append('tollTax', dutySlipDetails.tollTax);
        formData.append('subTotal', subTotal);
        formData.append('dutyType', dutySlipDetails.dutyType);
        // Append each tollUpload file separately
        if(Array.isArray(dutySlipDetails.tollUpload)) {
            dutySlipDetails.tollUpload.forEach((file) => {
                formData.append('tollUpload', file);
            });
        }else{
            formData.append('tollUpload', dutySlipDetails.tollUpload);    
        }

        
        try {
            const response = await apiUpdateDutySlip(formData);
            return response.data;
        } catch (error) {
            console.error('Error updating duty slip:', error);
            return thunkAPI.rejectWithValue({
                errorMessage: 'Error updating duty slip',
            });
        }
    }
);

const initialState = {
    loading: true,
    isOpen: false,
    currentDutySlipId: null,
    dutySlipDetails: {
        customer: '',
        driver: '',
        car: '',
        bookedByPassengerName: '',
        bookedByPassengerPhone: '',
        dutyStartDateAndTime: dayjs().toDate(),
        dutyEndDateAndTime: dayjs().toDate(),
        ignoreLastDay: false,
        dutyType: '8h80km',
        subTotal: 0,
        basePrice: '',
        perExtraKmPrice: '',
        perExtraHrPrice: '',
        nightHalt: 0 ,
        nightHaltCharges: '',
        dutyStartKm: '',
        dutyEndKm: '',
        tollTax: '',
        tollUpload: null,
        dutySlipsUpload: null,
        startFrom: '',
        endTo: '',
    },
    customers: [],
    drivers: [],
    vehicles: [],
    success: null,
};

const dataSlice = createSlice({
    name: 'dutySlipsCreate/data',
    initialState,
    reducers: {
        resetData: (state) => {
            Object.assign(state, initialState);
        },
        resetDutySlipDetails: (state) => {
            Object.assign(state.dutySlipDetails, initialState.dutySlipDetails);
        },
        setIsOpen: (state, action) => {
            state.isOpen = action.payload;
        },
        setCurrentDutySlipId: (state, action) => {
            state.currentDutySlipId = action.payload;
        },
        setDutySlipDetails: (state, action) => {
            const data = { ...action.payload };
            const keysToReplace = ['customer_id', 'driver_id', 'car_id'];
            keysToReplace.forEach((key) => {
                data[key.replace('_id', '')] = data[key];
                delete data[key];
            });
            data.dutyStartDateAndTime = dayjs(
                data.dutyStartDateAndTime
            ).toDate();
            data.subTotal = subTotal
            data.dutyEndDateAndTime = dayjs(data.dutyEndDateAndTime).toDate();
            data.nightHalt = data.nightHalt || 0;
            // data.nightHalt = dayjs(data.nightHalt).toDate();
            Object.assign(state.dutySlipDetails, data);
        },
    },
    extraReducers: {
        [createDutySlip.fulfilled]: (state, action) => {
            //state.loading = false;
            state.success = true;
            state.isOpen = false;
        },
        [createDutySlip.pending]: (state) => {
            state.success = null;
            // state.loading = true;
        },
        [createDutySlip.rejected]: (state, action) => {
            state.success = false;
        },
        [getDropdownData.fulfilled]: (state, action) => {
            const data = action.payload.data;
            state.customers = data.customers;
            state.drivers = data.drivers;
            state.vehicles = data.cars;
            state.loading = false;
        },
        [getDropdownData.pending]: (state) => {
            state.loading = true;
        },
        [updateDutySlip.fulfilled]: (state, action) => {
            state.success = true;
            state.isOpen = false;
        },
        [updateDutySlip.pending]: (state) => {
            state.success = null;
        },
        [updateDutySlip.rejected]: (state, action) => {
            state.success = false;
        },
    },
});

export const {
    resetData,
    setIsOpen,
    setCurrentDutySlipId,
    setDutySlipDetails,
    resetDutySlipDetails,
} = dataSlice.actions;

export default dataSlice.reducer;
