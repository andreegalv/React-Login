import { Avatar as MuiAvatar } from "@mui/material";
import { stringToColour, trimObject } from "../../utils";
import React, { useMemo } from "react";
import { isStringNotEmpty } from "src/utils/utils";

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

	const ChildrenCompoennt = props.children ?? createFirstLetterNames(props.alt);

	return (
		<MuiAvatar
			alt={props.alt}
			sx={avatarSx}
		>
			{ChildrenCompoennt}
		</MuiAvatar>
	);
};

const createFirstLetterNames = (names?:string) => {
	if (!isStringNotEmpty(names)) {
		return null;
	}

	if (names.includes(" ")) {
		const namesSplitted = names.split(" ");
		return `${namesSplitted[0][0]}${namesSplitted[0][1]}`;
	}

	return names[0];
};

export default Avatar;