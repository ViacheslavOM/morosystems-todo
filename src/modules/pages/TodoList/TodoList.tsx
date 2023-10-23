import {
  Button,
  Card,
  Checkbox,
  Input,
  Space,
  Spin,
  Typography,
} from "antd";
import { useTodoList } from "./useTodoList";
import { DataRequestState } from "../../shared/types";

import "./TodoList.scss";
import { formattedDate } from "../../shared/utils";
import { DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { FC } from "react";
import { Filters, InputTask } from "./components";

export const TodoList: FC = () => {
  const {
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
  } = useTodoList();

  return (
    <div className="TodoList">
      <Space direction="vertical">
        <Filters
          value={filter}
          onChange={setFilter}
          data={getDataState}
          filteredData={filteredTodos}
        />
        <InputTask />

        <Card
          title="Todos"
          className="TodoList__card"
          extra={`Completed tasks: ${
            filteredTodos.filter((item) => item.completed).length
          }/${filteredTodos.length}`}>
          {getDataState.requestData === DataRequestState.Loading ? (
            <Spin tip="Loading" size="large">
              <div className="content" />
            </Spin>
          ) : (
            filteredTodos.map((item) => (
              <Card.Grid key={item.id}>
                <Checkbox
                  checked={item.completed}
                  onChange={() => handleChangeCheckbox(item.id)}
                />
                {editingItemId === item.id ? (
                  <Typography className="TodoList__task">
                    Task:
                    <Input
                      placeholder="Enter task"
                      defaultValue={item.text}
                      onChange={(e) =>
                        setInputValue(e.target.value || item.text)
                      }
                    />
                  </Typography>
                ) : (
                  <Typography className="TodoList__task">
                    Task: {item.text}
                  </Typography>
                )}
                <Typography>
                  Creation date: {formattedDate(item.createdDate)}
                </Typography>
                <Button
                  icon={
                    editingItemId === item.id ? (
                      <SaveOutlined />
                    ) : (
                      <EditOutlined />
                    )
                  }
                  onClick={() => handleEditClick(item.id, inputValue || "")}>
                  {editingItemId === item.id ? "Save" : "Edit"}
                </Button>
                <Button
                  type="primary"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteClick(item.id)}>
                  Delete
                </Button>
              </Card.Grid>
            ))
          )}
        </Card>
      </Space>
    </div>
  );
};
