import { Notifications } from "@mui/icons-material";
import React, { memo } from "react";

const NotificationIconMemoized = memo(() => {
	return <Notifications />;
},
() => true);

NotificationIconMemoized.displayName = "NotificationIconMemoized";
const NotificationIcon = NotificationIconMemoized;

export default NotificationIcon;