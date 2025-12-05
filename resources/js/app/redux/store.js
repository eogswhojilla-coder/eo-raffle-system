import { configureStore } from '@reduxjs/toolkit';
import raffleReducer from './raffle-slice';

export const store = configureStore({
    reducer: {
        raffle: raffleReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
