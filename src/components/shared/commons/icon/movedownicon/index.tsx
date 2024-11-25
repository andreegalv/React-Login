import React, { memo } from "react";
import MUIMoveDownIcon from "@mui/icons-material/MoveDown";

export const MoveDownIconMemoized = memo(() => {
	return (
		<MUIMoveDownIcon />
	);
},
() => true);

MoveDownIconMemoized.displayName = "MoveDownIconMemoized";
const MoveDownIcon = MoveDownIconMemoized;

export default MoveDownIcon;