import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { todoApi } from "../../../api";
import { Task } from "../../../shared/types"
import { getThunk } from "./getThunk";

export const completeThunk = createAsyncThunk<Task, { id: string }>(
  "@todos/complete/request",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await todoApi.post(`/tasks/${payload.id}/complete`, {
        params: payload,
      });

      await dispatch(getThunk());

      toast.success("Task has been completed");

      return response.data;
    } catch (error) {
      const errorData =
        (axios.isAxiosError(error)
          ? error.response?.data
          : error) ?? "Unknown error occurred";

      toast.error(`Error: ${errorData ?? 'something going wrong'}'`);

      return rejectWithValue(errorData);
    }
  }
);
