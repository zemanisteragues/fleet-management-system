import { combineReducers } from '@reduxjs/toolkit';
import state from './stateSlice';
import data from './dataSlice';
import userData from './usersSlice';
const reducer = combineReducers({
    state,
    data,
    userData
});

export default reducer;
