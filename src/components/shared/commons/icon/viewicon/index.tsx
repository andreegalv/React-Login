import ContentPasteSearchRoundedIcon from "@mui/icons-material/ContentPasteSearchRounded";
import React, { memo } from "react";
import { IBaseIconProps } from "../index.t";

const ViewIconMemo = memo((props:IBaseIconProps) => {
	return <ContentPasteSearchRoundedIcon {...props} />;
},
() => true);

ViewIconMemo.displayName = "ViewIconMemo";

const ViewIcon = ViewIconMemo;
export default ViewIcon;