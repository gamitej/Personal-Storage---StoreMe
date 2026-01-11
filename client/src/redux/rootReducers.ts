import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// reducers
import globalSlice from './global/globalSlice';

const globalPersistConfig = {
  key: 'global',
  storage,
  whitelist: ['userInfo'],
};

const persistedGlobalReducer = persistReducer(globalPersistConfig, globalSlice);

const rootReducer = combineReducers({
  global: persistedGlobalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
