import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { PET_IMAGES_OPTIMIZED } from '../../data';
const requiredImg = require('../../public/images/cat01.jpeg');
import { getLayout } from '../../src/project_a/components/Layouts/SiteLayout';

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

function OptimizedImagesPage() {
  return (
    <StyledImageGrid>
      {PET_IMAGES_OPTIMIZED.map((singleData, index) => {
        return (
          <Image
            key={index}
            src={require(`../../public/images/${singleData.imgUrl}`).default}
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

OptimizedImagesPage.getLayout = getLayout;

export default OptimizedImagesPage;
