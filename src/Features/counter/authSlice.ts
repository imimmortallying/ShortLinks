import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    // или строка с username, либо false
    initialState: '',
    reducers:{
        req_setUser: (state, action) => {
            return state = action.payload
        }
    }
})


export default authSlice.reducer
export const {req_setUser} = authSlice.actions