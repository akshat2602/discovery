import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const customTheme = extendTheme(
  {
    config: {
      initialColorMode: "dark",
      useSystemColorMode: false,
    },
    fonts: {
      body: "Poppins, sans-serif",
      heading: "Poppins, sans-serif",
    },
    colors: {
      primary: {
        50: "#eefafa",
        100: "#bae9eb",
        200: "#79d4d8",
        300: "#20b7be",
        400: "#00ADB5",
        500: "#008b91",
        600: "#00757b",
        700: "#005e63",
        800: "#005054",
        900: "#003a3d",
      },
      light: {
        200: "#FFFFFF",
        400: "#EEEEEE",
      },
      dark: {
        200: "#3A4750",
        400: "#303841",
      },
    },
    styles: {
      global: (props) => ({
        body: {
          bg: mode("#EEEEEE", "#303841")(props),
        },
        "*::placeholder": {
          color: mode("#EEEEEE", "#303841")(props),
        },
      }),
    },
  },
  withDefaultColorScheme({ colorScheme: "primary" })
);
