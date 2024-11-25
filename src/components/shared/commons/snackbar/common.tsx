import { Alert, LinearProgress } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import Box from "../box";
import Snackbar, { ISnackbarProps } from ".";

interface ISnackbarMessageProps extends Omit<ISnackbarProps, "message" | "children"> {
    children: React.ReactNode,
    variant?: "standard" | "outlined" | "standard",
    type: "error" | "success"
}
const SnackbarMessageMemo = memo((props:ISnackbarMessageProps) => {
	const [progress, setProgress] = useState<number>(0);
	const [open, setOpen] = useState<boolean>(true);

	useEffect(() => {
		const timer = setInterval(() => {
		  setProgress((oldProgress) => {
				if (oldProgress === 100) {
					clearInterval(timer);
					setTimeout(() => {
						setOpen(false);
						props.handleClose?.();
					}, 400);
					return 100;
				}
				return Math.min(oldProgress + 1, 100);
		  });
		}, 50);
	
		return () => {
		  clearInterval(timer);
		};
	  }, []);

	return (
		<Snackbar
			handleClose={props.handleClose}
			open={open}
			sx={{
				".MuiPaper-root" : {
					maxWidth: "500px",
					maxHeight: "200px"
				}
			}}
		>
			<Alert severity={props.type} variant={props.variant ?? "filled"}>
				{props.children}
				<Box sx={{position: "absolute", bottom: "1px", left: 0, width: "100%"}}>
					<LinearProgress color={props.type} value={progress} variant="determinate" />
				</Box>
			</Alert>
		</Snackbar>
	);
},
() => true);

SnackbarMessageMemo.displayName = "SnackbarMessageMemo";
const SnackbarMessage = SnackbarMessageMemo;

export default SnackbarMessage;

