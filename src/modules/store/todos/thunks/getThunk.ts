import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { todoApi } from "../../../api";
import { Task } from "../../../shared/types";
import { toast } from "react-toastify";

export const getThunk = createAsyncThunk<Array<Task>, void>(
  "@todos/get/request",
  async (_, { rejectWithValue }) => {
    try {
      const response = await todoApi.get("/tasks");

      return response.data;
    } catch (error) {
      const errorData = axios.isAxiosError(error)
        ? error.response?.data
        : error;

      toast.error(`Error: ${errorData ?? 'something going wrong'}'`);

      return rejectWithValue(errorData);
    }
  }
);
