import { SvgIcon } from "@mui/material";
import React, { memo } from "react";

const ExportColoredIconMemoized = memo(() => {
	return (
		<SvgIcon color="secondary" enableBackground="new 0 0 32 32" viewBox="0 0 32 32">            
			<g><path d="m5 8c-1.7 0-3 1.3-3 3v16c0 1.7 1.3 3 3 3h18c1.7 0 3-1.3 3-3v-19z" fill="#eee"/><path d="m29.7 9.8-7.5-7.5c-.4-.4-1-.4-1.4 0-.2.2-.3.4-.3.7v3.3c-10.4 1.6-13.8 9.2-10.3 17.4.2.5.8.8 1.3.5.3-.1.6-.5.6-.8.3-3.1 4.5-8.7 8.5-8.9v3.3c0 .6.5 1 1 1 .3 0 .5-.1.7-.3l7.5-7.5c.3-.2.3-.9-.1-1.2z" /></g>
		</SvgIcon>
	);
},
() => true);

ExportColoredIconMemoized.displayName = "ExportColoredIconMemoized";

const ExportColoredIcon = ExportColoredIconMemoized;
export default ExportColoredIcon;