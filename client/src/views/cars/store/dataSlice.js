import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    apiGetCars,
    apiCreateNewCarQuery,
    apiUpdateCarQuery,
    apiDeleteCarsQuery,
} from 'services/CarsService';
import moment from 'moment';

export const getCars = createAsyncThunk(
    'cars/data/getCars',
    async (_, thunkAPI) => {
        const data = thunkAPI.getState().cars.data.filters;
        const payload = {
            pageSize: data.pageSize,
            currentPage: data.currentPage,
            query: data.query,
            carStatus: data.carStatus,
        };
        const response = await apiGetCars(payload);
        return response.data;
    }
);

export const deleteCar = createAsyncThunk(
    'cars/data/deleteCars',
    async (id) => {
        const payload = { id: id };
        const response = await apiDeleteCarsQuery(payload);
        return response.data;
    }
);

export const updateRecord = createAsyncThunk(
    'cars/data/updateRecord',
    async (_, thunkAPI) => {
        const { data } = thunkAPI.getState().cars;
        const record = data.newCar;
        const payload = {
            registrationNumber: record.registrationNumber,
            carType: record.carType,
            id: record.carId,
        };

        try {
            const response = await apiUpdateCarQuery(payload); // make the POST API call with the payload data
            return response.data; // return the response data as the fulfilled value of the thunk
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data); // return the error response data as the rejected value of the thunk
        }
    }
);

export const createNewRecord = createAsyncThunk(
    'cars/data/createNewRecord',
    async (_, thunkAPI) => {
        const { data } = thunkAPI.getState().cars;
        const record = data.newCar;
        const payload = {
            registrationNumber: record.registrationNumber,
            carType: record.carType,
        };
        try {
            const response = await apiCreateNewCarQuery(payload); // make the POST API call with the payload data
            return response.data; // return the response data as the fulfilled value of the thunk
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data); // return the error response data as the rejected value of the thunk
        }
    }
);

const initialState = {
    loading: true,
    cars: [],
    totalSize: 0,
    filters: {
        pageSize: 10,
        currentPage: 1,
        carStatus: 'all',
        query: '',
    },
    newCar: {
        registrationNumber: '',
        carType: '',
        isSubmit: false,
        carId: null,
    },
    isDrawerOpen: false,
    isSuccess: false,
    message: '',
    error: null,
};

const dataSlice = createSlice({
    name: 'cars/data',
    initialState,
    reducers: {
        resetData: (state) => {
            Object.assign(state, initialState);
        },
        setUpdateCarId: (state, action) => {
            state.newCar.carId = action.payload;
        },
        setUpdateCarRecordData: (state, action) => {
            Object.assign(state.newCar, action.payload);
        },
        resetNewCarData: (state) => {
            Object.assign(state.newCar, initialState.newCar);
        },
        setIsDrawerOpen: (state, action) => {
            state.isDrawerOpen = action.payload;
        },
        setIsSubmit: (state, action) => {
            state.newCar.isSubmit = action.payload;
        },
        setNewCarRegistrationNumber: (state, action) => {
            state.newCar.registrationNumber = action.payload;
        },
        setNewCarType: (state, action) => {
            state.newCar.carType = action.payload;
        },
        setFilters: (state, action) => {
            const key = action.payload.key;
            const value = action.payload.value;
            state.filters[key] = value;
        },
        setIsSuccess: (state, action) => {
            state.isSuccess = action.payload;
        },
    },
    extraReducers: {
        [getCars.fulfilled]: (state, action) => {
            state.cars = action.payload.cars;
            state.totalSize = action.payload.totalCount;
            state.loading = false;
        },
        [getCars.pending]: (state) => {
            state.cars = [];
            state.loading = true;
        },
        [createNewRecord.fulfilled]: (state, action) => {
            state.loading = false;
            state.isDrawerOpen = false;
            state.isSuccess = true;
        },
        [createNewRecord.pending]: (state) => {
            state.loading = true;
        },
        [createNewRecord.rejected]: (state, action) => {
            state.loading = false;
            state.error = action?.payload;
        },
        [updateRecord.fulfilled]: (state, action) => {
            state.loading = false;
            state.isDrawerOpen = false;
            state.isSuccess = true;
        },
        [updateRecord.pending]: (state) => {
            state.loading = true;
        },
        [updateRecord.rejected]: (state, action) => {
            state.loading = false;
            state.error = action?.payload;
        },
        [deleteCar.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
        },
        [deleteCar.pending]: (state) => {
            state.loading = true;
        },
        [deleteCar.rejected]: (state) => {
            state.loading = false;
        },
    },
});

export const {
    setUpdateCarRecordData,
    setUpdateCarId,
    resetNewCarData,
    resetData,
    setIsSubmit,
    setIsDrawerOpen,
    setNewCarRegistrationNumber,
    setNewCarType,
    setIsSuccess,
    setFilters,
} = dataSlice.actions;

export default dataSlice.reducer;
