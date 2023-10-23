import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { todoApi } from "../../../api";
import { Task } from "../../../shared/types";
import { getThunk } from "./getThunk";

export const createThunk = createAsyncThunk<Task, { text: string }>(
  "@todos/create/request",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await todoApi.post("/tasks", payload);

      await dispatch(getThunk());

      toast.success("Task has been created successful");

      return response.data;
    } catch (error) {
      const errorData = axios.isAxiosError(error)
        ? error.response?.data
        : error;

      toast.error(`Error: ${errorData ?? "something went wrong"}'`);

      return rejectWithValue(errorData);
    }
  }
);
