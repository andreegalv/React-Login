import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import React, { memo } from "react";
import { IBaseIconProps } from "../index.t";

const BadgeUserIconMemo = memo((props:IBaseIconProps) => {
	return <BadgeRoundedIcon {...props} />;
},
() => true);

BadgeUserIconMemo.displayName = "BadgeUserIconMemo";

const BadgeUserIcon = BadgeUserIconMemo;
export default BadgeUserIcon;