import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../../Utils/AxiosConstructor";

export const TodoDeleteThunk = createAsyncThunk(
  "todo/delete",
  async (id, { rejectWithValue }) => {
    try {
      const request = await Api.delete(`todo/delete/${id}`);
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
export const TodoDeleteSlice = createSlice({
  name: "TodoDeleteSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(TodoDeleteThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(TodoDeleteThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(TodoDeleteThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default TodoDeleteSlice.reducer;
