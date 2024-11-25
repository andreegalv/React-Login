import MUIDeleteIcon from "@mui/icons-material/Delete";
import React, { memo } from "react";

const DeleteIconMemoized = memo(() => {
	return <MUIDeleteIcon />;
},
() => true);

DeleteIconMemoized.displayName = "DeleteIconMemoized";

const DeleteIcon = DeleteIconMemoized;
export default DeleteIcon;