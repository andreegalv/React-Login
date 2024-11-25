import React, { memo } from "react";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { IIConProps } from "../index.t";

type ICheckIconProps = Pick<IIConProps, "color" | "fontSize">;
const CheckIconMemo = memo((props:ICheckIconProps) => {
	return <CheckRoundedIcon {...props} />;
},
() => true);

CheckIconMemo.displayName = "CheckIconMemo";
const CheckIcon = CheckIconMemo;

export default CheckIcon;