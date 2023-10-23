import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Task } from "../../../shared/types";
import { completeThunk } from "./completeThunk";
import { toast } from "react-toastify";
import { getThunk } from "./getThunk";

export const completeAllThunk = createAsyncThunk<void, Array<Task>>(
  "@todos/completeAll/request",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const incompleteTasks = payload.filter((item) => !item.completed);
      const completedTaskPromises = incompleteTasks.map((item) =>
        dispatch(completeThunk({ id: item.id }))
      );

      await dispatch(getThunk());

      toast.success("All tasks have been completed");

      await Promise.all(completedTaskPromises);
    } catch (error) {
      const errorData = axios.isAxiosError(error)
        ? error.response?.data
        : error;

      toast.error(`Error: ${errorData ?? "something going wrong"}'`);

      return rejectWithValue(errorData);
    }
  }
);
