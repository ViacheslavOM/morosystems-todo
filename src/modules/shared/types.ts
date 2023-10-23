export type Task = {
  id: string;
  text: string;
  completed: boolean;
  createdDate: number;
  completedDate: number;
}

export interface ITaskState {
  todos: Array<Task>;
  requestData: DataRequestState;
}

export enum DataRequestState {
  None = 1,
  Loading = 2,
  Loaded = 3,
  Error = 4,
}
