import React, { memo, useMemo, useState } from "react";
import FormUsernameStep from "./formUsernameStep";
import { IUser } from "src/components/shared/commons/models/user";
import Box from "src/components/shared/commons/box";
import { AnimatePresence, motion } from "framer-motion";
import FormLastStep from "./formLastStep";

enum StepLogin {
    ConfirmUsername,
    ConfirmPassword
}

const ManageStepFormMemo = memo(() => {
	const [stepLogin, setStepLogin] = useState<StepLogin>(StepLogin.ConfirmUsername);
	const [user, setUser] = useState<IUser>(undefined);

	const NextComponent = useMemo(() => {
		switch(stepLogin){
			case StepLogin.ConfirmPassword: {
				return (
					<FormLastStep
						user={user}
					/>
				);
			}
			default: {
				return (
					<FormUsernameStep
						onValidStep={({ user }) => {
							setStepLogin(StepLogin.ConfirmPassword);
							setUser(user);
						}}
					/>
				);
			}
		}
	}, [stepLogin]);

	return (
		<Box className="__manage-steps" sx={{ overflow: "hidden" }}>
			<AnimatePresence mode="wait">
				<motion.div
					animate={{
						x: "0",
						opacity: 1,
						transition: {
							duration: 0.3,
						},
					}}
					exit={{
						x: "-100%",
						opacity: 0,
						transition: {
							duration: 0.2,
						},
					}}
					initial={{
						x: "100%",
						opacity: 0,
					}}
					key={`step-${stepLogin}`}
				>
					{NextComponent}
				</motion.div>
			</AnimatePresence>
			
		</Box>
	);
},
() => true);

ManageStepFormMemo.displayName = "ManageStepFormMemo";
const ManageStepForm = ManageStepFormMemo;

export default ManageStepForm;