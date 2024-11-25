import SearchIcon from "@mui/icons-material/Search";
import React, { memo } from "react";

const DisplayIconMemoized = memo(() => {
	return <SearchIcon />;
},
() => true);

DisplayIconMemoized.displayName = "DisplayIconMemoized";

const DisplayIcon = DisplayIconMemoized;
export default DisplayIcon;