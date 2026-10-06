import {
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type {
  AuthSession,
  AuthState,
} from './auth.types';

export const AUTH_SESSION_STORAGE_KEY =
  'flowbercut.auth.session';

const getStoredSession = (): AuthSession | null => {
  try {
    const storedSession = sessionStorage.getItem(
      AUTH_SESSION_STORAGE_KEY,
    );

    if (!storedSession) {
      return null;
    }

    const session = JSON.parse(
      storedSession,
    ) as AuthSession;

    if (
      !session.accessToken ||
      !session.expiresAt ||
      !session.usuario
    ) {
      sessionStorage.removeItem(
        AUTH_SESSION_STORAGE_KEY,
      );

      return null;
    }

    const expiresAt = new Date(
      session.expiresAt,
    ).getTime();

    if (
      Number.isNaN(expiresAt) ||
      expiresAt <= Date.now()
    ) {
      sessionStorage.removeItem(
        AUTH_SESSION_STORAGE_KEY,
      );

      return null;
    }

    return session;
  } catch {
    sessionStorage.removeItem(
      AUTH_SESSION_STORAGE_KEY,
    );

    return null;
  }
};

const initialSession = getStoredSession();

const initialState: AuthState = {
  session: initialSession,
  isAuthenticated: initialSession !== null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setSession: (
      state,
      action: PayloadAction<AuthSession>,
    ) => {
      state.session = action.payload;
      state.isAuthenticated = true;

      sessionStorage.setItem(
        AUTH_SESSION_STORAGE_KEY,
        JSON.stringify(action.payload),
      );
    },

    clearSession: (state) => {
      state.session = null;
      state.isAuthenticated = false;

      sessionStorage.removeItem(
        AUTH_SESSION_STORAGE_KEY,
      );
    },
  },
});

export const {
  setSession,
  clearSession,
} = authSlice.actions;

export default authSlice.reducer;