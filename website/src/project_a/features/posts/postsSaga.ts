import { takeEvery, put, call } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { JSON_BASE_URL } from 'utils/constant';
import {
  getPosts,
  getPostsSuccess,
  getPostsFail,
  PostState,
} from './postsSlice';

const apiRequest = (): Promise<AxiosResponse<PostState[]>> => {
  return axios.get(`${JSON_BASE_URL}/posts?userId=1`);
};

function* getPostData() {
  try {
    const res: AxiosResponse<PostState[]> = yield call(apiRequest);
    yield put(getPostsSuccess(res.data));
  } catch (error) {
    yield put(getPostsFail(error));
    console.log('error: ', error);
  }
}

export function* postsSaga() {
  yield takeEvery(getPosts, getPostData);
}
