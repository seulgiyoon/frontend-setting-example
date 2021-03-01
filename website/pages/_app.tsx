import { ModalProvider } from '../utils/context/ModalContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ReactQueryDevtools } from 'react-query/devtools';
import { wrapper } from '../src/global/store/store';
// import { init } from '../utils/sentry';

// init();

import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  const integrations = [];
  if (
    process.env.NEXT_IS_SERVER === 'true' &&
    process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR
  ) {
    integrations.push(
      new RewriteFrames({
        iteratee: (frame) => {
          frame.filename = frame.filename.replace(
            process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR,
            'app:///',
          );
          frame.filename = frame.filename.replace('.next', '_next');
          return frame;
        },
      }),
    );
  }

  Sentry.init({
    enabled: process.env.NODE_ENV === 'production',
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

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
