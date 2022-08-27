import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppProvider from "../context/AppProvider";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <AppProvider>
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
        <AnimateSharedLayout>
          <Component {...pageProps} key={router.route} />
        </AnimateSharedLayout>
      </AnimatePresence>
    </AppProvider>
  );
}

export default MyApp;
