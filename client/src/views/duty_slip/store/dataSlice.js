import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetDutySlips, apiDeleteDutySlip } from 'services/DutySlipsService';
import moment from 'moment';

export const getDutySlips = createAsyncThunk(
    'dutySlips/data/getDutySlips',
    async (params) => {
        const response = await apiGetDutySlips(params);
        return response.data;
    }
);

export const deleteDutySlips = createAsyncThunk(
    'dutySlips/data/deleteDutySlips',
    async (id) => {
        const payload = { id };
        const response = await apiDeleteDutySlip(payload);
        return response.data;
    }
);

export const getDutySlipById = createAsyncThunk(
    'dutySlips/data/getDutySlipById',
    async (id) => {
        const payload = { id };
        const response = await apiGetDutySlips(payload);
        return response.data;
    }
);

const initialState = {
    loading: true,
    dutySlips: [],
    isSuccess: false,
};

const dataSlice = createSlice({
    name: 'dutySlips/data',
    initialState,
    reducers: {
        resetData: (state) => {
            Object.assign(state, initialState);
        },
        setIsSuccess: (state, action) => {
            state.isSuccess = action.payload;
        },
    },
    extraReducers: {
        [getDutySlips.fulfilled]: (state, action) => {
            state.dutySlips = action.payload;
            state.loading = false;
        },
        [getDutySlips.pending]: (state) => {
            state.loading = true;
        },
        [deleteDutySlips.fulfilled]: (state, action) => {
            state.isSuccess = true;
            state.loading = false;
        },
        [deleteDutySlips.pending]: (state) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [deleteDutySlips.rejected]: (state) => {
            state.loading = true;
        },
    },
});

export const { resetData, setIsSuccess } = dataSlice.actions;

export default dataSlice.reducer;
