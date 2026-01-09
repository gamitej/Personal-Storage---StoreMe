import { combineReducers } from "@reduxjs/toolkit";

// reducers
import globalSlice from "./global/globalSlice";

const rootReducer = combineReducers({
  global: globalSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;