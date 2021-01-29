import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import { Portal } from '@reach/portal';

const StyledModalRoot = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  z-index: 50;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.35);
`;

const StyledModal = styled('div')`
  position: relative;
  width: 200;
  box-shadow: '0px 2px 10px hsla(0, 0%, 0%, 0.15)';
  padding: 20;
  background: '#f0f0f0';
  text-align: 'center';
`;

const Modal = ({ modal, handleModal, children }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (ref.current) {
      if (modal) {
        disableBodyScroll(ref.current);
      } else {
        enableBodyScroll(ref.current);
      }
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [modal]);

  return (
    <Portal>
      {modal ? (
        <StyledModalRoot>
          <StyledModal ref={ref}>
            <button onClick={() => handleModal()}>모달 끄기</button>
            {children}
          </StyledModal>
        </StyledModalRoot>
      ) : null}
    </Portal>
  );
};

export default Modal;
