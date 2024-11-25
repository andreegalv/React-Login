import { Divider as MuiDivider, SxProps, Theme } from "@mui/material";
import React from "react";

interface IDividerProps {
    children?:React.ReactNode,
    sx?:SxProps<Theme>
}

const Divider = (props:IDividerProps) => {
	return (
		<MuiDivider sx={props.sx}>
			{props.children}
		</MuiDivider>
	);
};

export default Divider;