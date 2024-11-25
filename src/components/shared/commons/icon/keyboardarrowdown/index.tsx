import React, { memo } from "react";
import { IIConProps } from "../index.t";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

type IconProps = Pick<IIConProps, "color">;
const KeyboardArrowRightMemoized = memo((props:IconProps) => (
	<KeyboardArrowRightRoundedIcon color={props.color} />
), () => true);

KeyboardArrowRightMemoized.displayName = "KeyboardArrowRightMemoized";
const KeyboardArrowRight = KeyboardArrowRightMemoized;

export default KeyboardArrowRight;