import { lighten as muiLighten, darken as muiDarken } from "@mui/material";

export const darken = (color:string, amount:number):string => {
	return muiDarken(color, amount);
};

export const lighten = (color:string, amount:number):string => {
	return muiLighten(color, amount);
};