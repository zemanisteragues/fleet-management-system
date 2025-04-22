import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import {
    apiGetInvoicesDetails,
    apiCreateInvoices,
    apiGetInvoices,
    apiDeleteInvoices,
    apiUpdateStatusOfInvoices,
    apiSubmitInvoice
} from 'services/InvoicesService';
import { apiGetCustomersQuery } from 'services/CustomersService';
import { apiUpdateDutySlipsByCustomerIdQuery } from 'services/DutySlipsService';
import { generateInvoiceNumber } from 'utils/invoiceGenerator';
import { useSelector } from 'react-redux';

export const getCustomers = createAsyncThunk(
    'invoiceCreate/data/getCustomers',
    async (params) => {
        const response = await apiGetCustomersQuery(params);
        return response.data;
    }
);

export const getDutySlipsByCustomerId = createAsyncThunk(
    'invoiceCreate/data/getDutySlipsByCustomerId',
    async (params) => {
        const response = await apiUpdateDutySlipsByCustomerIdQuery(params);
        return response.data;
    }
);

export const getInvoiceDetails = createAsyncThunk(
    'invoiceCreate/data/apiGetInvoicesDetails',
    async (_, thunkAPI) => {
        const data = thunkAPI.getState().invoiceCreate.data;
        const payload = {
            dutySlipsIds: data.selectedDutySlips,
            customerId: data.customerId,
        };
        try {
            const response = await apiGetInvoicesDetails(payload); // make the POST API call with the payload data
            return response.data;
            //return response.data; // return the response data as the fulfilled value of the thunk
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data); // return the error response data as the rejected value of the thunk
        }
    }
);

export const createInvoice = createAsyncThunk(
    'invoiceCreate/data/createInvoice',
    async (_, thunkAPI) => {
        const data = thunkAPI.getState().invoiceCreate.data.details;
        const payload = { data };
        try {
            const response = await apiCreateInvoices(data); // make the POST API call with the payload data
            return response.data;
            //return response.data; // return the response data as the fulfilled value of the thunk
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data); // return the error response data as the rejected value of the thunk
        }
    }
);

export const submitInvoice = createAsyncThunk(
    'invoiceCreate/data/submitInvoice',
    async (invoiceData, thunkAPI) => {
        const data = thunkAPI.getState().invoiceCreate.data.dutySlips;
        const payload = {invoiceData, "selectedDutySlips" : [...data]}

        try {
            const response = await apiSubmitInvoice(payload); // make the POST API call with the payload data
            return response.data;
            //return response.data; // return the response data as the fulfilled value of the thunk
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data); // return the error response data as the rejected value of the thunk
        }
    }
);

export const deleteInvoice = createAsyncThunk(
    'invoiceCreate/data/deleteInvoice',
    async (payload, thunkAPI) => {
        try {
            const response = await apiDeleteInvoices(payload); // make the POST API call with the payload data
            return response.data;
            //return response.data; // return the response data as the fulfilled value of the thunk
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data); // return the error response data as the rejected value of the thunk
        }
    }
);

export const getInvoices = createAsyncThunk(
    'invoiceCreate/data/getInvoices',
    async (params) => {
        const response = await apiGetInvoices(params);
        return response.data;
    }
);

const initialState = {
    loading: true,
    dutySlips: [],
    customerId: null,
    customers: [],
    selectedDutySlips: [],
    currentStep: 0,
    hasFetchedInvoiceDetails: false,
    details: {
        invoiceNumber: '',
        billedTo: '',
        gstin: '',
        customerId: '',
        customerPhone: '',
        address: '',
        shippedTo: '',
        representative: '',
        placeOfService: '',
        invoiceDate: new Date(),
        placeOfService: '',
        trips: [],
        cgst: 0,
        sgst: 0,
        igst: 0,
        total: 0,
        subTotal: 0,
        hasErrors: false,
    },
};

