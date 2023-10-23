import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { Task } from "../../../shared/types"
import { deleteTaskThunk } from "./deleteTaskThunk";
import { getThunk } from "./getThunk";

export const deleteAllThunk = createAsyncThunk<void, Array<Task>>(
  "@todos/deleteAll/request",
  async (todos, { rejectWithValue, dispatch }) => {
    try {
      await Promise.all(
        todos.map((item) => dispatch(deleteTaskThunk({ id: item.id })))
      );

      await dispatch(getThunk());

      toast.success('All tasks have been deleted successful');
      
    } catch (error) {
      const errorData = axios.isAxiosError(error)
        ? error.response?.data
        : error;
      
      toast.error(`Error: ${errorData ?? 'something going wrong'}'`);

      return rejectWithValue(errorData);
    }
  }
);
