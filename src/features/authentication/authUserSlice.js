import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message || "Login failed");
    }

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue("Failed to parse response", error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue("Failed to parse response", error.message);
    }
  }
);

export const guestLoginUser = createAsyncThunk(
  "auth/guestLoginUser",
  async () => {
    const response = await fetch("/api/auth/guest-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue("Failed to parse response", error.message);
    }
  }
);

const authUserSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    error: null,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      toast.success("Logout Successfully");
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.foundUser;
        state.token = action.payload.encodedToken;
        state.loading = false;
        state.error = null;
        toast.success("logged in successfully");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        toast.error(`User credentials not found`);
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.createdUser;
        state.token = action.payload.encodedToken;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(guestLoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(guestLoginUser.fulfilled, (state, action) => {
        state.user = action.payload.foundUser;
        state.token = action.payload.encodedToken;
        state.loading = false;
        state.error = null;
        toast.success("Logged in as Guest successfully");
      })
      .addCase(guestLoginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { logout, clearErrors } = authUserSlice.actions;
export default authUserSlice.reducer;
