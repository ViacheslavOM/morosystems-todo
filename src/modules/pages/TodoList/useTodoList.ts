import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  completeThunk,
  deleteTaskThunk,
  editThunk,
  getThunk,
  incompleteThunk,
} from "../../store/todos/thunks";

export const useTodoList = () => {
  const dispatch = useAppDispatch();

  const getDataState = useAppSelector((state) => state.get);

  const [editingItemId, setEditingItemId] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>();
  const [filter, setFilter] = useState<string>("all");

  const filteredTodos = useMemo(
    () =>
      filter === "complete"
        ? getDataState.todos.filter((item) => item.completed)
        : filter === "incomplete"
        ? getDataState.todos.filter((item) => !item.completed)
        : getDataState.todos,
    [getDataState.todos, filter]
  );

  const handleEditClick = (id: string, text: string) => {
    setEditingItemId(editingItemId === id ? "" : id);
    if (editingItemId === id) {
      dispatch(editThunk({ id, text }));
    }
  };

  const handleDeleteClick = (id: string) => {
    dispatch(deleteTaskThunk({ id }));
  };

  const handleChangeCheckbox = (id: string) => {
    const task = getDataState.todos.find((item) => item.id === id);
    if (task) {
      const thunk = task.completed ? incompleteThunk : completeThunk;
      dispatch(thunk({ id }));
    }
  };

  useEffect(() => {
    dispatch(getThunk());
  }, [dispatch]);

  return {
    getDataState,
    editingItemId,
    handleEditClick,
    handleDeleteClick,
    handleChangeCheckbox,
    setInputValue,
    inputValue,
    filteredTodos,
    filter,
    setFilter,
  };
};
