import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const STATUS_404 = 404;
const STEP_OF_PAGINATION = 1;
const LIMIT = 10;
const INCREASE_WIN_COUNT = 1;

export const getWinners = createAsyncThunk(
  'winners/getWinners',
  async function ({ page }: { page: number }, { rejectWithValue }) {
    try {
      const response = await fetch(`http://127.0.0.1:3000/winners?_limit=${LIMIT}&_page=${page}`);
      if (!response.ok) throw new Error('Server Error');

      const data: WinnerItem[] = await response.json();
      const totalCars = Number(response.headers.get('X-Total-Count'));
      const totalPage = Math.ceil(totalCars / LIMIT);
      return { data, totalPage };

    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getDataWinCar = createAsyncThunk(
  'winners/getDataWinCar',
  async function ({ id }: { id: number }, { rejectWithValue }) {
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage/${id}`);
      if (!response.ok) throw new Error('Server Error');
      return await response.json();

    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createWinnerRelevant = createAsyncThunk(
  'winners/createWinnerRelevant',
  async function ({ id, time }:{ id: number, time: number }, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`http://127.0.0.1:3000/winners/${id}`);
      let isNewWinner = false;
      let data = null;

      if (response.ok) {
        data = await response.json();
      } else if (response.status === STATUS_404) {
        isNewWinner = true;
      } else {
        throw new Error('Server Error');
      }

      if (isNewWinner || data.time > time) {
        dispatch(createWinnerItem({ id, time }));
      } else {
        const wins = data.wins;
        dispatch(updateWinner({ id, time: data.time, wins: wins + INCREASE_WIN_COUNT }));
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createWinnerItem = createAsyncThunk(
  'winners/createWinnerItem',
  async function ({ id, time }:{ id: number, time: number }, { rejectWithValue }) {
    try {
      const response = await fetch('http://127.0.0.1:3000/winners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, time: time, wins: 1 }),
      });
      if (!response.ok) throw new Error('Server Error');
      return  await response.json();

    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateWinner = createAsyncThunk(
  'winners/updateWinner',
  async function ({ id, time, wins }:{ id: number, time: number, wins: number }, { rejectWithValue }) {
    try {
      const response = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, time: time, wins: wins++ }),
      });

      if (!response.ok) throw new Error('Server Error');
      return  await response.json();

    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const sortWinners = createAsyncThunk(
  'winners/sortWinners',
  async function ({ page, sortCriteria, sortOrder }: { page: number, sortCriteria: string, sortOrder: string }, { rejectWithValue }) {
    try {
      const response = await fetch(`http://127.0.0.1:3000/winners?_limit=${LIMIT}&_page=${page}&_sort=${sortCriteria}&_order=${sortOrder}`);

      if (!response.ok) throw new Error('Server Error');
      return  await response.json();

    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteWinner = createAsyncThunk(
  'winners/deleteWinner',
  async function ({ id }: { id: number }, { rejectWithValue, dispatch, getState }) {
    try {
      const response = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Server Error');
      const result = await response.json();
      const state = getState();
      dispatch(getWinners(state.winners.currentPage));
      return result;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

interface WinnerItem {
  id: number;
  time: number;
  wins: number;
}

interface InitialWinnerType  {
  winnerItems: WinnerItem[],
  currentPage: number,
  totalPage: number,
}

const initialState: InitialWinnerType = {
  winnerItems: [],
  currentPage: 1,
  totalPage: 1,
};

const WinnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    addNewWinner(state, action) {
      return {
        ...state,
        [action.payload.id]: {
          id: action.payload.id,
          time: action.payload.time,
          wins: 1,
        },
      };
    },
    nextButtonPaginationWinner(state) {
      return { ...state,
        currentPage: state.currentPage + STEP_OF_PAGINATION,

      };
    },
    prevButtonPaginationWinner(state) {
      return { ...state,
        currentPage: state.currentPage - STEP_OF_PAGINATION,

      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getWinners.fulfilled, (state, action) => {
        return {
          ...state,
          winnerItems: action.payload.data,
          totalPage: action.payload.totalPage,
        };
      })
      .addCase(getWinners.rejected, (state, action) => {
        console.error('Error:', action.payload);
      })
      .addCase(sortWinners.fulfilled, (state, action) => {
        console.log(action.payload);
        return {
          ...state,
          winnerItems: action.payload,
        };
      })
      .addCase(sortWinners.rejected, (state, action) => {
        console.error('Error:', action.payload);
      });
  },
});

export const { prevButtonPaginationWinner, nextButtonPaginationWinner } = WinnersSlice.actions;
export default WinnersSlice.reducer;