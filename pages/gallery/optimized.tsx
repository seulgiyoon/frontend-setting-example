import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { IMAGE_DATA } from '../../data';

const StyledImageGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, minmax(auto, 1fr));
`;

export default function OptimizedImagesPage() {
  return (
    <StyledImageGrid>
      {IMAGE_DATA.map((singleData, index) => (
        <Image
          key={index}
          src={singleData.imgUrl}
          alt=""
          width={200}
          height={200}
          objectFit="cover"
        />
      ))}
    </StyledImageGrid>
  );
}
