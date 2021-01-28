import React from 'react';
import styled from 'styled-components';

const StyledModal = styled('div')`
  position: 'absolute';
  top: 50%;
  right: 50%;
  width: 200;
  box-shadow: '0px 2px 10px hsla(0, 0%, 0%, 0.25)';
  padding: 20;
  background: '#f0f0f0';
  text-align: 'center';
`;

const Modal = (props) => {
  return <StyledModal>This is in the portal</StyledModal>;
};

export default Modal;
