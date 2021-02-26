import { ModalProvider } from '../utils/context/ModalContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ReactQueryDevtools } from 'react-query/devtools';
import { wrapper } from '../src/global/store/store';
import { init } from '../utils/sentry';

init();

const queryClient = new QueryClient();

function MyApp({ Component, pageProps, err }) {
  const getLayout = (Component as any).getLayout || ((page) => page);

  return (
    <ModalProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {getLayout(<Component {...pageProps} err={err} />)}
          {/* 따로 설정 안해도 dev tool은 development 일때만 반영됨 */}
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </ModalProvider>
  );
}

export default wrapper.withRedux(MyApp);
