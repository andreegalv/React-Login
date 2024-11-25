import React, { memo } from "react";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import { IIConProps } from "../index.t";

type ICheckIconProps = Pick<IIConProps, "color">;
const CheckListIconMemo = memo((props:ICheckIconProps) => {
	return <ChecklistRoundedIcon color={props.color} />;
},
() => true);

CheckListIconMemo.displayName = "CheckListIconMemo";
const CheckListIcon = CheckListIconMemo;

export default CheckListIcon;