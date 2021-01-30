import React, { useContext } from 'react';
import { Layout, Navbar, Footer, UserNav } from '@monorepo/ui';
import { ModalContext } from '../utils/context/ModalContext';
// import { ModalContext } from '@monorepo/context/ModalContext';
import { ProductApi } from '@api/product';
import { useQuery, useMutation, useQueryClient } from 'react-query';

// SSR이면 로딩이 없어야하잖아? 뭘 잘못한모양.
const Home = (props) => {
  console.log({ serverSideData: props.data });
  // const queryClient = useQueryClient();
  const { handleModal } = useContext(ModalContext);

  const getWineList = () => ProductApi.byColor('reds');
  const {
    data: { data },
  } = useQuery('wines', getWineList, {
    initialData: props.data,
  });

  console.log({ clientSideData: data });
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

// 데이터 받아오는걸 여기서 실패한 모양. 그래서 쿼리가 제대로안먹는듯.
export async function getStaticProps() {
  try {
    const data = await ProductApi.byColor('reds');

    return {
      props: {
        data: data?.data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
}

export default Home;
