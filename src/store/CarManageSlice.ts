import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
  async function (id, { rejectWithValue }) {
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Server Error');

      return await response.json();

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
    createCar(state, action) {
      state.cars.push({
        name: action.payload.name,
        color: action.payload.color,
      });
    },
    deleteCar(state, action) {
      state.cars = state.cars.filter(car => car.id !== action.payload.id);
    },
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