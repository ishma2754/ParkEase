import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  singleParkData: [],
  loading: false,
  error: null,
};



export const fetchSingleParkData = createAsyncThunk(
  "singleParkData/fetchSingleParkData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://mocki.io/v1/3f66c31a-49ef-4b4e-b4f5-043d90cdd466");

      if (!response.ok) {
        return rejectWithValue(`Error fetching single park data: ${response.statusText}`);
      }

      const singleParkData = await response.json();
      return singleParkData.IT_parks; 
    } catch (error) {
      return rejectWithValue("Cannot fetch single park data: " + error.message);
    }
  }
);

const singleParkSlice = createSlice({
  name: "singlePark",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleParkData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleParkData.fulfilled, (state, action) => {
        state.loading = false;
        state.singleParkData = action.payload;
      })
      .addCase(fetchSingleParkData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default singleParkSlice.reducer;
