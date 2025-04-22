import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiGetInvoices } from 'services/InvoicesService';
import { apiUpdateStatusOfInvoices } from 'services/InvoicesService';

export const getInvoices = createAsyncThunk(
    'invoicesList/data/getInvoices',
    async (params) => {
        const response = await apiGetInvoices(params);
        return response.data;
    }
);

export const updateStatus = createAsyncThunk(
    'invoicesList/data/updateStatus',
    async (payload, thunkAPI) => {
        try {
            const response = await apiUpdateStatusOfInvoices(payload); // make the POST API call with the payload data
            return response.data;
            //return response.data; // return the response data as the fulfilled value of the thunk
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data); // return the error response data as the rejected value of the thunk
        }
    }
);

const initialState = {
    loading: true,
    invoices: [],
    filters: {
        customerType: 'all',
        dateRange: [new Date([2022, 11, 1]), new Date([2022, 11, 1])],
        searchQuery: '',
        pageIndex: 1,
        pageSize: 50,
    },
};

const dataSlice = createSlice({
    name: 'invoicesList/data',
    initialState,
    reducers: {
        resetData: (state) => {
            Object.assign(state, initialState);
        },
        setFilters: (state, action) => {
            const { name, value } = action.payload;
            state.filters[name] = value;
        },
    },
    extraReducers: {
        [getInvoices.fulfilled]: (state, action) => {
            state.invoices = action.payload.invoices;
            state.loading = false;
        },
        [getInvoices.pending]: (state) => {
            state.loading = true;
        },
        [updateStatus.fulfilled]: (state, action) => {
            state.invoices = action.payload.invoices;
            state.loading = false;
        },
        [updateStatus.pending]: (state) => {
            state.loading = true;
        },
    },
});

export const { resetData, setFilters } = dataSlice.actions;

export default dataSlice.reducer;
