import { Form, FormInstance } from "antd";
import { useAppDispatch } from "../../../../store/store";
import { createThunk } from "../../../../store/todos/thunks";
import { Task } from "../../../../shared/types";

export const useInputTask = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<FormInstance<Task>>();
  
  const onFinishCreate = () => {
    dispatch(createThunk({ text: form.getFieldValue("task") }));
    form.resetFields();
  };

  return { form, onFinishCreate }
};
