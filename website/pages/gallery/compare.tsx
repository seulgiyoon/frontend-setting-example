import React from 'react';
import styled from 'styled-components';
import onex from '../../public/images/1x.png';
import twox from '../../public/images/2x.png';

const StyledDiv = styled.div`
  height: 100vh;
  background-color: tomato;
  padding-top: 2rem;
  h1,
  p {
    text-align: center;
  }
  p {
    margin: 0;
    padding: 1.5rem 0 1rem 0;
  }
  img {
    display: block;
    margin: 0 auto;
  }
`;
export default function RawImagesPage() {
  return (
    <StyledDiv>
      <h1>CSS 150px</h1>
      <p>1x Image(150*150px)</p>
      <img src={onex} alt="" width={150} height={150} />
      <p>2x Image(300*300px)</p>
      <img src={twox} alt="" width={150} height={150} />
    </StyledDiv>
  );
}
