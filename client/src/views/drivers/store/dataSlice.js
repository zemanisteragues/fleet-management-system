import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import {
    apiCreateNewDriverQuery,
    apiDeleteDriverQuery,
    apiGetDrivers,
    apiUpdateDriverQuery,
    apiGetDriversOnDashboard,
} from 'services/DriversService';

export const getDrivers = createAsyncThunk(
    'drivers/data/getDrivers',
    async (_, thunkAPI) => {
        const data = thunkAPI.getState().drivers.data.filters;
        const payload = {
            pageSize: data.pageSize,
            currentPage: data.currentPage,
            query: data.query,
            driverStatus: data.driverStatus,
        };
        const response = await apiGetDriversOnDashboard(payload);
        return response.data;
    }
);

export const updateRecord = createAsyncThunk(
    'drivers/data/updateRecord',
    async (_, thunkAPI) => {
        const { data } = thunkAPI.getState().drivers;
        const record = data.newDriver;
        const formData = new FormData();
        formData.append('firstName', record.firstName);
        formData.append('lastName', record.lastName);
        formData.append('phone', record.phone);
        formData.append('address', record.address);
        formData.append('licenseNumber', record.licenseNumber);
        formData.append('licenseExpiry', record.licenseExpiry);
        formData.append('licenseImage', record.licenseImage);
        formData.append('id', record.driverId);
        try {
            const response = await apiUpdateDriverQuery(formData); // make the POST API call with the payload data
            return response.data; // return the response data as the fulfilled value of the thunk
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data); // return the error response data as the rejected value of the thunk
        }
    }
);

export const createNewRecord = createAsyncThunk(
    'drivers/data/createNewRecord',
    async (_, thunkAPI) => {
        const { data } = thunkAPI.getState().drivers;
        const record = data.newDriver;
        const formData = new FormData();
        formData.append('firstName', record.firstName);
        formData.append('lastName', record.lastName);
        formData.append('phone', record.phone);
        formData.append('address', record.address);
        formData.append('licenseNumber', record.licenseNumber);
        formData.append('licenseExpiry', record.licenseExpiry);
        formData.append('licenseImage', record.licenseImage);

        // check if any formData field is empty
        try {
            const response = await apiCreateNewDriverQuery(formData); // make the POST API call with the payload data
            return response.data; // return the response data as the fulfilled value of the thunk
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data); // return the error response data as the rejected value of the thunk
        }
    }
);

export const deleteDriver = createAsyncThunk(
    'drivers/data/deleteDriver',
    async (id) => {
        const payload = { id: id };
        const response = await apiDeleteDriverQuery(payload);
        return response.data;
    }
);

const initialState = {
    loading: true,
    drivers: [],
    totalSize: 0,
    filters: {
        currentPage: 1,
        pageSize: 10,
        query: '',
        driverStatus: 'all',
    },
    newDriver: {
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        licenseNumber: '',
        licenseExpiry: '',
        isSubmit: false,
        driverId: null,
        licenseImage: null,
    },
    isDrawerOpen: false,
    isSuccess: false,
    error: null,
};

const dataSlice = createSlice({
    name: 'drivers/data',
    initialState,
    reducers: {
        resetData: (state, action) => {
            Object.assign(state, initialState);
        },
        setFilters: (state, action) => {
            const key = action.payload.key;
            const value = action.payload.value;
            state.filters[key] = value;
        },
        setUpdateDriverId: (state, action) => {
            state.newDriver.driverId = action.payload;
        },
        setUpdateDriverRecordData: (state, action) => {
            Object.assign(state.newDriver, action.payload);
        },
        resetNewDriverData: (state, action) => {
            Object.assign(state.newDriver, initialState.newDriver);
        },
        setIsDrawerOpen: (state, action) => {
            state.isDrawerOpen = action.payload;
        },
        setIsSubmit: (state, action) => {
            state.newDriver.isSubmit = action.payload;
        },
        setNewDriverFirstName: (state, action) => {
            state.newDriver.firstName = action.payload;
        },
        setNewDriverLastName: (state, action) => {
            state.newDriver.lastName = action.payload;
        },
        setNewDriverPhone: (state, action) => {
            state.newDriver.phone = action.payload;
        },
        setNewDriverAddress: (state, action) => {
            state.newDriver.address = action.payload;
        },
        setNewDriverLicenseNumber: (state, action) => {
            state.newDriver.licenseNumber = action.payload;
        },
        setNewDriverLicenseExpiry: (state, action) => {
            state.newDriver.licenseExpiry = action.payload;
        },
        setNewDriverLicenseImage: (state, action) => {
            state.newDriver.licenseImage = action.payload;
        },
    },
    extraReducers: {
        [getDrivers.fulfilled]: (state, action) => {
            state.drivers = action.payload.drivers;
            state.totalSize = action.payload.totalCount;
            state.loading = false;
        },
        [getDrivers.pending]: (state) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [createNewRecord.fulfilled]: (state) => {
            state.loading = false;
            state.isDrawerOpen = false;
            state.isSuccess = true;
            state.error = null;
        },
        [createNewRecord.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [createNewRecord.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
            state.error = action?.payload;
        },
        [updateRecord.fulfilled]: (state) => {
            state.loading = false;
            state.isDrawerOpen = false;
            state.isSuccess = true;
            state.error = null;
        },
        [updateRecord.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [updateRecord.rejected]: (state, action) => {
            state.loading = false;
            state.error = action?.payload;
        },
        [deleteDriver.fulfilled]: (state) => {
            state.loading = false;
            state.isSuccess = true;
        },
        [deleteDriver.pending]: (state) => {
            state.loading = true;
        },
        [deleteDriver.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export const {
    resetData,
    resetNewDriverData,
    setIsDrawerOpen,
    setIsSubmit,
    setNewDriverAddress,
    setNewDriverFirstName,
    setNewDriverLastName,
    setNewDriverLicenseExpiry,
    setNewDriverLicenseImage,
    setNewDriverLicenseNumber,
    setNewDriverPhone,
    setUpdateDriverId,
    setUpdateDriverRecordData,
    setFilters,
} = dataSlice.actions;

export default dataSlice.reducer;
