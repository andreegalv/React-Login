import React, { memo } from "react";
import MuiCancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { IIConProps } from "../index.t";


type ICancelRoundedIconProps = Pick<IIConProps, "color" | "fontSize">;
const CancelRoundedIconMemoized = memo((props:ICancelRoundedIconProps) => {
	return <MuiCancelRoundedIcon {...props} />;
},
() => true);

CancelRoundedIconMemoized.displayName = "CancelRoundedIconMemoized";
const CancelRoundedIcon = CancelRoundedIconMemoized;

export default CancelRoundedIcon;