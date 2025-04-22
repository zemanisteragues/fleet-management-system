import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    apiGetCustomers,
    apiGetCustomersQuery,
    apiGetCustomersByQuery,
    apiDeleteCustomer,
    apiCreateCustomer,
    apiUpdateCustomer,
    apiRestoreCustomer,
} from 'services/CustomersService';

export const getCustomers = createAsyncThunk(
    'customers/data/getCustomers',
    async (_, thunkAPI) => {
        const params = thunkAPI.getState().customers.data;
        const payload = {
            pageSize: params.pageSize,
            pageIndex: params.pageIndex,
        };
        const response = await apiGetCustomers(payload);
        return response.data;
    }
);

export const getCustomersQuery = createAsyncThunk(
    'customers/data/getCustomersQuery',
    async (params) => {
        const response = await apiGetCustomersQuery(params);
        return response.data;
    }
);

export const deleteCustomer = createAsyncThunk(
    'customers/data/deleteCustomer',
    async (data) => {
        const response = await apiDeleteCustomer(data);
        return response.data;
    }
);

export const restoreCustomer = createAsyncThunk(
    'customers/data/restoreCustomer',
    async (data) => {
        const response = await apiRestoreCustomer(data);
        return response.data;
    }
);

export const getCustomersByQuery = createAsyncThunk(
    'customers/data/getCustomersByQuery',
    async (_, thunkAPI) => {
        const data = thunkAPI.getState().customers.data;
        const obj = {
            query: data.searchQuery,
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
            sortBy: data.sortBy,
            customerType: data.customerType,
            customerStatus: data.customerStatus,
        };
        const response = await apiGetCustomersByQuery(obj);
        return response.data;
    }
);

export const createNewRecord = createAsyncThunk(
    'customers/data/createNewRecord',
    async (_, thunkAPI) => {
        const { data } = thunkAPI.getState().customers;
        const record = data.newCustomer;
        const payload = {
            firstName: record.firstName,
            lastName: record.lastName,
            phone: record.phone,
            address: record.address,
            isCompany: record.customerType,
            companyName: record.companyName,
            gstNumber: record.gstNumber,
            city: record.city,
            state: record.state,
            country: record.country,
            email: record.email,
            remarks: record.remarks,
        };

        try {
            const response = await apiCreateCustomer(payload); // make the POST API call with the payload data
            return response.data; // return the response data as the fulfilled value of the thunk
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data); // return the error response data as the rejected value of the thunk
        }
    }
);

export const updateRecord = createAsyncThunk(
    'customers/data/updateRecord',
    async (_, thunkAPI) => {
        const { data } = thunkAPI.getState().customers;
        const record = data.newCustomer;
        const payload = {
            firstName: record.firstName,
            lastName: record.lastName,
            phone: record.phone,
            address: record.address,
            isCompany: record.customerType,
            companyName: record.companyName,
            gstNumber: record.gstNumber,
            city: record.city,
            state: record.state,
            country: record.country,
            email: record.email,
            remarks: record.remarks,
            customerId: record.customerId,
        };

        try {
            const response = await apiUpdateCustomer(payload); // make the POST API call with the payload data
            return response.data; // return the response data as the fulfilled value of the thunk
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data); // return the error response data as the rejected value of the thunk
        }
    }
);

const initialState = {
    loading: true,
    customers: [],
    searchQuery: '',
    pageIndex: 1,
    pageSize: 10,
    totalCount: 0,
    sortBy: 'firstName',
    customerType: 'all',
    customerStatus: 'all',
    newCustomer: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        customerType: 1,
        companyName: '',
        gstNumber: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        remarks: '',
        isSubmit: false,
        customerId: null,
        errorMessage: '',
        isEdit: false,
    },
    isDrawerOpen: false,
    isSuccess: null,
    message: null,
};

const dataSlice = createSlice({
    name: 'customers/data',
    initialState,
    reducers: {
        resetData: (state) => {
            Object.assign(state, initialState);
        },
        resetFilters: (state) => {
            state.searchQuery = '';
            state.pageIndex = 1;
            state.pageSize = 10;
            state.sortBy = 'firstName';
            state.customerType = 'all';
            state.customerStatus = 'all';
        },
        setTableData: (state, action) => {
            state.data = action.payload;
        },
        setNewCustomer: (state, action) => {
            const key = action.payload.key;
            const value = action.payload.value;
            state.newCustomer[key] = value;
        },
        resetNewCustomer: (state) => {
            Object.assign(state.newCustomer, initialState.newCustomer);
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setPageIndex: (state, action) => {
            state.pageIndex = action.payload;
        },
        setCustomerType: (state, action) => {
            state.customerType = action.payload;
        },
        setCustomerStatus: (state, action) => {
            state.customerStatus = action.payload;
        },
        setIsDrawerOpen: (state, action) => {
            state.isDrawerOpen = action.payload;
        },
        setNewCustomerRecord: (state, action) => {
            Object.assign(state.newCustomer, action.payload);
        },
        resetNewCustomerRecord: (state) => {
            Object.assign(state.newCustomer, initialState.newCustomer);
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
        [getCustomersQuery.fulfilled]: (state, action) => {
            state.customers = action.payload;
            state.loading = false;
        },
        [getCustomersQuery.pending]: (state) => {
            state.loading = true;
        },
        [getCustomersByQuery.pending]: (state) => {
            state.loading = true;
        },
        [getCustomersByQuery.fulfilled]: (state, action) => {
            state.customers = action.payload.data;
            state.totalCount = action.payload.count;
            state.loading = false;
        },
        [createNewRecord.fulfilled]: (state, action) => {
            state.loading = false;
            state.isDrawerOpen = false;
            state.isSuccess = true;
        },
        [createNewRecord.pending]: (state) => {
            state.loading = true;
            state.isSuccess = null;
            state.message = null;
        },
        [createNewRecord.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
            state.message = action.payload.message;
        },
        [updateRecord.fulfilled]: (state, action) => {
            state.loading = false;
            state.isDrawerOpen = false;
            state.isSuccess = true;
        },
        [updateRecord.pending]: (state) => {
            state.loading = true;
            state.isSuccess = null;
            state.message = null;
        },
        [updateRecord.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
            state.message = action.payload.message;
        },
        [deleteCustomer.fulfilled]: (state, action) => {
            // state.loading = false;
            // state.isDrawerOpen = false;
            state.isSuccess = true;
        },
        [deleteCustomer.pending]: (state) => {
            // state.loading = true;
            state.isSuccess = null;
        },
        [deleteCustomer.rejected]: (state) => {
            // state.loading = false;
            state.isSuccess = false;
        },
        [restoreCustomer.fulfilled]: (state, action) => {
            // state.loading = false;
            // state.isDrawerOpen = false;
            state.isSuccess = true;
        },
        [restoreCustomer.pending]: (state) => {
            // state.loading = true;
            state.isSuccess = null;
        },
        [restoreCustomer.rejected]: (state) => {
            // state.loading = false;
            state.isSuccess = false;
        },
    },
});

export const {
    resetFilters,
    resetData,
    resetNewCustomer,
    setIsDrawerOpen,
    setNewCustomer,
    setTableData,
    setSearchQuery,
    setCustomerType,
    setCustomerList,
    setFilterData,
    setCustomerStatus,
    setPageIndex,
    setNewCustomerRecord,
    resetNewCustomerRecord,
} = dataSlice.actions;

export default dataSlice.reducer;
