import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PhotoState {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface IPhotos {
  isLoading: boolean;
  photos: PhotoState[];
  error: Error | null;
}

export interface albumId {
  albumId: number;
}

const initialState: IPhotos = { isLoading: false, photos: [], error: null };

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    getPhotos: (state, action: PayloadAction<albumId>) => {
      state.isLoading = true;
    },
    getPhotosSuccess: (state, action: PayloadAction<PhotoState[]>) => {
      state.isLoading = false;
      state.photos = action.payload;
    },
    getPhotosFail: (state, action: PayloadAction<Error>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getPhotos,
  getPhotosSuccess,
  getPhotosFail,
} = photosSlice.actions;

export default photosSlice.reducer;
