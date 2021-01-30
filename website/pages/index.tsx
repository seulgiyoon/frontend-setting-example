import React, { useContext } from 'react';
import { Layout, Navbar, Footer, UserNav } from '@monorepo/ui';
import { ModalContext } from '../utils/context/ModalContext';
// import { ModalContext } from '@monorepo/context/ModalContext';
import { ProductApi } from '@api/product';
import { useQuery, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

const getWineList = () => ProductApi.byColor('reds');

export async function getStaticProps() {
  const queryClient = new QueryClient();

  // axios 사용 시 api에서 데이터만 보내야 함. 성공/실패 등 모든 정보를 담은 객체를 보내면 직렬화 오류 발생함.
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
        <li>로고</li>
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
