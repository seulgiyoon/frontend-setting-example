import { combineReducers, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { all } from 'redux-saga/effects';

// export interface State {}

export interface Action {
  payload?: PayloadAction;
  type: string;
}

export const rootReducer = (state: undefined, action: Action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE');
      return action.payload;

    default: {
      const combineReducer = combineReducers({});
      return combineReducer(state, action);
    }
  }
};

export function* rootSaga() {
  yield all([]);
}
