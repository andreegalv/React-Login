import React, { memo } from "react";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

const UnfoldIconMemoized = memo(() => {
	return (<UnfoldMoreIcon />);
},
() => true);

UnfoldIconMemoized.displayName = "UnfoldIconMemoized";

const UnfoldIcon = UnfoldIconMemoized;
export default UnfoldIcon;