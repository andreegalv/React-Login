import { SvgIcon } from "@mui/material";
import React, { memo } from "react";

const FilterRemoveColoredIconMemo = memo(() => (
	<SvgIcon enableBackground="new 0 0 512 512" viewBox="0 0 24 24">
		<g><g fill="#396ce8"><path className="" d="M20 4.5v2.26a1.5 1.5 0 0 1-.44 1.06l-.06.06a.288.288 0 0 1-.21.09.5.5 0 0 1-.12-.02 5.491 5.491 0 0 0-5.3 9.561.292.292 0 0 1 .128.24V21l-4-3v-4a1.5 1.5 0 0 0-.44-1.062L4.44 7.82A1.5 1.5 0 0 1 4 6.758V4.5A1.5 1.5 0 0 1 5.5 3h13A1.5 1.5 0 0 1 20 4.5z" data-original="#396ce840" fill="#2979ff" opacity="1" /><path className="" d="M17 9a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm1.35 4.65a.483.483 0 0 1 0 .7.483.483 0 0 1-.7 0l-.65-.64-.65.64a.483.483 0 0 1-.7 0 .483.483 0 0 1 0-.7l.64-.65-.64-.65a.495.495 0 1 1 .7-.7l.65.64.65-.64a.495.495 0 1 1 .7.7l-.64.65z" data-original="#396ce8" fill="#ff5454" opacity="1" /></g></g>
	</SvgIcon>
),
() => true);

FilterRemoveColoredIconMemo.displayName = "FilterRemoveColoredIconMemo";
const FilterRemoveColoredIcon = FilterRemoveColoredIconMemo;

export default FilterRemoveColoredIcon;

