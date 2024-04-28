import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import carsReducer from './slices/CarManageSlice';
import engineReducer from './slices/CarEngineSlice';
import winnerReducer from './slices/WinnerSlice';

export const store = configureStore({
  reducer: {
    allCars: carsReducer,
    carEngine: engineReducer,
    winners: winnerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;