import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'App/ReduxStore/store';

export const allUsersLinksSlice = createSlice({
    name: 'allUsersLinks',
    // или строка с username, либо false
    initialState: '',
    reducers:{
        req_setAllUsersLinks: (state, action) => {
            return state = action.payload;
        },

    }
})


export default allUsersLinksSlice.reducer
export const selectAllUsersLinks = (state: RootState) => state.allUsersLinks
export const {req_setAllUsersLinks} = allUsersLinksSlice.actions