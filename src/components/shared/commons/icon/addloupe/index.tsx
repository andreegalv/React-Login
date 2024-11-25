import React, { memo } from "react";
import LoupeIcon from "@mui/icons-material/Loupe";
import { IIConProps } from "../index.t";

type IconProps = Pick<IIConProps, "color">;
const AddLoupedIconMemoized = memo((props:IconProps) => {
	return <LoupeIcon color={props.color} />;
},
() => true);

AddLoupedIconMemoized.displayName = "AddLoupedIconMemoized";
const AddLoupedIcon = AddLoupedIconMemoized;

export default AddLoupedIcon;