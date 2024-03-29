import { chakra, ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import theme from "../theme";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          {/* 👇 Here's the script */}
          <ColorModeScript initialColorMode="system" />
          {/* {theme.config.initialColorMode} /> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
