import React, { memo } from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { IIConProps } from "../index.t";


const CancelIconMemo = memo((props:IIConProps) => {
	return <CancelRoundedIcon color={props.color} fontSize={props.fontSize} />;
},
() => true);

CancelIconMemo.displayName = "CancelIconMemo";
const CancelIcon = CancelIconMemo;

export default CancelIcon;