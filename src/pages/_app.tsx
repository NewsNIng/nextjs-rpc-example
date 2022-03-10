import type { AppProps } from "next/app";
import "../../styles/globals.css";

// client don't need register
if (typeof window === "undefined") {
  // here, register rpc services.
  import("../server/services");
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
