import { SvgIcon } from "@mui/material";
import React, { memo } from "react";

const EditColoredIconMemoized = memo(() => {
	return (
		<SvgIcon><g data-name="Edit colored icon" id="edit-colored-flat-icon"><path d="m17 22h-10a5 5 0 0 1 -5-5v-10a5 5 0 0 1 5-5h4a1 1 0 0 1 0 2h-4a3 3 0 0 0 -3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-4a1 1 0 0 1 2 0v4a5 5 0 0 1 -5 5z" fill="#edebea"/><path d="m8.59 11.17a2 2 0 0 0 -.59 1.42v1.41a2 2 0 0 0 2 2h1.41a2 2 0 0 0 1.42-.59l8.58-8.58a2 2 0 0 0 0-2.83l-1.41-1.41a2 2 0 0 0 -2.83 0z" fill="#fcbf49"/><path d="m21.41 6.83-1.56 1.57-4.24-4.24 1.56-1.57a2 2 0 0 1 2.83 0l1.41 1.41a2 2 0 0 1 0 2.83z" fill="#e63946"/></g></SvgIcon>
	);
},
() => true);

EditColoredIconMemoized.displayName = "EditColoredIconMemoized";

const EditColoredIcon = EditColoredIconMemoized;
export default EditColoredIcon;