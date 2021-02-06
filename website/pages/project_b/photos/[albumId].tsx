import React, { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { PhotoState } from 'src/project_b/features/photos/photosSlice';
import { apiRequest } from 'src/project_b/features/photos/photosSaga';

interface PhotoPageProps {
  photos: PhotoState[];
  albumId: string;
}

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
  const { albumId } = params;

  try {
    const { data } = await apiRequest(albumId);
    return {
      props: {
        photos: data,
        albumId,
      },
      revalidate: 1,
    };
  } catch (error) {
    console.error(`Get photos from album id ${albumId} error: `, error);
    return {
      props: {
        photos: {},
        albumId,
      },
      revalidate: 1,
    };
  }
}

// getStaticProps에서 리턴한 postData를 받아서 사용
export default function Post({ photos, albumId }: PhotoPageProps) {
  if (!photos) return null;

  return (
    <>
      <Head>
        <title>Album Number: {albumId}</title>
      </Head>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <figcaption>{photo.title}</figcaption>
            <figure>
              <Image src={photo.url} width={200} height={200} />
            </figure>
          </li>
        ))}
      </ul>
    </>
  );
}
