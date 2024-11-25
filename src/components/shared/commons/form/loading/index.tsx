import React from "react";
import { Skeleton, Stack } from "@mui/material";

const FormLoading = () => {
	return (
		<div className="form-loading-skeleton">
			<Stack spacing={2}>
				<Skeleton height={20} variant="rectangular" width="88%" />
				<Skeleton height={20} variant="rectangular" width="60%" />
				<Skeleton height={20} variant="rectangular" width="80%" />
				<Skeleton height={20} variant="rectangular" width="30%" />
				<Skeleton height={20} variant="rectangular" width="50%" />
			</Stack>
		</div>
	);
};

export default FormLoading;