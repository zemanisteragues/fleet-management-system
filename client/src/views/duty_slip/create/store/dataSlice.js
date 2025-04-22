import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    apiGetCustomers,
    apiGetCustomersQuery,
} from 'services/CustomersService';
import moment from 'moment';
import { apiGetDriversQuery } from 'services/DriversService';
import { apiGetCarsQuery } from 'services/CarsService';
import {
    apiCreateNewDutySlip,
    apiGetDutySlipById,
} from 'services/DutySlipsService';

export const getCustomers = createAsyncThunk(
    'createDutySlips/data/getCustomers',
    async (params) => {
        console.log('p[ara', params);
        const response = await apiGetCustomersQuery(params);
        return response.data;
    }
);

export const getDrivers = createAsyncThunk(
    'createDutySlips/data/getDrivers',
    async (params) => {
        const response = await apiGetDriversQuery(params);
        return response.data;
    }
);

export const getVehicles = createAsyncThunk(
    'createDutySlips/data/getVehicles',
    async (params) => {
        const response = await apiGetCarsQuery(params);
        return response.data;
    }
);

export const createNewRecord = createAsyncThunk(
    'createDutySlips/data/createNewRecord',
    async (_, thunkAPI) => {
        const { data } = thunkAPI.getState().createDutySlip;
        const trips = data.trips;
        const updatedTrips = trips.map((item) => {
            // const start_date = new Date(
            //     Date.parse(`${item.reportDate}T${item.reportingTime}:00.000Z`)
            // ).toISOString();
            // const release_date = new Date(
            //     Date.parse(`${item.releaseDate}T${item.releaseTime}:00.000Z`)
            // ).toISOString();
            return {
                start_date: item.reportDate,
                release_date: item.releaseDate,
                startingKm: item.startingKm,
                closingKm: item.closingKm,
                pickupLocation: item.pickupLocation,
                dropLocation: item.dropLocation,
            };
        });
        const payload = {
            passengerName: data.bookedByName,
            customerId: data.customerId,
            passengerPhone: data.bookedByPhone,
            carId: data.vehicleId,
            driverId: data.driverId,
            extraTime: data.extraTime,
            trips: updatedTrips,
        };

        try {
            const response = await apiCreateNewDutySlip(payload); // make the POST API call with the payload data
            return [];
            //return response.data; // return the response data as the fulfilled value of the thunk
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data); // return the error response data as the rejected value of the thunk
        }
    }
);

export const getDutySlipById = createAsyncThunk(
    'createDutySlips/data/getDutySlipById',
    async (id) => {
        const response = await apiGetDutySlipById({ id: id });
        return response.data[0];
    }
);

export const updateDutySlip = createAsyncThunk(
    'createDutySlips/data/updateDutySlip',
    async (data, thunkAPI) => {
        const trips = data.trips;
        const updatedTrips = trips.map((item) => {
            const start_date = new Date(
                Date.parse(`${item.reportDate}T${item.reportingTime}:00.000Z`)
            ).toISOString();
            const release_date = new Date(
                Date.parse(`${item.releaseDate}T${item.releaseTime}:00.000Z`)
            ).toISOString();
            return {
                start_date,
                release_date,
                startingKm: item.startingKm,
                closingKm: item.closingKm,
                pickupLocation: item.pickupLocation,
                dropLocation: item.dropLocation,
            };
        });
        const payload = {
            id: data.id,
            passengerName: data.bookedByName,
            customerId: data.customerId,
            passengerPhone: data.bookedByPhone,
            carId: data.vehicleId,
            driverId: data.driverId,
            extraTime: data.extraTime,
            trips: updatedTrips,
        };

        try {
            const response = await apiCreateNewDutySlip(payload); // make the POST API call with the payload data
            return [];
            //return response.data; // return the response data as the fulfilled value of the thunk
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data); // return the error response data as the rejected value of the thunk
        }
    }
);

