import React, { createContext } from 'react';
import useModal from '@monorepo/hooks';
import { Modal } from '@monorepo/ui';

const ModalContext = createContext(undefined);

console.log(createContext);

const ModalProvider = ({ children }) => {
  const { modal, handleModal, modalContent } = useModal();
  return (
    <ModalContext.Provider value={{ modal, handleModal, modalContent }}>
      <Modal modal={modal} handleModal={handleModal}>
        {modalContent}
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
