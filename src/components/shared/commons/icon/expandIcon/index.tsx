import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { memo } from "react";

const ExpandIconMemoized = memo(() => {
	return <ExpandMoreIcon />;
},
() => true);

ExpandIconMemoized.displayName = "ExpandIconMemoized";

const ExpandIcon = ExpandIconMemoized;
export default ExpandIcon;