import React from "react";
import { Skeleton } from "@mui/material";
import Box from "src/components/shared/commons/box";
import Grid from "../../commons/grid";
import Column from "../../commons/column";

const SkeletonPanelLoading = () => {
	return (
		<Box className="skeleton__loading" sx={{ pl: 2, pr: 2, pt: 2, pb: 1 }}>
			<Grid>
				<Column size={{ sm: 3 }}>
					<Skeleton animation="wave" height={60} variant="rounded"  width="100%"/>
				</Column>
				<Column>
					<Skeleton animation="wave" height={15} sx={{ mb: 1}} variant="rounded" width="60%" />
					<Skeleton animation="wave" height={15} sx={{ mb: 1}} variant="rounded"  width="28%"/>
					<Skeleton animation="wave" height={15} variant="rounded" width="45%" />
				</Column>
			</Grid>
		</Box>
	);
};

export default SkeletonPanelLoading;