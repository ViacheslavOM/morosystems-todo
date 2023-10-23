import { createSlice } from "@reduxjs/toolkit";
import { DataRequestState, ITaskState } from "../../../shared/types"
import { createThunk } from "../thunks";

const initialState: ITaskState = {
  todos: [],
  requestData: DataRequestState.None,
}

export const create = createSlice({
  name: "@todos/create",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createThunk.pending, (state) => {
      state.requestData = DataRequestState.Loading
    })

    builder.addCase(createThunk.fulfilled, (state, { payload }) => {
      state.requestData = DataRequestState.Loaded
      state.todos.push(payload)
    })

    builder.addCase(createThunk.rejected, (state) => {
      state.requestData = DataRequestState.Error
    })
  },
})

