import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiSignUp, apiChangeRole, apiDeleteUser, apiGetAllUsers } from 'services/AuthService';

const usersInitailState = {
  users: [],
  loading: false,
  error: null,
  success: null,
};


// export const createUser = createAsyncThunk(
//   'admin/createUser',
//   async (data) => {
//     const response = await apiSignUp(data);
//     return response.data;
//   }
// );

export const getAllUsers = createAsyncThunk(
  'admin/getAllUsers',
  async () => {
    const response = await apiGetAllUsers();
    return response.data;
  }
)


export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (data) => {
    const response = await apiDeleteUser(data);
    return response.data;
  }
);

export const changeRole = createAsyncThunk(
  'admin/changeRole',
  async (data) => {
    const response = await apiChangeRole(data);
    return response.data;
  }
);



const userSlice = createSlice({
  name: 'admin/users',
  initialState: usersInitailState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    }
  },
  extraReducers: {
    [deleteUser.pending]: (state) => {
      state.loading = true;
    }
    ,
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    }
    ,
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    }
    ,
    [changeRole.pending]: (state) => {
      state.loading = true;
    }

    ,
    [changeRole.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    }
    ,
    [changeRole.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    }
    ,
    [getAllUsers.pending]: (state) => {
      state.loading = true;
    }
    ,
    [getAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    }
    ,
    [getAllUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    }
  },
});


export const { setUsers } = userSlice.actions;

export default userSlice.reducer;
