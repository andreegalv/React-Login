import React, { memo } from "react";
import FeedRoundedIcon from "@mui/icons-material/FeedRounded";
import { IBaseIconProps } from "../index.t";

const FeedIconMemo = memo((props:IBaseIconProps) => {
	return (
		<FeedRoundedIcon
			{...props}
		/>
	);
});

FeedIconMemo.displayName = "FeedIconMemo";
const FeedIcon = FeedIconMemo;

export default FeedIcon;