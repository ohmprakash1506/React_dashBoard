import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';

//reducers
import usersReducer from './userSlice';
import cardsReducer from './cardSlice';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        cards: cardsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})