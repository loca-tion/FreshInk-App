import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
        <div className="px-8 py-2">
          <Component {...pageProps} />
        </div>
    </SessionProvider>
  );
}
