import React from "react";
import { Fade, Snackbar as MuiSnackbar, SxProps, Theme } from "@mui/material";

export interface ISnackbarProps {
    handleClose?: () => void,
    message?: React.ReactNode,
    children?: React.ReactElement<unknown>,
	autoHideDuration?: number,
	open?: boolean,
	sx?: SxProps<Theme>
}

const Snackbar = (props:ISnackbarProps) => {
	return (
		<MuiSnackbar
			TransitionComponent={Fade}
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			autoHideDuration={props.autoHideDuration}
			message={props.message}
			onClose={props.handleClose}
			open={props.open}
			sx={props.sx}
		>
			{props.children}
		</MuiSnackbar>
	);
};

export default Snackbar;