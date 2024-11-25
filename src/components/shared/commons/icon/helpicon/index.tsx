import { HelpOutline } from "@mui/icons-material";
import React, { memo } from "react";
import { IIConProps } from "../index.t";

type IHelpIconProps = Pick<IIConProps, "color">;

const HelpIconMemo = memo((props:IHelpIconProps) => {
	return <HelpOutline color={props.color} />;
},
() => true);

HelpIconMemo.displayName = "HelpIconMemo";
const HelpIcon = HelpIconMemo;

export default HelpIcon;