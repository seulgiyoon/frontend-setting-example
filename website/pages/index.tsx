import React, { useContext } from 'react';
import { Layout, Navbar, Footer, UserNav } from '@monorepo/ui';
import { ModalContext } from '../utils/context/ModalContext';
// import { ModalContext } from '@monorepo/context/ModalContext';
import { ProductApi } from 'api/product';
import { useQuery, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

const getWineList = () => ProductApi.byColor('reds');

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('wines', getWineList);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Home = () => {
  const { handleModal } = useContext(ModalContext);

  const { data } = useQuery('wines', getWineList);

  return (
    <>
      <Navbar>
        <li>Home</li>
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

export default Home;
