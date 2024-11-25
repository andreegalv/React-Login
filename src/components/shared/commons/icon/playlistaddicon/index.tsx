import React, { memo } from "react";
import { IIConProps } from "../index.t";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";

type IconProps = Pick<IIConProps, "color">;
const PlaylistAddIconMemo = memo((props:IconProps) => (
	<PlaylistAddRoundedIcon color={props.color} />
), () => true);

PlaylistAddIconMemo.displayName = "PlaylistAddIconMemo";
const PlaylistAddIcon = PlaylistAddIconMemo;

export default PlaylistAddIcon;