import React, { memo } from "react";
import { IIConProps } from "../index.t";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";

type IconProps = Pick<IIConProps, "color">;
const KeyboardArrowUpMemo = memo((props:IconProps) => (
	<KeyboardArrowUpRoundedIcon color={props.color} />
), () => true);

KeyboardArrowUpMemo.displayName = "KeyboardArrowUpMemo";
const KeyboardArrowUp = KeyboardArrowUpMemo;

export default KeyboardArrowUp;