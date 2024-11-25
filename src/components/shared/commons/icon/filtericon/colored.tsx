import { SvgIcon } from "@mui/material";
import React, { memo } from "react";

const FilterColoredIconMemo = memo(() => (
	<SvgIcon color="secondary" enableBackground="new 0 0 512 512" viewBox="0 0 24 24">
		<g><path d="M4 4.5v2.257a1.5 1.5 0 0 0 .439 1.061l5.122 5.121A1.5 1.5 0 0 1 10 14v4l4 3v-7a1.5 1.5 0 0 1 .439-1.061l5.122-5.121A1.5 1.5 0 0 0 20 6.757V4.5A1.5 1.5 0 0 0 18.5 3h-13A1.5 1.5 0 0 0 4 4.5z" data-original="#396ce840" opacity="1" /></g>
	</SvgIcon>
),
() => true);

FilterColoredIconMemo.displayName = "FilterColoredIconMemo";
const FilterColoredIcon = FilterColoredIconMemo;

export default FilterColoredIcon;

