import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  singleParkData: [],
  loading: false,
  error: null,
};


// export const fetchSingleParkData = createAsyncThunk(
//   "singleParkData/fetchSingleParkData",
//   async () => {
//     try {
//       const singleParkResponse = await axios.get(
//         "https://mocki.io/v1/3f66c31a-49ef-4b4e-b4f5-043d90cdd466"
//       );
//       const singleParkData = singleParkResponse.data.IT_parks;
//       return singleParkData;
//     } catch (error) {
//       throw new Error("cannot fetch single park data");
//     }
//   }
// );

export const fetchSingleParkData = createAsyncThunk(
  "singleParkData/fetchSingleParkData",
  async () => {
    try {
      const response = await fetch("https://mocki.io/v1/3f66c31a-49ef-4b4e-b4f5-043d90cdd466");

      if (!response.ok) {
        throw new Error(`Error fetching single park data: ${response.statusText}`);
      }

      const singleParkData = await response.json();
      return singleParkData.IT_parks; 
    } catch (error) {
      throw new Error("Cannot fetch single park data: " + error.message);
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
