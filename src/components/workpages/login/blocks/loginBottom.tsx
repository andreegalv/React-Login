import React, { memo } from "react";
import Box from "src/components/shared/commons/box";
import Button from "src/components/shared/commons/button";

const LoginBottomMemo = memo(() => {
	return (
		<Box sx={{ flexGrow: 1, display: "flex", placeContent: "space-between", placeItems: "end", gap: 1, pl: 2, pr: 2, pb: 2 }}>
			<Box>
				<Button disabled title="ES" variant="text" />
			</Box>
			<Box>
				<Button disabled title="Ayuda" variant="text" />
				<Button disabled title="Contactarnos" variant="text" />
			</Box>
		</Box>
	);
},
() => true);

LoginBottomMemo.displayName = "LoginBottomMemo";
const LoginBottom = LoginBottomMemo;

export default LoginBottom;