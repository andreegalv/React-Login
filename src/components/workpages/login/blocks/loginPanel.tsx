import React, { memo } from "react";
import Box from "src/components/shared/commons/box";
import LoginTitle from "./loginTitle";
import LoginBottom from "./loginBottom";
import ManageStepForm from "./formSteps/manageStepForm";

const LoginPanelMemo = memo(() => {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
			<LoginTitle />
			<ManageStepForm />
			<LoginBottom />
		</Box>
	);
},
() => true);

LoginPanelMemo.displayName = "LoginPanelMemo";
const LoginPanel = LoginPanelMemo;

export default LoginPanel;