import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { carBrands } from '../../pages/GaragePage/data';
import { generateName, generateColor } from './utils';

const limit = 7;
const stepPagination = 1;

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async function (page: number, { rejectWithValue }) {
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage?_limit=7&_page=${page}`);
      if (!response.ok) throw new Error('Server Error');

      const data: CarItem[] = await response.json();
      const totalCars = Number(response.headers.get('X-Total-Count'));
      const totalPage = Math.ceil(totalCars / limit);

      return { data, totalPage };

    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteCarItem = createAsyncThunk(
  'cars/deleteCarItem',
  async function ({ id }: { id: number }, { rejectWithValue, dispatch, getState }) {
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Server Error');

      const result = await response.json();
      const state = getState();
      dispatch(fetchCars(state.allCars.currentPage));
      return result;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createNewCar = createAsyncThunk(
  'cars/createNewCar',
  async ({ carNameValue, carColorValue }: { carNameValue: string; carColorValue: string }, {  rejectWithValue, dispatch, getState }) => {
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
      const result = await response.json();

      const state = getState();
      dispatch(fetchCars(state.allCars.currentPage));
      return result;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const generateNewCars = createAsyncThunk(
  'cars/generateNewCars',
  async (_, { rejectWithValue, dispatch, getState }) => {
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
      const state = getState();
      const cars = dispatch(fetchCars(state.allCars.currentPage));
      return await cars;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateCar = createAsyncThunk(
  'cars/updateCar',
  async ({ carId, carName, carColor }: { carId: number; carName: string; carColor: string }, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage/${carId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: carName, color: carColor }),
      });

      if (!response.ok) throw new Error('Server Error');

      const data = await response.json();
      const state = getState();
      dispatch(fetchCars(state.allCars.currentPage));
      return data;

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

interface InitialStoreType {
  carItems: CarItem[],
  currentPage: number,
  totalPage: number,
}

const initialState: InitialStoreType = {
  carItems: [],
  currentPage: 1,
  totalPage: 1,
};

const carManageSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    nextButtonPagination(state) {
      return { ...state,
        currentPage: state.currentPage + stepPagination,

      };
    },
    prevButtonPagination(state) {
      return { ...state,
        currentPage: state.currentPage - stepPagination,

      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCars.fulfilled, (state, action) => {
        console.log(action);
        return { ...state,
          carItems: action.payload.data,
          totalPage: action.payload.totalPage,
        };
      })
      .addCase(fetchCars.rejected, (state, action) => {
        console.error('Error:', action.payload);
      })
      .addCase(updateCar.fulfilled, (state) => {
        return state;
      })
      .addCase(updateCar.rejected, (state, action) => {
        console.error('Error:', action.payload);
      });
  },

});

export const { nextButtonPagination, prevButtonPagination } = carManageSlice.actions;
export default carManageSlice.reducer;