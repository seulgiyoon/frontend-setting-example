import { combineReducers } from '@reduxjs/toolkit';
import postsReducer, { IPosts } from './../features/posts/postsSlice';
import { postsSaga } from './../features/posts/postsSaga';

export interface IProjectA {
  posts: IPosts;
}

export const projectAState = combineReducers({
  posts: postsReducer,
});

// saga 리스트
export const projectASaga = [postsSaga];
