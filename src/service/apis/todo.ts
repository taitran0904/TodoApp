import {TodoType} from '../../types/todo';
import request from '../axiosService';

const URL = '/';

export function getTodoListAPI() {
  return request({
    url: URL,
    method: 'get',
  });
}

export function createTodoAPI(data: TodoType) {
  return request({
    url: URL,
    method: 'post',
    data: data,
  });
}

export function deleteTodoAPI(id: string) {
  return request({
    url: `${URL}/${id}`,
    method: 'delete',
  });
}
