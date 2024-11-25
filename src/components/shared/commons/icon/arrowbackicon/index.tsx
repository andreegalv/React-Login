import { ArrowBack } from "@mui/icons-material";
import React, { memo } from "react";

const ArrowBackIconMemoized = memo(() => {
	return <ArrowBack />;
},
() => true);

ArrowBackIconMemoized.displayName = "ArrowBackIconMemoized";

const ArrowBackIcon = ArrowBackIconMemoized;
export default ArrowBackIcon;