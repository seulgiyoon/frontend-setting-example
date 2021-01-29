import '../styles/globals.css';
import { ModalProvider } from '../utils/context/ModalContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <ModalProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ModalProvider>
  );
}

export default MyApp;
