import { createSlice } from '@reduxjs/toolkit';
// type
import type { AuthFormState, GlobalState } from './type';

const authFormInitialState: AuthFormState = {
  loading: false,
  error: null,
};

const initialState: GlobalState = {
  userInfo: {
    userName: null,
    userId: null,
    isAuthenticated: false,
  },
  login: {
    ...authFormInitialState,
    email: null,
    password: null,
  },
  signup: {
    ...authFormInitialState,
    name: null,
    email: null,
    password: null,
  },
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setAuth: (
      state,
      { payload }: { payload: Partial<GlobalState['userInfo']> },
    ) => {
      const {
        userId = null,
        userName = null,
        isAuthenticated = false,
      } = payload;
      state.userInfo = { userId, userName, isAuthenticated };
    },
    setLogin: (
      state,
      { payload }: { payload: Partial<GlobalState['login']> },
    ) => {
      state.login = { ...state.login, ...payload };
    },
    setSignup: (
      state,
      { payload }: { payload: Partial<GlobalState['signup']> },
    ) => {
      state.signup = { ...state.signup, ...payload };
    },
  },
});

// action creators
export const { setAuth, setSignup, setLogin } = globalSlice.actions;
export const getAuthState = (state: { global: GlobalState }) =>
  state.global.userInfo.isAuthenticated;
export const getLoginState = (state: { global: GlobalState }) =>
  state.global.login;
export const getSignupState = (state: { global: GlobalState }) =>
  state.global.signup;
export const getUserInfo = (state: { global: GlobalState }) =>
  state.global.userInfo;
export default globalSlice.reducer;
