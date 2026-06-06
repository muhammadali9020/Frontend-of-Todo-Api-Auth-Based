import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../../Utils/AxiosConstructor";

export const TodoSetCompletedThunk = createAsyncThunk(
  "todo/completed",
  async (TodoId) => {
    try {
      // http://localhost:3002/todo/update/6a17de79a8ebcfbba659c616
      const request = await Api.post(`todo/update/${TodoId.TodoId}`, {
        completed: TodoId.TodoStatus,
        text: TodoId.TodoText,
      });
      return request.data;
    } catch (error) {
      return null;
    }
  },
);
