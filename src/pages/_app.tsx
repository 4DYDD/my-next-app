import User from "@/components/layouts/User";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <User>
      <Component {...pageProps} />
    </User>
  );
}
