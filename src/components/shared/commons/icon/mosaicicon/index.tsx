import React, { memo } from "react";
import AutoAwesomeMosaicRoundedIcon from "@mui/icons-material/AutoAwesomeMosaicRounded";

export const MosaicIconMemoized = memo(() => {
	return (
		<AutoAwesomeMosaicRoundedIcon />
	);
},
() => true);

MosaicIconMemoized.displayName = "MosaicIconMemoized";
const MosaicIcon = MosaicIconMemoized;

export default MosaicIcon;