export type TodoType = {
  id?: string;
  task: string;
  priority: 0 | 1 | 2;
};

export type TodoState = {
  todoList: TodoType[];
  loading: boolean;
  actionLoading: string;
};
