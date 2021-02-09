import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import postSaga from './post';
import userSaga from './user';

axios.defaults.baseURL = 'http://localhost:3065';

//call 동기, fork 비동기
export default function* rootSaga() {
  yield all([
    fork(postSaga),
    fork(userSaga),
  ]);
}