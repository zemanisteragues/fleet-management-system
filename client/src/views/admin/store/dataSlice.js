import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiSignUp, apiChangeRole, apiDeleteUser, apiGetAllUsers } from 'services/AuthService';

import {
  apiCreateNewDutyType,
  apiGetDutyTypes,
  apiUpdateDutyTypeStatus,
  apiDeleteDutyType,
} from 'services/DutyTypeServices'

const initialState = {
  dutyTypesList: [],
  loading: false,
  error: null,
  success: null,
  createMsg : null,
};

export const createUser = createAsyncThunk(
  'admin/createUser',
  async (data) => {
    const response = await apiSignUp(data);
    return response.data;
  }
);

export const getDutyTypes = createAsyncThunk(
  'dutyType/getDutyTypes',
  async () => {

    const response = await apiGetDutyTypes();
    return response;
  }
);

export const createDutyType = createAsyncThunk(
  'dutyType/createDutyType',
  async (data) => {
    const response = await apiCreateNewDutyType(data);
    return response;
  }
);

export const updateDutyTypeStatus = createAsyncThunk(
  'dutyType/updateDutyTypeStatus',
  async (data) => {
    const response = await apiUpdateDutyTypeStatus(data);
    return response;
  }
);

export const deleteDutyType = createAsyncThunk(
  'dutyType/deleteDutyType',
  async (data) => {
    const response = await apiDeleteDutyType(data);
    return response;
  }
);

const dutyTypeSlice = createSlice({
  name: 'dutyTypes/data',
  initialState,
  reducers: {
    setDutyTypes: (state, action) => {
      state.dutyTypesList = action.payload;
    }
  },
  extraReducers: {
    [getDutyTypes.pending]: (state) => {
      state.loading = true;
    }
    ,
    [getDutyTypes.fulfilled]: (state, action) => {
        state.loading = false;
      state.dutyTypesList = action.payload;
    }
    ,
    [getDutyTypes.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    }
    ,
    [createDutyType.pending]: (state) => {
      state.loading = true;
      state.success = null;
    }
    ,
    [createDutyType.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload;
      state.createMsg = action.payload;
    }
    ,
    [createDutyType.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.createMsg = action.error.message;
    }
    ,
    [updateDutyTypeStatus.pending]: (state) => {
      state.loading = true;
    }
    ,
    [updateDutyTypeStatus.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    }
    ,
    [updateDutyTypeStatus.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    }
    ,
    [deleteDutyType.pending]: (state) => {
      state.loading = true;
    }
    ,
    [deleteDutyType.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    }
    ,
    [deleteDutyType.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    }
    ,
    [createUser.pending]: (state) => {
      state.loading = true;
    }
    ,
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload;
      state.createMsg = action.payload;
    }
    ,
    [createUser.rejected]: (state, action) => {   
      state.loading = false;
      state.error = action.error.message;
      state.createMsg = action.error.message;
    }
    
  },
});






export const { setDutyTypes } = dutyTypeSlice.actions;

export default dutyTypeSlice.reducer ;

