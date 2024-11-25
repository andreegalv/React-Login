import React from "react";
import { Box as MuiBox, SxProps, Theme, BoxProps } from "@mui/material";

interface IBoxProps {
    sx?: SxProps<Theme>,
    gap?:number,
    children?:React.ReactNode,
	className?:string
}

const BoxForwardRef = React.forwardRef((props:IBoxProps, ref:BoxProps["ref"]) => {
	return (
		<MuiBox className={props.className} gap={props.gap} ref={ref} sx={props.sx}>
			{props.children}
		</MuiBox>
	);
});

BoxForwardRef.displayName = "BoxForwardRef";
const Box = BoxForwardRef;

export default Box;