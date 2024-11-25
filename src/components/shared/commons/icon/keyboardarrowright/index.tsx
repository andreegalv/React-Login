import React, { memo } from "react";
import { IIConProps } from "../index.t";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

type IconProps = Pick<IIConProps, "color">;
const KeyboardArrowDownMemoized = memo((props:IconProps) => (
	<KeyboardArrowDownRoundedIcon color={props.color} />
), () => true);

KeyboardArrowDownMemoized.displayName = "KeyboardArrowDownMemoized";
const KeyboardArrowDown = KeyboardArrowDownMemoized;

export default KeyboardArrowDown;