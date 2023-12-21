import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../Features/authSlice/authSlice'
import resultAliasReducer from 'Features/resultAliasSlice/resultAliasSlice';
import allUsersLinksReducer from 'Features/allUsersLinksSlice/allUsersLinksSlice';

export const store = configureStore({
    reducer: {
        username: authReducer,
        resultAlias: resultAliasReducer,
        allUsersLinks: allUsersLinksReducer,
    },
  })


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch