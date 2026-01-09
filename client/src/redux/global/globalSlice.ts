import { createSlice } from '@reduxjs/toolkit';
// type
import type { GlobalState } from './type';

const initialState: GlobalState = {
  isAuthenticated: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUserAuth: (state, { payload }: { payload: boolean }) => {
      state.isAuthenticated = payload;
    },
  },
});

// action creators
export const { setUserAuth } = globalSlice.actions;
export const getUserAuth = (state: { global: GlobalState }) =>
  state.global.isAuthenticated;

export default globalSlice.reducer;
