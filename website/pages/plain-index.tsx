import React, { useContext } from 'react';
import { Layout, Navbar, Footer, UserNav } from '@monorepo/ui';
import { ModalContext } from '../utils/context/ModalContext';
import { ProductApi } from '@api/product';

// react-query를 사용하지 않은 홈 화면
export async function getStaticProps() {
  const data = await ProductApi.byColor('reds');

  return {
    props: {
      data,
    },
  };
}

const PlainHome = ({ data }) => {
  const { handleModal } = useContext(ModalContext);

  return (
    <>
      <Navbar>
        <li>Plain Home</li>
        <li>장바구니</li>
        <li onClick={() => handleModal('hello')}>로그인</li>
      </Navbar>
      <div>
        {data
          ? data.map((singleData) => (
              <p key={singleData.id}>{singleData.wine}</p>
            ))
          : null}
      </div>
      <Footer>Sample Shop</Footer>
    </>
  );
};

export default PlainHome;
