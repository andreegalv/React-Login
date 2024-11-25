import Form from "src/components/shared/commons/form";
import Button from "src/components/shared/commons/button";
import KeyboardArrowRight from "src/components/shared/commons/icon/keyboardarrowdown";
import Box from "src/components/shared/commons/box";
import React, { useRef } from "react";
import { object, string } from "yup";
import FormTextField from "src/components/shared/commons/form/fields/formtextfield";
import { useTranslate } from "src/components/shared/commons/text/translate";
import Text from "src/components/shared/commons/text";
import BadgeUserIcon from "src/components/shared/commons/icon/badgeusericon";
import { useSecurityApi } from "src/components/shared/apis/securityApi";
import { IUser } from "src/components/shared/commons/models/user";

const useTitles = () => {
	const [setTranslate] = useTranslate();
	const titlesRef = useRef({
		username: {
			label: setTranslate({ namespace: "login", value: "username"}),
			commonError: setTranslate({ namespace: "login", value: "usernameStep.commonError" })
		},
		nextButton: { label: setTranslate({ namespace: "login", value: "next" }) },
		title: { label: setTranslate({ namespace: "login", value: "usernameStep.title" }) }
	});

	return titlesRef.current;
};

const useValidationSchema = () => {
	const formSchemeRef = useRef(object({
		username: string().required().min(3)
	}));

	return formSchemeRef.current;
};

interface IFormUsernameStepProps {
	onValidStep?: (props: { user: IUser }) => void
}
const FormUsernameStep = (props:IFormUsernameStepProps) => {
	const validationSchema = useValidationSchema();
	const titles = useTitles();

	const initialValuesRef = useRef({
		username: "",
	});
	const buttonPropsRef = useRef({
		submit: {
			onRender: (props) => <Button {...props} endIcon={<KeyboardArrowRight />} title={titles.nextButton.label} />
		}
	});

	const { user_endpoints: { confirmUserNameAsync } } = useSecurityApi();
    
	return (
		<Form
			buttonProps={buttonPropsRef.current}
			elevation={0}
			initialValues={initialValuesRef.current}
			onSubmit={async (values, { onError }) => {
				try {
					const user = await confirmUserNameAsync(values?.username as string);
					props?.onValidStep({ user });
				}
				catch(err) {
					if (err?.response) {
						onError({ username: titles.username.commonError });
					}
				}
			}}
			sx={{
				".form-buttons": {
					mt: 2,
					textAlign: "right"
				}
			}}
			validationSchema={validationSchema}
		>
			<Box sx={{ pt: 2 }}>
				<Box sx={{ mb: 2, display: "flex", flexDirection: "row", gap: 1  }}>
					<BadgeUserIcon />
					<Text label={titles.title.label} typographyOptions={{ variant: "body1", component: "div",  sx: { fontWeight: 600 } }} />
				</Box>
				<FormTextField
					autoFocus
					label={titles.username.label}
					name="username"
				/>
			</Box>
		</Form>
	);
};

export default FormUsernameStep;