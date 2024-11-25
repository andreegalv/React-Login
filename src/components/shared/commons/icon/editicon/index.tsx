import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import React, { memo } from "react";
import { IBaseIconProps } from "../index.t";

const EditIconMemo = memo((props:IBaseIconProps) => {
	return <EditNoteRoundedIcon {...props} />;
},
() => true);

EditIconMemo.displayName = "EditIconMemo";

const EditIcon = EditIconMemo;
export default EditIcon;