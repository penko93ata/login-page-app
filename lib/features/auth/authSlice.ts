import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { checkAuthAction, logoutAction } from "@/app/[locale]/login/action";

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async thunk to check authentication status using server action
export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, { rejectWithValue }) => {
  try {
    const result = await checkAuthAction();

    if (result.isAuthenticated && result.user) {
      return result.user;
    } else {
      return rejectWithValue("Not authenticated");
    }
  } catch (error) {
    return rejectWithValue("Failed to check authentication");
  }
});

// Async thunk to logout user using server action
export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await logoutAction();
    return null;
  } catch (error) {
    return rejectWithValue("Failed to logout");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set user when login is successful
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },

    // Action to clear user when logout or session expires
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    // Action to set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Action to set error
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Action to clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle checkAuth async thunk
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })

      // Handle logoutUser async thunk
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearUser, setLoading, setError, clearError } = authSlice.actions;
export default authSlice.reducer;
