import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, wrapper, SagaStore } from 'src/global/store/store';
// import { RootState } from 'src/global/reducer';
import { getAlbums } from 'src/project_b/features/albums/albumsSlice';
import { END } from 'redux-saga';
import Link from 'next/link';

// redux example
const ExampleTodoPage = () => {
  const dispatch = useDispatch();
  const { albums, isLoading, error } = useSelector(
    (state: RootState) => state.projectB.albums,
  );

  if (albums.length === 0 || error || isLoading) return null;

  return (
    <ul>
      {albums.map((album) => (
        <li key={album.id}>
          <Link href={`/project_b/photos/${album.id}`}>
            <a style={{ fontSize: '2rem' }}>{album.id}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

// redux SSR
export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  if (store.getState().projectB.albums.albums.length !== 0) return;
  store.dispatch(getAlbums());

  store.dispatch(END);
  await (store as SagaStore).sagaTask?.toPromise();
});

export default ExampleTodoPage;
