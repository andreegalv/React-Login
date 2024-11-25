import React from "react";
import { BadgeOwnProps, Badge as MuiBadge, SxProps, Theme } from "@mui/material";

interface IBadgeProps {
    content?:React.ReactNode,
    color?: BadgeOwnProps["color"],
    children?: React.ReactNode,
	sx?: SxProps<Theme>,
	overlap?: "rectangular" | "circular",
	anchorOrigin?: BadgeOwnProps["anchorOrigin"],
	variant?: BadgeOwnProps["variant"]
}

const Badge = (props:IBadgeProps) => {
	return (
		<MuiBadge
			anchorOrigin={props.anchorOrigin}
			badgeContent={props.content}
			color={props.color ?? "default"}
			overlap={props.overlap ?? "rectangular"}
			sx={props.sx}
			variant={props.variant ?? "standard"}
		>
			{props.children}
		</MuiBadge>
	);
};

export default Badge;