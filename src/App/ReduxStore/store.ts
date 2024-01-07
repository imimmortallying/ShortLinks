import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../widgets/SendLink/models/authSlice'
import resultAliasReducer from 'widgets/SendLink/models/resultAliasSlice';
import allUsersLinksReducer from 'Pages/MainPage/models/allUsersLinksSlice';

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