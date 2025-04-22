import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    apiGetDutySlips,
    apiCancelDutySlip,
    apiGetDropdownData,
} from 'services/BookingService';

export const getDutySlips = createAsyncThunk(
    'dutySlipsList/data/getDutySlips',
    async (_, thunkAPI) => {
        const params = thunkAPI.getState().dutySlipsList.data.filters;
        const response = await apiGetDutySlips(params);
        return response.data;
    }
);

export const cancelDutySlip = createAsyncThunk(
    'dutySlipsList/data/cancelDutySlip',
    async (data, _) => {
        const response = await apiCancelDutySlip(data);

        return response.data;
    }
);

const initialState = {
    loading: true,
    dutySlips: [],
    total: 0,
    filters: {
        dutyTypeStatus: 'all',
        dateRange: [new Date(), new Date()],
        customerId: null,
        pageIndex: 1,
        pageSize: 20,
    },
    cancelButtonLoading: false,
    success: null,
    message: null,
};

const dataSlice = createSlice({
    name: 'dutySlipsList/data',
    initialState,
    reducers: {
        resetData: (state) => {
            Object.assign(state, initialState);
        },
        setFilters: (state, action) => {
            const key = action.payload.key;
            const value = action.payload.value;
            state.filters[key] = value;
        },
    },
    extraReducers: {
        [getDutySlips.fulfilled]: (state, action) => {
            state.dutySlips = action.payload.dutySlips;
            state.total = action.payload.total;
            state.loading = false;
        },
        [getDutySlips.pending]: (state) => {
            state.loading = true;
        },
        [getDutySlips.rejected]: (state) => {
            state.loading = false;
            state.success = false;
            state.message = 'Something went wrong';
        },
        [cancelDutySlip.fulfilled]: (state, action) => {
            const id = action.payload.data.id;
            // update status of dutySlip
            const dutySlip = state.dutySlips.find(
                (dutySlip) => dutySlip.id === id
            );
            dutySlip.status = 'cancel';
            // assign new state
            state.cancelButtonLoading = false;
            state.success = true;
            state.message = 'Duty Slip cancelled successfully';
        },
        [cancelDutySlip.pending]: (state) => {
            state.cancelButtonLoading = true;
            state.success = null;
        },
        [cancelDutySlip.rejected]: (state) => {
            state.cancelButtonLoading = false;
            state.success = false;
            state.message = 'Something went wrong';
        },
    },
});

export const { resetData, setFilters } = dataSlice.actions;

export default dataSlice.reducer;
