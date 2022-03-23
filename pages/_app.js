/* eslint-disable react/jsx-props-no-spreading */
import { AnimatePresence } from 'framer-motion';
import 'react-datepicker/dist/react-datepicker.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import store from '../store/store';
import '../styles/globals.css';

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
    return (
        // eslint-disable-next-line react/jsx-filename-extension
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Navbar />
                <div className="min-h-[75vh]">
                    <AnimatePresence exitBeforeEnter initial={false}>
                        <Component {...pageProps} key={router.pathname} />
                    </AnimatePresence>
                </div>
                <Footer />

                <ToastContainer />
            </QueryClientProvider>
        </Provider>
    );
}

export default MyApp;
