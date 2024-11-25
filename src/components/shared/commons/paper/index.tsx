import { Paper as MuiPaper, PaperOwnProps } from "@mui/material";
import React, { forwardRef, useImperativeHandle, useRef } from "react";

interface IPaperProps {
    children?:React.ReactNode,
	sx?: PaperOwnProps["sx"],
	variant?: PaperOwnProps["variant"],
	square?: PaperOwnProps["square"],
	id?:string,
	elevation?: PaperOwnProps["elevation"]
}

const PaperForwardedRef = forwardRef((props:IPaperProps, ref) => {
	const paperRef = useRef();
	useImperativeHandle(ref, () => ({
		current: paperRef.current
	}));

	return (
		<MuiPaper
			elevation={props.elevation ?? 1}
			id={props.id}
			ref={paperRef}
			square={props.square ?? false}
			sx={props.sx}
			variant={props.variant ?? "elevation"}
		>
			{props.children}
		</MuiPaper>
	);
});
PaperForwardedRef.displayName = "PaperForwardedRef";
const Paper = PaperForwardedRef;

export default Paper;