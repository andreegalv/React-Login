import React, { memo } from "react";
import Box from "src/components/shared/commons/box";
import Text from "src/components/shared/commons/text";

const LoginTitleMemo = memo(() => {
	return (
		<Box sx={{ borderBottom: 1, borderColor: "grey.300", pt: 2, pb: 2, boxSizing: "border-box", textAlign: "center" }}>
			<Text label="Bienvenido" typographyOptions={{ variant: "h5", sx: { fontWeight: 600, color: "primary.main" } }} />
		</Box>
	);
},
() => true);

LoginTitleMemo.displayName = "LoginTitleMemo";
const LoginTitle = LoginTitleMemo;

export default LoginTitle;