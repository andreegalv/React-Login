import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import React, { memo } from "react";

const HomeIconMemoized = memo(() => {
	return <HomeRoundedIcon />;
},
() => true);

HomeIconMemoized.displayName = "HomeIconMemoized";
const HomeIcon = HomeIconMemoized;

export default HomeIcon;