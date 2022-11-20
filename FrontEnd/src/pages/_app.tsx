import { QueryClient, QueryClientProvider } from 'react-query';

import '../styles/global.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../../contexts/AuthContext';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AuthProvider>
  )
}
