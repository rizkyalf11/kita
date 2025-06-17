import { type AppProps } from "next/app";
import { Geist } from "next/font/google";

import { api } from "~/utils/api";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import DefaultLayout from "~/components/layout/DefaultLayout";
import { type NextPageWithLayout } from "~/lib/types/layout";
import "~/styles/globals.css";

const geist = Geist({
  subsets: ["latin"],
});

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className={geist.className}>
        {getLayout(<Component {...pageProps} />)}
      </div>
      <Toaster />
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);