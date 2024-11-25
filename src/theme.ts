import { ThemeOptions, createTheme } from "@mui/material";
import { esES } from "@mui/material/locale";

const themeStyle:ThemeOptions = {
	palette: {
		primary: {
			main: "#465B83" // "#263754", //"#3596aa"
		},

	},
	typography: () => ({
		fontFamily: [
			"\"Segoe UI\"", "Helvetica","Arial", "sans-serif"
		].join(","),
		button: {
			textTransform: "none",
			fontWeight: 400
		},
		fontSize: 13
	})
};

const theme = createTheme(themeStyle, esES);

export default theme;