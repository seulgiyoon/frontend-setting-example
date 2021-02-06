import { combineReducers, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { all, fork } from 'redux-saga/effects';
import { projectAState, projectASaga } from 'project_a/reducer';
import { projectBState, projectBSaga } from 'project_b/reducer';

// todo: project별 state type 추가
// export interface State {}

export interface Action {
  payload?: PayloadAction;
  type: string;
}

// state: State | undefined
export const rootReducer = (state: undefined, action: Action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE');
      return action.payload;

    default: {
      const combineReducer = combineReducers({
        projectA: projectAState,
        projectB: projectBState,
      });
      return combineReducer(state, action);
    }
  }
};

export function* rootSaga() {
  const allSagas = [...projectASaga, ...projectBSaga];
  yield all(allSagas.map((saga) => fork(saga)));
}
