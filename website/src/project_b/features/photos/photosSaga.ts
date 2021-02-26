import { takeEvery, put, call } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { JSON_BASE_URL } from 'utils/constant';
import {
  getPhotos,
  getPhotosSuccess,
  getPhotosFail,
  PhotoState,
} from './photosSlice';

export const apiRequest = (
  albumId: string,
): Promise<AxiosResponse<PhotoState[]>> => {
  return axios.get(`${JSON_BASE_URL}/photos?albumId=${albumId}&_limit=8`);
};

function* getPhotoData(action: ReturnType<typeof getPhotos>) {
  try {
    const res: AxiosResponse<PhotoState[]> = yield call(
      apiRequest,
      action.payload,
    );
    yield put(getPhotosSuccess(res.data));
  } catch (error) {
    yield put(getPhotosFail(error));
    console.log('error: ', error);
  }
}

export function* photosSaga() {
  yield takeEvery(getPhotos, getPhotoData);
}
