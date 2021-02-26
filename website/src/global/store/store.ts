import { configureStore } from '@reduxjs/toolkit';
import { rootReducer, rootSaga } from '../reducer';
// import { MakeStore, createWrapper, Context } from 'next-redux-wrapper';
import { MakeStore, createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware, { Task } from 'redux-saga';
import { Store } from 'redux';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  devTools: process.env.NODE_ENV !== 'production',
});

export interface SagaStore extends Store {
  sagaTask?: Task;
}

export type RootState = ReturnType<typeof store.getState>;

// export const makeStore: MakeStore<RootState> = (context: Context)
export const makeStore: MakeStore<RootState> = () => {
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper<RootState>(makeStore, { debug: true });
