import React, { memo } from "react";
import MUIAddIcon from "@mui/icons-material/Add";

const AddIconMemoized = memo(() => {
	return <MUIAddIcon />;
},
() => true);

AddIconMemoized.displayName = "AddIconMemoized";

const AddIcon = AddIconMemoized;
export default AddIcon;