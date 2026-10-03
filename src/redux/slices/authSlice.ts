import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

export type User = {
  id: string;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  initialized: boolean;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    initializeAuthStart: (state) => {
      state.isLoading = true;
    },

    initializeAuthSuccess: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.accessToken =
        action.payload.accessToken;

      state.isAuthenticated = true;
      state.isLoading = false;
      state.initialized = true;
      state.error = null;
    },

    initializeAuthEmpty: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.initialized = true;
      state.error = null;
    },

    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    loginSuccess: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.accessToken =
        action.payload.accessToken;

      state.isAuthenticated = true;
      state.isLoading = false;
      state.initialized = true;
      state.error = null;
    },

    loginFailure: (
      state,
      action: PayloadAction<string>
    ) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const {
  initializeAuthStart,
  initializeAuthSuccess,
  initializeAuthEmpty,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;