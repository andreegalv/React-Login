import React from "react";
import { Chip as MUIChip } from "@mui/material";

interface IChipProps {
    label:string,
    color?: "default" | "info" | "primary",
	variant?: "filled" | "outlined"
}

const Chip = (props:IChipProps) => {
	return (
		<MUIChip
			color={props.color ?? "default"}
			label={props.label}
			size="small"
			variant={props.variant ?? "outlined"}
		/>
	);
};

export default Chip;