import "@fontsource/poppins";
import { ChakraProvider } from "@chakra-ui/react";
import { customTheme } from "../themes/index";
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