const dataSlice = createSlice({
    name: 'invoiceCreate/data',
    initialState,
    reducers: {
        resetData: (state) => {
            Object.assign(state, initialState);
        },
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload;
        },
        setCustomerId: (state, action) => {
            state.customerId = action.payload;
        },
        setHasFetchedInvoiceDetails: (state, action) => {
            state.hasFetchedInvoiceDetails = action.payload;
        },
        updateDetails: (state, { payload }) => {
            const key = payload.key;
            const value = payload.value;
            state.details[key] = value;
        },
        setDutySlips: (state, action) => {
            state.dutySlips = action.payload;
        },
        updateTrips: (state, { payload }) => {
            const key = payload.key;
            const value = payload.value;
            const index = payload.index;
            const isInteger = /^-?\d*(\.\d*)?$/.test(value);

            if (value === '') {
                state.details.trips[index][key] = 0;
                state.details.cgst = 0;
                state.details.sgst = 0;
                state.details.igst = 0;
                state.details.total = 0;
            } else {
                state.details.trips[index][key] = parseFloat(value);

                const trips = state.details.trips[index];
                const total =
                    trips.fare +
                    trips.totalKM * trips.fuelPerKM +
                    trips.nightHalt +
                    trips.toll;
                state.details.trips[index].total = total;

                const totalAmount = state.details.trips.reduce((acc, trip) => {
                    return acc + trip.total;
                }, 0);

                state.details.subTotal = totalAmount;
                // add 2.5 percent of total amount as cgst and sgst
                const cgst = totalAmount * 0.025;
                const sgst = totalAmount * 0.025;

                state.details.cgst = cgst;
                state.details.sgst = sgst;

                // add 5 percent of total amount as igst
                const igst = totalAmount * 0.05;
                state.details.igst = igst;

                // add igst to total amount
                state.details.total = totalAmount + igst;
            }
        },
        setSelectedDutySlip: (state, action) => {
            state.selectedDutySlips = action.payload;
        },
        addDutySlipItem: (state, action) => {
            const id = action.payload;
            const currentState = current(state);
            if (!currentState.selectedDutySlips.includes(id)) {
                Object.assign(state.selectedDutySlips, [
                    ...currentState.selectedDutySlips,
                    id,
                ]);
            }
        },
        removeDutySlipItem: (state, { payload }) => {
            const currentState = current(state);
            if (currentState.selectedDutySlips.includes(payload)) {
                const filterData = currentState.selectedDutySlips.filter(
                    (id) => id !== payload
                );

                state.selectedDutySlips = filterData;
            }
        },
        addAllDutySlipItem: (state, action) => {
            state.selectedDutySlips = action.payload;
        },
        removeAllDutySlipItem: (state) => {
            state.selectedDutySlips = [];
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
        [getDutySlipsByCustomerId.fulfilled]: (state, action) => {
            state.dutySlips = action.payload;
            state.loading = false;
        },
        [getDutySlipsByCustomerId.pending]: (state) => {
            state.loading = true;
        },
        [getInvoiceDetails.fulfilled]: (state, { payload }) => {
            const { dutySlips, customer, invoiceNumber, dutySlipsItems } =
                payload;
            const customerType = customer[0].isCompany;
            state.details.invoiceNumber = generateInvoiceNumber(invoiceNumber);
            state.details.billedTo = customerType
                ? customer[0].companyName
                : `${customer[0].firstName} ${customer[0].lastName}`;
            state.details.gstin = customer[0].gstNumber;
            state.details.address = `${customer[0].address}, ${customer[0].city}, ${customer[0].state}, ${customer[0].country}`;
            state.details.shippedTo = `${customer[0].address}, ${customer[0].city}, ${customer[0].state}, ${customer[0].country}`;
            state.details.customerId = customer[0].id;
            state.details.customerPhone = customer[0].phone;
            // get unique passenger names and in bracked their mobile number, seperated by comma from dutySlips
            const uniquePassengers = [
                ...new Set(
                    dutySlips.map(
                        (item) =>
                            `${item.passengerName} (${item.passengerPhone})`
                    )
                ),
            ];
            state.details.representative = uniquePassengers;
            // add extra keys to dutySlipsItems like fare, totalKM, fuelPerKM, toll, nightHalt, total
            dutySlipsItems.forEach((item) => {
                item.fare = 0;
                item.fuelPerKM = 0;
                item.toll = 0;
                item.nightHalt = 0;
                item.total = 0;
            });

            state.details.trips = dutySlipsItems;
            state.loading = false;
            state.hasFetchedInvoiceDetails = true;
        },
        [getInvoiceDetails.pending]: (state) => {
            state.loading = true;
        },
    },
});


export const {
    resetData,
    setFilters,
    setCustomerId,
    addDutySlipItem,
    removeDutySlipItem,
    addAllDutySlipItem,
    removeAllDutySlipItem,
    setCurrentStep,
    setDutySlips,
    setSelectedDutySlip,
    updateDetails,
    updateTrips,
    setHasFetchedInvoiceDetails,
} = dataSlice.actions;

export default dataSlice.reducer;
