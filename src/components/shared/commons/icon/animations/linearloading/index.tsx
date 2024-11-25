import { LinearProgress } from "@mui/material";
import React, { memo } from "react";

const LinearLoadingMemoized = memo(() => {
	return <LinearProgress />;
},
() => true);

LinearLoadingMemoized.displayName = "LinearLoadingMemoized";
const LinearLoading = LinearLoadingMemoized;

export default LinearLoading;