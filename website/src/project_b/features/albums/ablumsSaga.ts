import { takeEvery, put, call } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { JSON_BASE_URL } from 'utils/constant';
import {
  getAlbums,
  getAlbumsSuccess,
  getAlbumsFail,
  AlbumState,
} from './albumsSlice';

const apiRequest = (): Promise<AxiosResponse<AlbumState[]>> => {
  return axios.get(`${JSON_BASE_URL}/albums?userId=1`);
};

function* getAlbumData() {
  try {
    const res: AxiosResponse<AlbumState[]> = yield call(apiRequest);
    yield put(getAlbumsSuccess(res.data));
  } catch (error) {
    yield put(getAlbumsFail(error));
    console.log('error: ', error);
  }
}

export function* albumsSaga() {
  yield takeEvery(getAlbums, getAlbumData);
}
