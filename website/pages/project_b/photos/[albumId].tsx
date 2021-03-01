import React, { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/global/store/store';
import { getPhotos } from 'src/project_b/features/photos/photosSlice';

interface PhotoPageProps {
  albumId: string;
}

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
  const { albumId } = params;

  return {
    props: {
      albumId,
    },
    revalidate: 1,
  };
}

// getStaticProps에서 리턴한 postData를 받아서 사용
export default function Post({ albumId }: PhotoPageProps) {
  const dispatch = useDispatch();
  const { photos, isLoading, error } = useSelector(
    (state: RootState) => state.projectB.photos,
  );

  useEffect(() => {
    dispatch(getPhotos(albumId));
  }, [dispatch, albumId]);

  if (photos.length === 0 || error || isLoading) return null;

  return (
    <>
      <Head>
        <title>Album Number: {albumId}</title>
      </Head>
      <Link href="/project_b/albums">
        <a>BACK</a>
      </Link>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <figcaption>{photo.title}</figcaption>
            <figure>
              <Image src={photo.errorString} width={200} height={200} />
            </figure>
          </li>
        ))}
      </ul>
    </>
  );
}
