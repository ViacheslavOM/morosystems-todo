import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Task } from "../../../shared/types";
import { todoApi } from "../../../api";
import { toast } from "react-toastify";
import { getThunk } from "./getThunk";

export const incompleteThunk = createAsyncThunk<Task, { id: string }>(
  "@todos/incomplete/request",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await todoApi.post(`/tasks/${payload.id}/incomplete`, {
        params: payload,
      });

      await dispatch(getThunk());

      toast.success("Task has been incompleted");

      return response.data;
    } catch (error) {
      const errorData = axios.isAxiosError(error)
        ? error.response?.data
        : error;

      toast.error(`Error: ${errorData ?? "something going wrong"}'`);

      return rejectWithValue(errorData);
    }
  }
);
