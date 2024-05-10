import {all} from 'redux-saga/effects';
import todoWatcher from './todo';

function* rootSaga() {
  yield all([todoWatcher()]);
}

export default rootSaga;
