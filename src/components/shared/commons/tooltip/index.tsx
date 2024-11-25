import React, { memo } from "react";
import MuiTooltip from "@mui/material/Tooltip";
import { ITextLabel } from "../text/index.t";
import { useText } from "../text";

export interface ITooltipProps {
    title:string | ITextLabel,
    placement?: "top" | "right" | "bottom",
    children?:React.ReactElement
}

const TooltipMemo = memo((props:ITooltipProps) => {
	const TitleComponent = useText({ label: props.title, disableTypography: true });

	return (
		<MuiTooltip arrow placement={props.placement ?? "bottom"} title={TitleComponent}>
			{props.children}
		</MuiTooltip>
	);
});

TooltipMemo.displayName = "TooltipMemo";
const Tooltip = TooltipMemo;

export default Tooltip;