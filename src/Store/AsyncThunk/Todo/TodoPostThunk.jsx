import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../../Utils/AxiosConstructor";

export const TodoPostThunk = createAsyncThunk(
  "todo/post",
  async (postData, { rejectWithValue }) => {
    try {
      const request = await Api.post("todo/create", postData);
      return request.data;
    } catch (error) {
      rejectWithValue(error.response.message);
    }
  },
);
const initialState = {
  isLoading: false,
  data: [],
  error: null,
};
const TodoPostSlice = createSlice({
  name: "TodoPostSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(TodoPostThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(TodoPostThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(TodoPostThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});
export default TodoPostSlice.reducer;
