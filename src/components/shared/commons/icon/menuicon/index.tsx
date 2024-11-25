import React, { memo } from "react";
import { Apps } from "@mui/icons-material";

export const MenuIconMemoized = memo(() => {
	return (
		<Apps />
	);
},
() => true);

MenuIconMemoized.displayName = "MenuIconMemoized";
const MenuIcon = MenuIconMemoized;

export default MenuIcon;