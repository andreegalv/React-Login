import React, { memo } from "react";
import Box from "src/components/shared/commons/box";

const WelcomePanelMemo = memo(() => {
	return (
		<Box sx={{ flexGrow: 1, height: 600, backgroundColor: "primary.main" }} />
	);
},
() => true);

WelcomePanelMemo.displayName = "WelcomePanelMemo";
const WelcomePanel = WelcomePanelMemo;

export default WelcomePanel;