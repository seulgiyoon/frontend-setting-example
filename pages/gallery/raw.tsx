import React from 'react';
import styled from 'styled-components';
import { PET_IMAGES } from '../../data';

const StyledImageGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, minmax(auto, 1fr));

  .container {
    position: relative;
    padding-top: 100%;
  }

  img {
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export default function RawImagesPage() {
  return (
    <StyledImageGrid>
      {PET_IMAGES.map((singleData, index) => (
        <div key={index} className="container">
          <img src={singleData.imgUrl} alt="" width={100} height={100} />
        </div>
      ))}
    </StyledImageGrid>
  );
}
