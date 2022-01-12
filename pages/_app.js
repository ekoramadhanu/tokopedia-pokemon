import '../styles/globals.css'
import { ThemeProvider } from '@mui/material/styles';
import theme from '../plugin/index';
import Layout from '../layout/layout';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
// import Router from 'next/router';
// import nProgress from 'nprogress';

// Router.events.on('routeChangeStart', nProgress.start);
// Router.events.on('routeChangeError', nProgress.stop);
// Router.events.on('routeChangeComplete', nProgress.stop);


function MyApp({ Component, pageProps }) {

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Layout>
    </QueryClientProvider>
  )
}

export default MyApp
