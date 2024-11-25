import React, { memo } from "react";
import FeedbackRoundedIcon from "@mui/icons-material/FeedbackRounded";
import { IBaseIconProps } from "../index.t";

const FeedbackIconMemo = memo((props:IBaseIconProps) => {
	return (
		<FeedbackRoundedIcon
			{...props}
		/>
	);
});

FeedbackIconMemo.displayName = "FeedbackIconMemo";
const FeedbackIcon = FeedbackIconMemo;

export default FeedbackIcon;