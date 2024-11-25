import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React, { memo } from "react";

const DropdownIconMemoized = memo(() => {
	return <ArrowDropDownIcon />;
},
() => true);

DropdownIconMemoized.displayName = "DropdownIconMemoized";

const DropdownIcon = DropdownIconMemoized;
export default DropdownIcon;