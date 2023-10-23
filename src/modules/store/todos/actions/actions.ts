import { ITaskState, Task } from "../../../shared/types";

export const updatedState = (state: ITaskState, requestData: Task) => ({
  ...state,
  todos: state.todos.map((item) =>
    item.id === requestData.id ? { ...item, ...requestData } : item
  ),
});
