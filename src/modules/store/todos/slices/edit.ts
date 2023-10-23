import { createSlice } from "@reduxjs/toolkit";
import { DataRequestState, ITaskState } from "../../../shared/types";
import { updatedState } from "../actions";
import { editThunk } from "../thunks";

const initialState: ITaskState = {
  todos: [],
  requestData: DataRequestState.None,
};

export const edit = createSlice({
  name: "@todos/edit",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(editThunk.pending, (state) => {
      state.requestData = DataRequestState.Loading;
    });

    builder.addCase(editThunk.fulfilled, (state, { payload }) => {
      updatedState(state, payload);
    });

    builder.addCase(editThunk.rejected, (state) => {
      state.requestData = DataRequestState.Error;
    });
  },
});
