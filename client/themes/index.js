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
      border: "#646D73",
      dark: {
        50: "#303841",
      },
      light: {
        50: "#3A4750",
      },
    },
    styles: {
      global: (props) => ({
        body: {
          bg: mode("#303841", "#303841")(props),
        },
        "*::placeholder": {
          color: mode("#3A4750", "#3A4750")(props),
        },
      }),
    },
  },
  withDefaultColorScheme({ colorScheme: "primary" })
);
