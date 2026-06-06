import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../../Utils/AxiosConstructor";

export const RegisterThunk = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const request = await Api.post("user/signup", userData);
      return request.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
const initialState = {
  isLoading: false,
  value: [],
  error: null,
};
const RegisterSlice = createSlice({
  name: "RegisterSlice",
  initialState,
  reducers: {
    ResetRegister: (state) => {
      state.error = null;
      state.isLoading = null;
      state.value = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RegisterThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(RegisterThunk.fulfilled, (state, action) => {
      state.value = action.payload;
      state.isLoading = false;
    });
    builder.addCase(RegisterThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default RegisterSlice.reducer;
export const {ResetRegister}=RegisterSlice.actions