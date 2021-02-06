import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, wrapper, SagaStore } from 'src/global/store/store';
import { getAlbums } from 'src/project_b/features/albums/albumsSlice';
import { END } from 'redux-saga';

// redux example
const ExampleTodoPage = () => {
  const dispatch = useDispatch();
  const { albums, isLoading, error } = useSelector(
    (state: RootState) => state.projectB.albums,
  );

  // redux CSR
  // useEffect(() => {
  //   dispatch(getTodos())
  // }, [dispatch])

  if (albums.length === 0 || error || isLoading) return null;

  return <div>{JSON.stringify(albums)}</div>;
};

// redux SSR
export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  store.dispatch(getAlbums());

  store.dispatch(END);
  await (store as SagaStore).sagaTask?.toPromise();
});

export default ExampleTodoPage;
