import { createSlice } from "@reduxjs/toolkit";
import { updatedState } from "../actions"
import { DataRequestState, ITaskState } from "../../../shared/types"
import { completeThunk } from "../thunks";

const initialState: ITaskState = {
  todos: [],
  requestData: DataRequestState.None,
}

export const complete = createSlice({
  name: "@todos/complete",
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

    builder.addCase(completeThunk.fulfilled, (state, { payload }) => {
      state.requestData = DataRequestState.Loaded
      updatedState(state, payload)
    })

    builder.addCase(completeThunk.rejected, (state) => {
      state.requestData = DataRequestState.Error
    })
  },
})
