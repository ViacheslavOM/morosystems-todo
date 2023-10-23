import { createSlice } from "@reduxjs/toolkit";
import { DataRequestState, ITaskState } from "../../../shared/types";
import { updatedState } from "../actions";
import { incompleteThunk } from "../thunks";

const initialState: ITaskState = {
  todos: [],
  requestData: DataRequestState.None,
};

export const incomplete = createSlice({
  name: "@todos/incomplete",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(incompleteThunk.pending, (state) => {
      state.requestData = DataRequestState.Loading;
    });

    builder.addCase(incompleteThunk.fulfilled, (state, { payload }) => {
      updatedState(state, payload);
    });

    builder.addCase(incompleteThunk.rejected, (state) => {
      state.requestData = DataRequestState.Error;
    });
  },
});
