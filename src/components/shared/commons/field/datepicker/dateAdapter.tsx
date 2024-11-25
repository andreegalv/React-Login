import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { esES } from "@mui/x-date-pickers/locales";
import "dayjs/locale/es";

interface IDateAdapterProps {
    children:React.ReactElement
}

const spanishLocale = esES.components.MuiLocalizationProvider.defaultProps.localeText;
const DateAdapter = (props:IDateAdapterProps) => {
	return (
		<LocalizationProvider adapterLocale="es" dateAdapter={AdapterDayjs} localeText={spanishLocale}>
			{props.children}
		</LocalizationProvider>
	);
};

export default DateAdapter;