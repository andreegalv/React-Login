import { Avatar as MuiAvatar } from "@mui/material";
import { stringToColour, trimObject } from "../../utils";
import React, { useMemo } from "react";

interface IAvatarProps {
    alt?:string,
    children?:React.ReactNode,
    size?: "medium" | "large"
}
const Avatar = (props:IAvatarProps) => {
	const { alt, size } = props;

	const avatarSx = useMemo(() => {
		return trimObject({
			width: size === "large" ? 56 : undefined,
			height: size === "large" ? 56 : undefined,
			bgcolor: !alt ? undefined : stringToColour(alt),
		});

	}, [alt, size]);

	const ChildrenCompoennt = props.children ?? props.alt ? `${props.alt.split(" ")[0][0]}${props.alt.split(" ")[1][0]}` : null;

	return (
		<MuiAvatar
			alt={props.alt}
			sx={avatarSx}
		>
			{ChildrenCompoennt}
		</MuiAvatar>
	);
};

export default Avatar;