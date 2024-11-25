import CompareArrowsRoundedIcon from "@mui/icons-material/CompareArrowsRounded";
import React, { memo } from "react";

const CompareArrowIconMemoized = memo(() => {
	return <CompareArrowsRoundedIcon />;
},
() => true);

CompareArrowIconMemoized.displayName = "CompareArrowIconMemoized";

const CompareArrowIcon = CompareArrowIconMemoized;
export default CompareArrowIcon;