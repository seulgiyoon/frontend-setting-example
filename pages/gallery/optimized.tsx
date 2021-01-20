import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { PET_IMAGES_OPTIMIZED } from '../../data';
const requiredImg = require('../../public/images/cat01.jpeg');

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

console.log({ img: requiredImg.default });
if (process.browser) {
  console.log({ dpr: window.devicePixelRatio });
}

export default function OptimizedImagesPage() {
  return (
    <StyledImageGrid>
      {PET_IMAGES_OPTIMIZED.map((singleData, index) => {
        return (
          <Image
            key={index}
            src={require(`../../public/images/${singleData.imgUrl}`).default}
            // src={singleData.imgUrl}
            alt=""
            width={100}
            height={100}
            objectFit="cover"
          />
        );
      })}
    </StyledImageGrid>
  );
}
