import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state, action) => {
      state.count += action.payload || 1;
    },
    decrement: (state, action) => {
      state.count -= action.payload || 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { increment, decrement, reset, setCount } = counterSlice.actions;
export default counterSlice.reducer;
