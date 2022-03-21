/* eslint-disable react/jsx-props-no-spreading */
import 'react-datepicker/dist/react-datepicker.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import store from '../store/store';
import '../styles/globals.css';

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
