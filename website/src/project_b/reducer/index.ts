import { combineReducers } from '@reduxjs/toolkit';
import photosReducer, { IPhotos } from './../features/photos/photosSlice';
import albumsReducer, { IAlbums } from './../features/albums/albumsSlice';
import { photosSaga } from './../features/photos/photosSaga';
import { albumsSaga } from './../features/albums/ablumsSaga';

export interface IProjectB {
  albums: IAlbums;
  photos: IPhotos;
}

export const projectBState = combineReducers({
  albums: albumsReducer,
  photos: photosReducer,
});

// saga 리스트
export const projectBSaga = [albumsSaga, photosSaga];
