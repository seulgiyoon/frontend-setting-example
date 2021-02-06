import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AlbumState {
  userId: number;
  id: number;
  title: string;
}

export interface IAlbums {
  isLoading: boolean;
  albums: AlbumState[];
  error: Error | null;
}

const initialState: IAlbums = { isLoading: false, albums: [], error: null };

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    getAlbums: (state) => {
      state.isLoading = true;
    },
    getAlbumsSuccess: (state, action: PayloadAction<AlbumState[]>) => {
      state.isLoading = false;
      state.albums = action.payload;
    },
    getAlbumsFail: (state, action: PayloadAction<Error>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAlbums,
  getAlbumsSuccess,
  getAlbumsFail,
} = albumsSlice.actions;

export default albumsSlice.reducer;
