import { AnyAction, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { all, fork } from 'redux-saga/effects';
import { IProjectA, projectAState, projectASaga } from 'project_a/reducer';
import { IProjectB, projectBState, projectBSaga } from 'project_b/reducer';

export interface State {
  projectA: IProjectA;
  projectB: IProjectB;
}

export interface Action {
  payload?: State;
  type: string;
}

export const rootReducer = (state: State | undefined, action: Action) => {
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
