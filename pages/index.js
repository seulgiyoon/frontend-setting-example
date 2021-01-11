import React from 'react';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image
        src="/images/cat01.jpeg"
        alt="Picture of the author"
        width={500}
        height={500}
      />
      <p>Welcome to my homepage!</p>
    </>
  );
}
