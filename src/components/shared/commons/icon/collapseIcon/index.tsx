import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import React, { memo } from "react";

const CollapseIconMemoized = memo(() => {
	return <ExpandLessIcon />;
},
() => true);

CollapseIconMemoized.displayName = "CollapseIconMemoized";

const CollapseIcon = CollapseIconMemoized;
export default CollapseIcon;