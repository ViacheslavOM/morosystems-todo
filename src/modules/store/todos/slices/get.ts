import { createSlice } from "@reduxjs/toolkit";
import { DataRequestState, ITaskState } from "../../../shared/types";
import { getThunk } from "../thunks";

const initialState: ITaskState = {
  todos: [],
  requestData: DataRequestState.None,
};

export const get = createSlice({
  name: "@todos/get",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getThunk.pending, (state) => {
      state.requestData = DataRequestState.Loading
    })

    builder.addCase(getThunk.fulfilled, (state, { payload }) => {
      state.requestData = DataRequestState.Loaded
      state.todos = payload
    })

    builder.addCase(getThunk.rejected, (state) => {
      state.requestData = DataRequestState.Error;
    });
  },
});
