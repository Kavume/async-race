import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './slices/CarManageSlice';
import engineReducer from './slices/CarEngineSlice';

export const store = configureStore({
  reducer: {
    allCars: carsReducer,
    carEngine: engineReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;