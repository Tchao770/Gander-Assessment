import { createRoot } from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import { App } from "./app";
const container = document.getElementById("root");
const GlobalStyle = createGlobalStyle`
  body {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
`
const root = createRoot(container);
root.render(
	<>
		<GlobalStyle />
		<App />
	</>
);
