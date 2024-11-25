import React, { memo } from "react";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { IIConProps } from "../index.t";

const DownloadIconMemo = memo((props:Pick<IIConProps, "color" | "fontSize">) => {
	return <DownloadRoundedIcon {...props} />;
},
() => true);

DownloadIconMemo.displayName = "DownloadIconMemo";

const DownloadIcon = DownloadIconMemo;
export default DownloadIcon;