import React, { memo } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { IIConProps } from "../index.t";

type ICheckCircleIconProps = Pick<IIConProps, "color" | "fontSize">;
const CheckCircleIconMemo = memo((props:ICheckCircleIconProps) => {
	return <CheckCircleRoundedIcon {...props} />;
},
() => true);

CheckCircleIconMemo.displayName = "CheckCircleIconMemo";
const CheckCircleIcon = CheckCircleIconMemo;

export default CheckCircleIcon;