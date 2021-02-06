import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PostState {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IPosts {
  isLoading: boolean;
  posts: PostState[];
  error: Error | null;
}

const initialState: IPosts = { isLoading: false, posts: [], error: null };

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPosts: (state) => {
      state.isLoading = true;
    },
    getPostsSuccess: (state, action: PayloadAction<PostState[]>) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    getPostsFail: (state, action: PayloadAction<Error>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getPosts, getPostsSuccess, getPostsFail } = postsSlice.actions;

export default postsSlice.reducer;
