import {AxiosResponse} from 'axios';
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {createTodoAPI, deleteTodoAPI, getTodoListAPI} from '../apis/todo';
import {
  createTodo,
  createTodoFail,
  createTodoSuccess,
  deleteTodo,
  deleteTodoFail,
  deleteTodoSuccess,
  getTodoList,
  getTodoListSuccess,
  hideloading,
} from '../slice/TodoSlice';
import {PayloadAction} from '@reduxjs/toolkit';
import {TodoType} from '../../types/todo';

function* getTodoListSaga() {
  try {
    const res: AxiosResponse = yield call(getTodoListAPI);
    yield put(getTodoListSuccess(res.data));
    console.log('cs');
  } catch (error) {
    //
  } finally {
    yield put(hideloading());
  }
}

function* createTodoSaga(action: PayloadAction<TodoType>) {
  try {
    const res: AxiosResponse = yield call(createTodoAPI, action.payload);
    if (res.data.id) {
      yield put(createTodoSuccess());
      yield put(getTodoList());
    } else {
      yield put(createTodoFail());
    }
  } catch (error) {
    //
  } finally {
    yield put(hideloading());
  }
}

function* deleteTodoSaga(action: PayloadAction<string>) {
  try {
    const res: AxiosResponse = yield call(deleteTodoAPI, action.payload);
    if (res.data.id) {
      yield put(deleteTodoSuccess());
      yield put(getTodoList());
    } else {
      yield put(deleteTodoFail());
    }
  } catch (error) {
    //
  } finally {
    yield put(hideloading());
  }
}

export default function* todoWatcher() {
  yield takeEvery(getTodoList.type, getTodoListSaga);
  yield takeLatest(createTodo.type, createTodoSaga);
  yield takeLatest(deleteTodo.type, deleteTodoSaga);
}
