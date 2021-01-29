import React, { createContext } from 'react';
import useModal from '@monorepo/hooks/useModal';
import { Modal } from '@monorepo/ui';

const ModalContext = createContext(undefined);

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
