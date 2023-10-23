import { Select, Button } from "antd";
import { DataRequestState, ITaskState, Task } from "../../../../shared/types";
import { FC } from "react";
import { useFilters } from "./useFilters";

interface IProps {
  value: string;
  onChange: (value: string) => void;
  data: ITaskState;
  filteredData: Array<Task>;
}

export const Filters: FC<IProps> = ({ value, onChange, data, filteredData }) => {
  const {
    filterOptions,
    handleCompleteAllClick,
    handleDeleteAllClick,
  } = useFilters({ filteredData });

  return (
    <div className="TodoList__filters">
      <Select
        defaultValue="all"
        options={filterOptions}
        value={value}
        onChange={(value) => onChange(value)}
        disabled={data.requestData === DataRequestState.Loading}
      />
      <Button
        onClick={handleCompleteAllClick}
        disabled={
          (filteredData.length > 0 &&
            filteredData.every((item) => item.completed)) ||
          !filteredData.length
        }>
        Complete all
      </Button>
      <Button onClick={handleDeleteAllClick} disabled={!data.todos.length}>
        Delete all
      </Button>
    </div>
  );
};
