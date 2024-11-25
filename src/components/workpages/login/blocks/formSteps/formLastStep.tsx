import Form from "src/components/shared/commons/form";
import Button from "src/components/shared/commons/button";
import Box from "src/components/shared/commons/box";
import React, { useRef } from "react";
import { object, string } from "yup";
import FormTextField from "src/components/shared/commons/form/fields/formtextfield";
import { useTranslate } from "src/components/shared/commons/text/translate";
import Text from "src/components/shared/commons/text";
import { IUser } from "src/components/shared/commons/models/user";
import Avatar from "src/components/shared/commons/avatar";
import { useSurvey as useUserSurvey } from "src/components/shared/reducer/user/actions";
import { useNavigate } from "react-router";

const useTitles = (user:IUser) => {
	const [setTranslate] = useTranslate();
	const titlesRef = useRef({
		password: {
			label: setTranslate({ namespace: "login", value: "password"}),
			commonError: setTranslate({ namespace: "login", value: "passwordStep.commonError" })
		},
		siginButton: { label: setTranslate({ namespace: "login", value: "sigin" }) },
		title: { label: setTranslate({ namespace: "login", value: "passwordStep.title", interpolation: { name: user.name } }) },
		subtitle: { label: setTranslate({ namespace: "login", value: "passwordStep.subtitle" }) }
	});

	return titlesRef.current;
};

const useValidationSchema = () => {
	const formSchemeRef = useRef(object({
		password: string().required().min(3)
	}));

	return formSchemeRef.current;
};

interface IFormLastStepProps {
    user: IUser
}
const FormLastStep = (props:IFormLastStepProps) => {
	const validationSchema = useValidationSchema();
	const titles = useTitles(props.user);

	const initialValuesRef = useRef({
		password: "",
	});
	const buttonPropsRef = useRef({
		submit: {
			onRender: (props) => <Button {...props} title={titles.siginButton.label} />
		}
	});

	const { setUserLogged } = useUserSurvey();
	const navigate = useNavigate();
    
	return (
		<Form
			buttonProps={buttonPropsRef.current}
			elevation={0}
			initialValues={initialValuesRef.current}
			onSubmit={async (values, { onError }) => {
				try {
					await setUserLogged(props.user?.username, values?.password as string);
					navigate("/", { replace: true });
				}
				catch(err) {
					if (err?.response) {
						onError({ password: titles.password.commonError });
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
				<Box sx={{ pl: 1, pr: 1, pb: 3, display: "flex", flexDirection: "column", placeItems: "center", gap: 1 }}>
					<Avatar alt={props.user?.name} size="large" />
					<Text label={titles.title.label} typographyOptions={{ variant: "subtitle1", sx: { color: "grey.800" } }} />
				</Box>
				
				<Box sx={{ mb: 1, display: "flex", flexDirection: "row", gap: 1  }}>
					<Text label={titles.subtitle.label} typographyOptions={{ variant: "body1", component: "div",  sx: { fontWeight: 600 } }} />
				</Box>

				<FormTextField
					autoFocus
					label={titles.password.label}
					name="password"
					type="password"
				/>
			</Box>
		</Form>
	);
};

export default FormLastStep;