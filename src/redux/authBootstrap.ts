import {
  initializeAuthEmpty,
  initializeAuthSuccess,
} from "./slices/authSlice";

import {
  getStoredUser,
  getStoredToken,
} from "../utils/authStorage";

import type { AppDispatch } from "./store";

export async function initializeAuth(
  dispatch: AppDispatch
) {
  try {
    const storedUser =
      await getStoredUser();

    const storedToken =
      await getStoredToken();

    if (storedUser && storedToken) {
      const user = JSON.parse(storedUser);

      dispatch(
        initializeAuthSuccess({
          user,
          accessToken: storedToken,
        })
      );

      return;
    }

    dispatch(initializeAuthEmpty());
  } catch (error) {
    console.error(
      "Failed to initialize authentication:",
      error
    );

    dispatch(initializeAuthEmpty());
  }
}