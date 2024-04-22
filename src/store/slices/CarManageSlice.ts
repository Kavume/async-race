import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { carBrands } from '../../pages/GaragePage/data';
import { generateName, generateColor } from './utils';

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch('http://127.0.0.1:3000/garage');
      if (!response.ok) throw new Error('Server Error');

      return await response.json();

    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteCarItem = createAsyncThunk(
  'cars/deleteCarItem',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Server Error');

      const result = await response.json();
      dispatch(fetchCars());
      return result;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createNewCar = createAsyncThunk(
  'cars/createNewCar',
  async ({ carNameValue, carColorValue }: { carNameValue: string; carColorValue: string }, {  rejectWithValue }) => {
    try {
      if (!carColorValue.length) carColorValue = '#000';
      if (!carNameValue.length) carNameValue = 'No name';

      const response = await fetch('http://127.0.0.1:3000/garage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: carNameValue, color: carColorValue }),
      });

      if (!response.ok) throw new Error('Server Error');

      return await response.json();

    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const generateNewCars = createAsyncThunk(
  'cars/generateNewCars',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const start = 0;
      const end = 100;

      for (let i = start; i < end; i++) {
        const nameCar = generateName(carBrands);
        const colorCar = generateColor();

        const response = await fetch('http://127.0.0.1:3000/garage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: nameCar, color: colorCar }),
        });

        if (!response.ok) throw new Error('Server Error');
      }
      const cars = dispatch(fetchCars());
      return await cars;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateCar = createAsyncThunk(
  'cars/updateCar',
  async ({ carId, carName, carColor }: { carId: number; carName: string; carColor: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage/${carId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: carName, color: carColor }),
      });

      if (!response.ok) throw new Error('Server Error');

      return await response.json();

    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

interface CarItem {
  id: number;
  name: string;
  color: string;
  error: string;
}

const initialState: CarItem[] = [];

const carManageSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    createCar() {},
    deleteCar() {},
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCars.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        console.error('Error:', action.payload);
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        const existingCarIndex = state.findIndex(car => car.id === action.payload.id);
        if (existingCarIndex !== -1) {
          state[existingCarIndex] = action.payload;
        }
      })
      .addCase(updateCar.rejected, (state, action) => {
        console.error('Error:', action.payload);
      });
  },

});

export const { createCar, deleteCar } = carManageSlice.actions;
export default carManageSlice.reducer;