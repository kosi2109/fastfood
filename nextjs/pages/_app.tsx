import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppProvider from "../context/AppProvider";
import { AnimatePresence , AnimateSharedLayout } from "framer-motion";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <AppProvider>
      <AnimatePresence exitBeforeEnter>
        <AnimateSharedLayout>
          <Component {...pageProps} key={router.route} />
        </AnimateSharedLayout>
      </AnimatePresence>
    </AppProvider>
  );
}

export default MyApp;
