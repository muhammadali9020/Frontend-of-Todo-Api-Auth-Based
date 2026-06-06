import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../../Utils/AxiosConstructor";
export const LoginThunk = createAsyncThunk(
  "App/Login",
  async (LoginData, { rejectWithValue }) => {
    try {
      const request = await Api.post("/user/signin", {
        email: LoginData.email,
        password: LoginData.password,
      });
      return request.data;
    } catch (error) {
     return rejectWithValue(error.response.data);
    }
  },
);
const initialState = {
  isLoading: false,
  error: null,
  data: [],
};

const LoginSlice = createSlice({
  name: "LoginSlice",
  initialState,
  reducers:{
ResetLogin:(state)=>{
state.data=[]
state.isLoading=false
state.error=null
}
  },
  extraReducers: (builder) => {
    builder.addCase(LoginThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(LoginThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});
export default LoginSlice.reducer;
export const {ResetLogin}=LoginSlice.actions