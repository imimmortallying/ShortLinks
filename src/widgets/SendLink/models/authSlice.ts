import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'App/ReduxStore/store';

export const authSlice = createSlice({
    name: 'auth',
    // или строка с username, либо false
    initialState: '',
    reducers:{
        req_setUser: (state, action) => {
            return state = action.payload;
        },
        logoutUser: (state) => {
            return state = '';
        }
    }
})


export default authSlice.reducer
export const selectUsername = (state: RootState) => state.username
export const {req_setUser, logoutUser} = authSlice.actions