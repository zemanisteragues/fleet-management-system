import { createSlice } from '@reduxjs/toolkit';

const stateSlice = createSlice({
    name: 'dutyTypes/state',
    initialState: {
        dutyTypesData: {
            dutyType: "",
            hours: 1,
            days: 0,
            kms: 0,
            status: "ACTIVE"
        },
        userData: {
            "username": "",
            "firstname": "",
            "lastname": "",
            "password": "",
            "email": "",
            "role": ""
        },
        drawer: false,
        isValid: false
    },
    reducers: {
        setDutyTypes: (state, action) => {
            state.dutyTypesData = action.payload;
        },
        setDrawerOpen: (state) => {
            state.drawer = true;
        },
        setDrawerClose: (state) => {
            state.drawer = false;
        },
        setValid: (state, action) => {
            state.isValid = action.payload;
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
        }
    },
});

export const { setDutyTypes, setDrawerClose, setDrawerOpen, setValid, setUserData } =
    stateSlice.actions;

export default stateSlice.reducer;
