import React from "react";
import ReactDOMClient from "react-dom/client";
import App from "./app";

const domNode = document.getElementById("root");
const root = ReactDOMClient.createRoot(domNode);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);