/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import Navbar from '../components/Navbar';
import store from '../store/store';

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        // eslint-disable-next-line react/jsx-filename-extension
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Navbar />
                <Component {...pageProps} />

                <ToastContainer />
            </QueryClientProvider>
        </Provider>
    );
}

export default MyApp;
