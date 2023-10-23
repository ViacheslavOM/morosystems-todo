import { createSlice } from "@reduxjs/toolkit";
import { DataRequestState, ITaskState } from "../../../shared/types"
import { completeThunk } from "../thunks";

const initialState: ITaskState = {
  todos: [],
  requestData: DataRequestState.None,
}

export const completeAll = createSlice({
  name: "@todos/completeAll",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(completeThunk.pending, (state) => {
      state.requestData = DataRequestState.Loading
    })

    builder.addCase(completeThunk.fulfilled, (state) => {
      state.requestData = DataRequestState.Loaded
      state.todos = state.todos.filter((item) => item.completed);
    })

    builder.addCase(completeThunk.rejected, (state) => {
      state.requestData = DataRequestState.Error
    })
  },
})
