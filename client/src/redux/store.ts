import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
// reducers
import rootReducer from "./rootReducers";

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;