import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Task } from "../../../shared/types";
import { todoApi } from "../../../api";
import { toast } from "react-toastify";
import { getThunk } from "./getThunk";

export const editThunk = createAsyncThunk<
  Task,
  {
    id: string;
    text: string;
  }
>("@todos/edit/request", async ({ id, text }, { rejectWithValue, dispatch }) => {
  try {
    const response = await todoApi.post(`/tasks/${id}`, { text });

    await dispatch(getThunk());

    toast.success('Task has been edited successful');

    return response.data;
  } catch (error) {
    const errorData = axios.isAxiosError(error) ? error.response?.data : error;

    toast.error(`Error: ${errorData ?? 'something going wrong'}'`);

    return rejectWithValue(errorData);
  }
});
