import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../../Utils/AxiosConstructor";
export const GetTodoThunk = createAsyncThunk(
  "todo/get",
  async (dummy, { rejectWithValue }) => {
    try {
      const request = await Api.get("todo/all");
      return request.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
const initialState = {
  isLoading: false,
  data: [],
  error: null,
};
const GetTodoSlice = createSlice({
  name: "GetTodoSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(GetTodoThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetTodoThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(GetTodoThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});
export default GetTodoSlice.reducer;
