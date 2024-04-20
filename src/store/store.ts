import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './slices/CarManageSlice';

export const store = configureStore({
  reducer: {
    allCars: carsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;