import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import { store } from  "../store/store"
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
  if (typeof window === 'undefined') {
    return <></>
  }else {

    return (
      <Provider store={store}>
        <AnimatePresence exitBeforeEnter>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
            <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Provider>
    );
  }
}

export default MyApp;
