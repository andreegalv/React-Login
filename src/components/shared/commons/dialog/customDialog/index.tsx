import { Dialog, DialogActions, DialogContent, SxProps, Theme } from "@mui/material";
import React, { useMemo, useRef } from "react";
import Button from "../../button";
import { mergeSx } from "merge-sx";
import Typography from "../../typography";
import Grid from "../../grid";
import Column from "../../column";
import { IIConProps } from "../../icon/index.t";
import Icon from "../../icon";

export interface ICustomDialogProps {
    title: React.ReactNode,
    body?: React.ReactNode,
    disabled?:boolean,
    onConfirm?:React.MouseEventHandler<HTMLButtonElement>,
    onCancel?: () => void,
	maxWidth?: "sm" | "lg",
	sx?: SxProps<Theme>,
	iconProps?:IIConProps,
	buttonsProps?: {
		confirm?: {
			color?: "inherit" | "primary" | "error",
			title?: string
		}
	}
}

const CustomDialog = (props:ICustomDialogProps) => {
	const { current: labels } = useRef({
		cancel: { ns: "common", value: "general.cancel" },
		confirm: { ns: "common", value: "general.confirm" }
	});
	const dialogSxRef = useRef(mergeSx({
		"& .MuiDialog-paper": { maxHeight: 900 }
	}, props.sx));

	const DialogActionsComponent = useMemo(() => {
		if (!props.onCancel && !props.onConfirm) {
			return null;
		}

		const ConfirmButton = props.onConfirm && (
			<Button
				color={props.buttonsProps?.confirm?.color}
				disabled={props.disabled}
				onClick={props.onConfirm}
				title={props.buttonsProps?.confirm?.title ?? labels.confirm}
			/>
		);

		const CancelButton = props.onCancel && (
			<Button
				autoFocus
				disabled={props.disabled}
				onClick={props.onCancel}
				title={labels.cancel}
				variant="outlined"
			/>
		);

		return (
			<DialogActions sx={{ borderTop: 1, borderColor: "grey.300"}}>
				{CancelButton}
				{ConfirmButton}
			</DialogActions>
		);
	}, [props.onCancel, props.onConfirm, labels, props.disabled]);

	return (
		<Dialog
			maxWidth={props.maxWidth ?? "lg"}
			open
			scroll="paper"
			sx={dialogSxRef.current}
		>
			<DialogContent>
				<Grid>
					{props.iconProps ? <Column size="auto" sx={{ placeContent: "center", placeItems: "center" }}>
						<Icon {...props.iconProps} />
					</Column> : null}

					<Column size="grow">
						{props.title ? <Typography sx={{ fontWeight: 600, mb: 2 }} variant="h6">{props.title}</Typography> : null }
						<Typography component="div">
							{props.body}
						</Typography>
					</Column>
				</Grid>
			</DialogContent>
			{DialogActionsComponent}
		</Dialog>
	);
};

export default CustomDialog;