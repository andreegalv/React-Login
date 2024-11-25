import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import React, { memo } from "react";

const PromptIconMemo = memo(() => {
	return (
		<TravelExploreRoundedIcon />
	);
},
() => false);

PromptIconMemo.displayName = "PromptIconMemo";
const PromptIcon = PromptIconMemo;

export default PromptIcon;