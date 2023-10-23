import { Form, Input, Button } from "antd";
import { useInputTask } from "./useInputTask";
import { FC } from "react";

export const InputTask: FC = () => {
  const { form, onFinishCreate } = useInputTask();

  return (
    <div className="TodoList__input">
      <Form name="todos" form={form} onFinish={onFinishCreate}>
        <Form.Item
          name="task"
          rules={[{ required: true, message: "Please enter task" }]}>
          <Input placeholder="Enter task" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};
