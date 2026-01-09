import { createSlice } from "@reduxjs/toolkit";
// type
import type { GlobalState } from "./type";

const initialState: GlobalState = {
  isLoggedIn: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUserLogged: (state, { payload }: { payload: boolean }) => {
      state.isLoggedIn = payload;
    },
  },
});

// action creators
export const { setUserLogged } = globalSlice.actions;
export const getUserLoggedIn = (state: { global: GlobalState }) =>
  state.global.isLoggedIn;

export default globalSlice.reducer;