import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const STATUS_200 = 200;
const STEP_OF_PAGINATION = 1;
const LIMIT = 10;


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
    updateWinner() {

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
        console.log(action);
        return {
          ...state,
          winnerItems: action.payload.data,
          totalPage: action.payload.totalPage,
        };
      })
      .addCase(getWinners.rejected, (state, action) => {
        console.error('Error:', action.payload);
      });
  },
});

export const { prevButtonPaginationWinner, nextButtonPaginationWinner } = WinnersSlice.actions;
export default WinnersSlice.reducer;