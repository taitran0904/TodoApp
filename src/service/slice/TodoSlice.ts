import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TodoType, TodoState} from '../../types/todo';

const initialState: TodoState = {
  todoList: [],
  loading: false,
  actionLoading: '',
};

const TodoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    getTodoList(state) {
      state.loading = true;
    },

    getTodoListSuccess(state, action: PayloadAction<TodoType[]>) {
      state.todoList = action.payload;
      state.loading = false;
    },

    getTodoListFail(state) {
      state.loading = false;
    },

    createTodo(state, _action: PayloadAction<TodoType>) {
      state.actionLoading = 'createTodoLoading';
    },

    createTodoSuccess(state, _action: PayloadAction<string>) {
      state.actionLoading = 'createTodoSuccess';
    },

    createTodoFail(state) {
      state.actionLoading = 'createTodoFail';
    },

    deleteTodo(state, _action: PayloadAction<string>) {
      state.actionLoading = 'deleteTodoLoading';
    },

    deleteTodoSuccess(state) {
      state.actionLoading = 'deleteTodoSuccess';
    },

    deleteTodoFail(state) {
      state.actionLoading = 'deleteTodoFail';
    },

    hideloading(state) {
      state.loading = false;
    },
  },
});

export const {
  getTodoList,
  getTodoListSuccess,
  getTodoListFail,
  hideloading,
  createTodo,
  createTodoSuccess,
  createTodoFail,
  deleteTodo,
  deleteTodoFail,
  deleteTodoSuccess,
} = TodoSlice.actions;
export default TodoSlice.reducer;
