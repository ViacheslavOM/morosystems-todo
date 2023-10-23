import { createSlice } from "@reduxjs/toolkit";
import { ITaskState, DataRequestState } from "../../../shared/types";
import { deleteTaskThunk } from "../thunks";

const initialState: ITaskState = {
  todos: [],
  requestData: DataRequestState.None,
}

export const deleteTask = createSlice({
  name: "@todos/deleteTask",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteTaskThunk.pending, (state) => {
      state.requestData = DataRequestState.Loading;
    })

    builder.addCase(deleteTaskThunk.fulfilled, (state, { payload }) => {
      const { id } = payload;
      state.todos = state.todos.filter((todo) => todo.id !== id);
    })

    builder.addCase(deleteTaskThunk.rejected, (state) => {
      state.requestData = DataRequestState.Error
    })
  },
})