const initialState = {
    loading: true,
    customerId: null,
    bookedByName: null,
    bookedByPhone: null,
    vehicleId: null,
    driverId: null,
    extraTime: null,
    trips: [
        {
            reportDate: '',
            reportingTime: '',
            releaseDate: '',
            releaseTime: '',
            startingKm: '',
            pickupLocation: '',
            dropLocation: '',
        },
    ],
    customers: [],
    vehicles: [],
    drivers: [],
    hasSubmit: false,
    view: 'create',
    hasSuccess: false,
};

const dataSlice = createSlice({
    name: 'createDutySlip/data',
    initialState,
    reducers: {
        resetData: (state) => {
            Object.assign(state, initialState);
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setCustomerId: (state, action) => {
            state.customerId = action.payload;
        },
        setBookedByName: (state, action) => {
            state.bookedByName = action.payload;
        },
        setBookedByPhone: (state, action) => {
            state.bookedByPhone = action.payload;
        },
        setFromLocation: (state, action) => {
            state.fromLocation = action.payload;
        },
        setToLocation: (state, action) => {
            state.toLocation = action.payload;
        },
        setVehicleId: (state, action) => {
            state.vehicleId = action.payload;
        },
        setDriverId: (state, action) => {
            state.driverId = action.payload;
        },
        setExtraTime: (state, action) => {
            state.extraTime = action.payload;
        },
        setTableData: (state, action) => {
            state.data = action.payload;
        },
        setTrips: (state, action) => {
            state.trips = action.payload;
        },
        setHasSubmit: (state, action) => {
            state.hasSubmit = action.payload;
        },
    },
    extraReducers: {
        [getCustomers.fulfilled]: (state, action) => {
            state.customers = action.payload;
            state.loading = false;
        },
        [getCustomers.pending]: (state) => {
            state.loading = true;
        },
        [getDrivers.fulfilled]: (state, action) => {
            state.drivers = action.payload;
            state.loading = false;
        },
        [getDrivers.pending]: (state) => {
            state.loading = true;
        },
        [getVehicles.fulfilled]: (state, action) => {
            state.vehicles = action.payload;
            state.loading = false;
        },
        [getVehicles.pending]: (state) => {
            state.loading = true;
        },
        [createNewRecord.fulfilled]: (state, action) => {
            state.loading = false;
            state.hasSuccess = true;
        },
        [createNewRecord.pending]: (state) => {
            state.loading = true;
        },
        [createNewRecord.rejected]: (state, action) => {
            state.loading = false;
        },
        [getDutySlipById.fulfilled]: (state, action) => {
            const data = action.payload;
            state.customerId = data.customer_id;
            state.bookedByName = data.passengerName;
            state.bookedByPhone = data.passengerPhone;
            state.vehicleId = data.car_id;
            state.driverId = data.driver_id;
            state.extraTime = data.extraTime;
            const trips = data.trips.map((item) => {
                // get reportdate and release date in YYYY-MM-DD format using momentjs
                const reportDate = moment(item.start_date).format('YYYY-MM-DD');
                const reportingTime = moment(item.start_date).format('HH:mm');
                const releaseDate = moment(item.release_date).format(
                    'YYYY-MM-DD'
                );
                const releaseTime = moment(item.release_date).format('HH:mm');
                return {
                    reportDate,
                    reportingTime,
                    releaseDate,
                    releaseTime,
                    startingKm: item.startingKm,
                    closingKm: item.closingKm,
                    pickupLocation: item.pickupLocation,
                    dropLocation: item.dropLocation,
                };
            });
            Object.assign(state.trips, trips);
            state.loading = false;
            state.currentPage = 'view';
        },
        [getDutySlipById.pending]: (state) => {
            state.loading = true;
        },
    },
});

export const {
    setCustomerId,
    setBookedByName,
    setBookedByPhone,
    setDriverId,
    setExtraTime,
    setFromLocation,
    setToLocation,
    setTrips,
    setVehicleId,
    setHasSubmit,
    resetData,
    setCurrentPage,
} = dataSlice.actions;

export default dataSlice.reducer;
