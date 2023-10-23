import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { todoApi } from "../../../api";
import { toast } from "react-toastify";
import { getThunk } from "./getThunk";

export const deleteTaskThunk = createAsyncThunk(
  "@todos/deleteTask/request",
  async ({ id }: { id: string }, { rejectWithValue, dispatch }) => {
    try {
      await todoApi.delete(`/tasks/${id}`);

      await dispatch(getThunk());

      toast.success("Task has been deleted successful");

      return { id };
    } catch (error) {
      const errorData = axios.isAxiosError(error)
        ? error.response?.data
        : error;

      toast.error(`Error: ${errorData ?? "something going wrong"}'`);

      return rejectWithValue(errorData);
    }
  }
);
