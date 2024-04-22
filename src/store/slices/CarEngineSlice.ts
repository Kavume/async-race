import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const startEngineFetch = createAsyncThunk(
  'carEngine/startEngineFetch',
  async function (carId: number, { rejectWithValue, dispatch }) {
    console.log(carId);
    try {
      const response = await fetch(`http://127.0.0.1:3000/engine?status=started&id=${carId}`, {
        method: 'PATCH',
        headers: {},
      });
      if (!response.ok) throw new Error('Server Error');

      const data = await response.json();
      dispatch(createCarEngineValues({ id: carId, velocity: data.velocity, distance: data.distance }));
      dispatch(driveModeFetch(carId));
      return data;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);


export const driveModeFetch = createAsyncThunk(
  'carEngine/driveModeFetch',
  async function (carId, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`http://127.0.0.1:3000/engine?status=drive&id=${carId}`, {
        method: 'PATCH',
        headers: {},
      });
      const codeOfError = 500;
      console.log(response.status);
      if (response.status === codeOfError) {
        dispatch(toggleIsBroken(carId));
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