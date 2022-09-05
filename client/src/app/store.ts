import { configureStore } from '@reduxjs/toolkit';
import statsSlice from '../modules/statsSlice';
const store = configureStore({
    reducer: {
        stat: statsSlice
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
