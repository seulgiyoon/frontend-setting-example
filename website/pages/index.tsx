import React, { useContext } from 'react';
import { Layout, Navbar, Footer, UserNav } from '@monorepo/ui';
import { ModalContext } from '../util/context/ModalContext';
// import { ModalContext } from '@monorepo/context/ModalContext';

const Home = () => {
  const { handleModal } = useContext(ModalContext);
  return (
    <>
      <Navbar>
        <li>로고</li>
        <li>장바구니</li>
        <li onClick={() => handleModal('hello')}>로그인</li>
      </Navbar>
      <Footer>Sample Shop</Footer>
    </>
  );
};

export default Home;
