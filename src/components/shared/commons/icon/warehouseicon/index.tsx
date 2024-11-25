import React, { memo } from "react";
import WarehouseRoundedIcon from "@mui/icons-material/WarehouseRounded";

const WarehouseIconMemoized = memo(() => {
	return (<WarehouseRoundedIcon />);
},
() => true);

WarehouseIconMemoized.displayName = "WarehouseIconMemoized";

const WarehouseIcon = WarehouseIconMemoized;
export default WarehouseIcon;