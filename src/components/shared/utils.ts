 
import ColorHash from "color-hash";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/es";
import { pickBy } from "lodash";

export const setWindowTitle = (title:string) => {
	window.document.title = `${title ?? ""} | Moongose`;
};

export const stringToColour = (str:string):string => {
	const colorHash = new ColorHash();
	return colorHash.hex(str);
};

export const trimObject = (object:object) => {
	return pickBy(object, v => v !== undefined && v !== null);
};

export const setDayJsConfiguration = () => {
	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.extend(localizedFormat);
	dayjs.locale("es");
	dayjs.tz.setDefault("America/Santiago");
};