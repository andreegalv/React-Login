import { SvgIcon } from "@mui/material";
import React, { memo } from "react";

const ViewColoredIconMemoized = memo(() => {
	return (
		<SvgIcon viewBox="0 0 24 24">
			<g data-name="view-colored-icon" id="view-colored-icon"><path d="m20.87 9.28a14 14 0 0 0 -17.74 0l-1.66 1.37a1.74 1.74 0 0 0 0 2.7l3.09 2.53c2.15 1.77 4.8 2.12 7.44 2.12s5.29-.36 7.44-2.12l3.09-2.53a1.74 1.74 0 0 0 0-2.7z" fill="#fff"/><circle cx="12" cy="12" fill="#8dd1ff" r="5"/><path d="m14.5 12a2.5 2.5 0 1 1 -2.5-2.5 2.46 2.46 0 0 1 .67.09 1.22 1.22 0 0 0 -.25.74 1.24 1.24 0 0 0 1.25 1.25 1.22 1.22 0 0 0 .74-.25 2.46 2.46 0 0 1 .09.67z" fill="#3e96ed"/><g fill="#004fac"><path d="m12 18.23a12.68 12.68 0 0 1 -8.07-2.87l-2.46-2a1.74 1.74 0 0 1 0-2.7l2.46-2a12.77 12.77 0 0 1 16.14 0l2.46 2a1.74 1.74 0 0 1 0 2.7l-2.46 2a12.68 12.68 0 0 1 -8.07 2.87zm0-11a11.21 11.21 0 0 0 -7.12 2.57l-2.46 2a.25.25 0 0 0 0 .38l2.46 2a11.27 11.27 0 0 0 14.24 0l2.46-2a.25.25 0 0 0 0-.38l-2.46-2a11.21 11.21 0 0 0 -7.12-2.54z"/><path d="m12 17.75a6 6 0 0 1 -1.52-.2 5.75 5.75 0 1 1 3-11.1.75.75 0 1 1 -.39 1.45 4.24 4.24 0 1 0 2.93 2.8.75.75 0 1 1 1.42-.46 5.75 5.75 0 0 1 -5.44 7.51z"/></g></g>
		</SvgIcon>
	);
},
() => true);

ViewColoredIconMemoized.displayName = "ViewColoredIconMemoized";

const ViewColoredIcon = ViewColoredIconMemoized;
export default ViewColoredIcon;