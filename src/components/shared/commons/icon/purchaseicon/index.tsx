import React, { memo } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const PurchaseIconMemoized = memo(() => {
	return <LocalShippingIcon />;
},
() => true);

PurchaseIconMemoized.displayName = "PurchaseIconMemoized";

const PurchaseIcon = PurchaseIconMemoized;
export default PurchaseIcon;