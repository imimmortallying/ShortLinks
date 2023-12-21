import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'App/ReduxStore/store';

export const resultAliasSlice = createSlice({
    name: 'resultAlias',
    // или строка с username, либо false
    initialState: '',
    reducers:{
        req_setAlias: (state, action) => {
            return state = 'http://localhost:4000/' + action.payload;
        },

    }
})


export default resultAliasSlice.reducer
export const selectAlias = (state: RootState) => state.resultAlias
export const {req_setAlias} = resultAliasSlice.actions