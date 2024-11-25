import React, { memo, useRef } from "react";
import Container from "src/components/shared/commons/container";
import LoginPanel from "./blocks/loginPanel";
import GridColumn from "src/components/shared/commons/grid/gridcolumn";
import WelcomePanel from "./blocks/welcomePanel";
import Box from "src/components/shared/commons/box";
import Paper from "src/components/shared/commons/paper";

const LoginMemo = memo(() => {
	const containerSxRef = useRef({
		placeContent: "center",
		placeItems: "center",
		height: "100vh",
	});

	return (
		<Box sx={{ backgroundColor: "grey.300" }}>
			<Container maxWidth="lg" sx={containerSxRef.current}>
				<Paper elevation={0} square={true}>
					<GridColumn columnSizes={[{ xs: 12, sm: 6, lg: 5 }, "grow"]} gridSpacing={0}>
						<LoginPanel />
						<WelcomePanel />
					</GridColumn>
				</Paper>
			</Container>
		</Box>
	);
},
() => true);

LoginMemo.displayName = "LoginMemo";

const Login = LoginMemo;
export default Login;