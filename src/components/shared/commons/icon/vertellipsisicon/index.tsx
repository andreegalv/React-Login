import React, { memo } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const VerticalEllipsisIconMemoized = memo(() => {
	return (<MoreVertIcon />);
},
() => true);

VerticalEllipsisIconMemoized.displayName = "VerticalEllipsisIconMemoized";

const VerticalEllipsisIcon = VerticalEllipsisIconMemoized;
export default VerticalEllipsisIcon;