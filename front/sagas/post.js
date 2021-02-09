import { all, call, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import axios from 'axios';

import { 
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, 
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, dummyPost, REMOVE_POST_OF_ME, generateDummyPost, 
  LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
} from '../reducers/post';
import { ADD_POST_TO_ME } from '../reducers/user';


function addPostAPI(postData) {
  return axios.post('/post/addPost', postData, {
    withCredentials: true,
  });
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data); 
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data

    });
  }
}
function addCommentAPI() {
  return axios.post('/api/addComment');
}

function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI); 
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data

    });
  }
}

function removePostAPI() {
  return axios.post('/api/removePost');
}

function* removePost(action) {
  try {
    // const result = yield call(removePostAPI); 
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data

    });
  }
}

function loadPostsAPI(lastId) {
  return axios.get('/posts', lastId);
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.data); 
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data

    });
  }
}


function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLoadPosts),
  ]);
}