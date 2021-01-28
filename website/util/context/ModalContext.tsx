import React, { createContext } from 'react';
import useModal from '../hooks/useModal';
import { Modal } from '@monorepo/ui';

const defaultValue = {};
let ModalContext;
const { Provider } = (ModalContext = createContext(defaultValue));

const ModalProvider = ({ children }) => {
  const { modal, handleModal, modalContent } = useModal();
  return (
    <Provider value={{ modal, handleModal, modalContent }}>
      <Modal />
      {children}
    </Provider>
  );
};

export { ModalContext, ModalProvider };
