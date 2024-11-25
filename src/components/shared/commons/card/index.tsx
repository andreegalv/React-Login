import React, { useMemo, useRef } from "react";
import MuiCard from "@mui/material/Card";
import { mergeSx } from "merge-sx";
import { SxProps, Theme } from "@mui/material";

export interface ICardProps {
    variant?: "outlined" | "elevation",
	children?:React.ReactNode,
	className?:string,
	sx?: SxProps<Theme>
}

const Card = (props:ICardProps) => {
	const className = useMemo(() => {
		let className = "card-container";
		if (props.className) {
			className += " " + props.className;
		}
		return className;
	}, [props.className]);

	const sxRef = useRef(mergeSx({
		border: 1,
		borderColor: "grey.300"
	}, props.sx ?? {}));

	return (
		<MuiCard
			className={className}
			sx={sxRef.current}
			variant={props.variant ?? "outlined"}
		>
			{props.children}
		</MuiCard>
	);
};

export default Card;