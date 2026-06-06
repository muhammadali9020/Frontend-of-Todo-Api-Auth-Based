import { configureStore } from "@reduxjs/toolkit";
import RegisterSlice from "./AsyncThunk/Auth/RegisterThunk";
import LoginSlice from "./AsyncThunk/Auth/LoginThunk";
import GetTodoSlice from "./AsyncThunk/Todo/TodoGetThunk";
import TodoPostSlice from "./AsyncThunk/Todo/TodoPostThunk";
import TodoDeleteSlice from "./AsyncThunk/Todo/TodoDeleteThunk";
const Store = configureStore({
  reducer: {
    // Auth Slices
    RegisterSlice,
    LoginSlice,
    // Todos Slices
    GetTodoSlice,
    TodoPostSlice,
    TodoDeleteSlice,
  },
});

export default Store;
