import { useAppDispatch } from "../../../../store/store";
import {
  deleteAllThunk,
  completeAllThunk,
} from "../../../../store/todos/thunks";
import { Task } from "../../../../shared/types";

interface IProps {
  filteredData: Array<Task>;
}

export const useFilters = ({ filteredData }: IProps) => {
  const dispatch = useAppDispatch();

  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Complete", value: "complete" },
    { label: "Incomplete", value: "incomplete" },
  ];

  const handleDeleteAllClick = () => {
    dispatch(deleteAllThunk(filteredData));
  };

  const handleCompleteAllClick = () => {
    dispatch(completeAllThunk(filteredData));
  };

  return {
    filterOptions,
    handleCompleteAllClick,
    handleDeleteAllClick,
  };
};
