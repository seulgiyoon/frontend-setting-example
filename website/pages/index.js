import React from 'react';
import { Layout, Navbar, Footer } from '@monorepo/ui';
import { ModalProvider } from '../util/context/ModalContext';
import { ModalContext } from './modalContext';

let { handleModal } = React.useContext(ModalContext);

export default function Home() {
  return (
    <ModalProvider>
      <Layout>
        <Navbar>
          <li>로고</li>
          <li>장바구니</li>
          <li onClick={() => handleModal('hellllllo')}>로그인</li>
        </Navbar>
        <Footer>Sample Shop</Footer>
      </Layout>
    </ModalProvider>
  );
}
