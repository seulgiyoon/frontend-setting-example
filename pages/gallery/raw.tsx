import React from 'react';
import styled from 'styled-components';
import { IMAGE_DATA } from '../../data';

const StyledImageGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, minmax(auto, 1fr));
  img {
    object-fit: cover;
  }
`;

export default function RawImagesPage() {
  return (
    <StyledImageGrid>
      {IMAGE_DATA.map((singleData, index) => (
        <img
          key={index}
          src={singleData.imgUrl}
          alt=""
          width={200}
          height={200}
        />
      ))}
    </StyledImageGrid>
  );
}
