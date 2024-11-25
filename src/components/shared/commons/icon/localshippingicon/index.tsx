import React, { memo } from "react";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";

const LocalShippingIconMemoized = memo(() => {
	return (<LocalShippingRoundedIcon />);
},
() => true);

LocalShippingIconMemoized.displayName = "LocalShippingIconMemoized";

const LocalShippingIcon = LocalShippingIconMemoized;
export default LocalShippingIcon;