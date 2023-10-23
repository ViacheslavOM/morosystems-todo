import { combineReducers } from "@reduxjs/toolkit";
import {
  complete,
  create,
  deleteAll,
  deleteTask,
  edit,
  get,
  incomplete,
} from "./todos/slices";

const reducers = {
  complete: complete.reducer,
  create: create.reducer,
  deleteAll: deleteAll.reducer,
  deleteTask: deleteTask.reducer,
  edit: edit.reducer,
  get: get.reducer,
  incomplete: incomplete.reducer,
};

export const rootReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducer>;
