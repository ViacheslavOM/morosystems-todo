import { createSlice } from "@reduxjs/toolkit";
import { DataRequestState, ITaskState } from "../../../shared/types"
import { deleteAllThunk } from "../thunks";

const initialState: ITaskState = {
  todos: [],
  requestData: DataRequestState.None,
}

export const deleteAll = createSlice({
  name: "@todos/deleteAll",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteAllThunk.pending, (state) => {
      state.requestData = DataRequestState.Loading
    });

    builder.addCase(deleteAllThunk.fulfilled, (state) => {
      state.requestData = DataRequestState.Loaded;
      state.todos = state.todos.filter((item) => !item.completed);
    });

    builder.addCase(deleteAllThunk.rejected, (state) => {
      state.requestData = DataRequestState.Error
    });
  },
})
