import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createWinnerRelevant } from './WinnerSlice';

const CODE_OF_ERROR = 500;
const STATUS_200 = 200;
const CONVERT_TO_MS = 1000;
const FIX_NUMBER_INDEX = 2;

export const startEngineFetch = createAsyncThunk(
  'carEngine/startEngineFetch',
  async function (carId: number, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`http://127.0.0.1:3000/engine?status=started&id=${carId}`, {
        method: 'PATCH',
        headers: {},
      });
      if (!response.ok) throw new Error('Server Error');

      const data = await response.json();
      dispatch(createCarEngineValues({ id: carId, velocity: data.velocity, distance: data.distance }));
      const time = Number((data.distance / data.velocity / CONVERT_TO_MS).toFixed(FIX_NUMBER_INDEX));
      dispatch(driveModeFetch({ carId, time }));
      return data;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const driveModeFetch = createAsyncThunk(
  'carEngine/driveModeFetch',
  async function ({ carId, time }: { carId: number, time: number }, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`http://127.0.0.1:3000/engine?status=drive&id=${carId}`, {
        method: 'PATCH',
        headers: {},
      });
      if (response.status === CODE_OF_ERROR) {
        dispatch(toggleIsBroken(carId));
      } else if (response.status === STATUS_200) {
        dispatch(createWinnerRelevant({ id: carId, time: time }));
      }

      if (!response.ok) throw new Error('Server Error');

      return await response.json();

    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const stopEngineFetch = createAsyncThunk(
  'carEngine/StopEngineFetch',
  async function (carId: number, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`http://127.0.0.1:3000/engine?status=stopped&id=${carId}`, {
        method: 'PATCH',
        headers: {},
      });
      dispatch(resetEngineValues(carId));
      if (!response.ok) throw new Error('Server Error');

      return await response.json();

    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

interface CarEngineValues {
  id: number;
  velocity: number;
  distance: number;
  isEngineStarted: boolean;
  isBroken: boolean;
}

const initialState: Record<number, CarEngineValues> = {};

const carEngineSlice = createSlice({
  name: 'carEngine',
  initialState,
  reducers: {
    createCarEngineValues(state, action) {
      return {
        ...state,
        [action.payload.id]: {
          id: action.payload.id,
          velocity: action.payload.velocity,
          distance: action.payload.distance,
          isEngineStarted: true,
          isBroken: false,
        },
      };
    },
    toggleIsBroken(state, action) {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          isBroken: true,
        },
      };
    },
    resetEngineValues(state, action) {
      return {
        ...state,
        [action.payload]: {
          id: action.payload,
          velocity: 0,
          distance: 0,
          isEngineStarted: false,
          isBroken: false,
        },
      };
    },
  },
});

export const { createCarEngineValues, toggleIsBroken, resetEngineValues } = carEngineSlice.actions;
export default carEngineSlice.reducer;