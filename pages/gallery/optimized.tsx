import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { PET_IMAGES } from '../../data';

const StyledImageGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, minmax(auto, 1fr));

  > div {
    padding-top: 100%;
  }

  img {
    position: absolute;
  }
`;

export default function OptimizedImagesPage() {
  return (
    <StyledImageGrid>
      {PET_IMAGES.map((singleData, index) => (
        <Image
          key={index}
          src={singleData.imgUrl}
          alt=""
          width={100}
          height={100}
          objectFit="cover"
        />
      ))}
    </StyledImageGrid>
  );
}
