import React from "react";
import Login from "./components/workpages/login";
import theme from "./theme";
import { ThemeProvider } from "@mui/material";
import "./index.scss";
import { useStartup } from "./startup";
import "./i18n";

const App = () => {
	useStartup();
	return (
		<React.StrictMode>
			<ThemeProvider theme={theme}>
				<Login />
			</ThemeProvider>
		</React.StrictMode>
	);
};

export default App;