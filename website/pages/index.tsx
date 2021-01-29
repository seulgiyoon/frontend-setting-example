import React, { useContext } from 'react';
import { Layout, Navbar, Footer, UserNav } from '@monorepo/ui';
import { ModalContext } from '../utils/context/ModalContext';
// import { ModalContext } from '@monorepo/context/ModalContext';
import { ProductApi } from '@api/product';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const Home = (props) => {
  const queryClient = useQueryClient();
  const { handleModal } = useContext(ModalContext);

  const getWineList = () => ProductApi.byColor('reds', undefined, undefined);
  const { data } = useQuery('wines', getWineList, {
    initialData: props.data,
  });
  const mutation = useMutation(getWineList, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('wines');
    },
  });

  return (
    <>
      <Navbar>
        <li>로고</li>
        <li>장바구니</li>
        <li onClick={() => handleModal('hello')}>로그인</li>
      </Navbar>
      <div>
        {data.data.map((singleData) => (
          <p key={singleData.id}>{singleData.wine}</p>
        ))}
      </div>
      <Footer>Sample Shop</Footer>
    </>
  );
};

export async function getStaticProps() {
  try {
    let data = await ProductApi.byColor('reds', undefined, undefined);
    data = JSON.parse(JSON.stringify(data));
    return {
      props: {
        data,
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
