import type { AppProps } from "next/app";
import "@fontsource/poppins";
import { ChakraProvider } from "@chakra-ui/react";
import { customTheme } from "../themes/index";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
