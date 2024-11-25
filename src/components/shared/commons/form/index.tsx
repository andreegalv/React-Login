import { Box } from "@mui/material";
import React, { useCallback } from "react";
import { FormikValues, IFormProps } from "./index.t";
import { FormikErrors, useFormik } from "formik";
import FormButtons from "./buttons";
import { FormContext } from "./context";
import { useTranslate } from "../text/translate";
import { IFormControllerResult } from "../../apis/interfaces";
import FormFeedback from "./feedback";
import { mergeSx } from "merge-sx";
import Paper from "../paper";

const Form = (props: IFormProps) => {
	const [setTranslate] = useTranslate();
	const iterateAndTranslate = useCallback((obj:object) => {
		Object.keys(obj).forEach(key => {
			const value = obj[key] as unknown;
	
			if (typeof value === "object" && value !== null) {
				iterateAndTranslate(value);
			}
			else if (typeof value === "string" && value.startsWith("t@") && value.includes(":")) {
				const [namespace, textValue] = value.replace("t@", "").split(":");
				obj[key] = setTranslate({namespace, value: textValue });
			}
		});
	}, [setTranslate]);

	const formik = useFormik({
		initialValues: props.initialValues,
		validationSchema: props.validationSchema,
		onSubmit: async (values, { setSubmitting, setStatus, setErrors }) => {
			try {
				setStatus();

				await props.onSubmit?.(values as FormikValues, {
					onError: (values?:FormikErrors<FormikValues>) => {
						setErrors(values ?? {}); 
						setSubmitting(false);
							
						throw new Error("Form error");
					},
					onGlobalError: (values?:string[]) => {
						setErrors({
							"*": values ?? []
						}); 
						setSubmitting(false);
		
						throw new Error("Form error");
					}
				});

				setSubmitting(false);
				props.onCorrect?.();
				return Promise.resolve();
			}
			catch(err) {
				if (err.response === null || err.response === undefined) {
					return Promise.reject(err);
				}

				let formResult:IFormControllerResult = null;
				switch (err.response.headers["x-exception-type"]) {
					case "Validation":
					case "UpdateFailed":
						formResult = err.response.data as IFormControllerResult;
						iterateAndTranslate(formResult.errors);
						setErrors(formResult.errors ?? {});
						setSubmitting(false);

						return;
				}
				
				return Promise.reject(err);
			}
		},
	});

	return (
		<Paper elevation={props.elevation} sx={mergeSx(props.sx ?? {}, { boxSizing: "border-box", p: 1 })}>
			<Box
				autoComplete={props.autoComplete ?? "off"}
				component="form"
				onSubmit={formik.handleSubmit}
				sx={{ display: "flex", flexDirection: "column", height: "100%" }}
			>
				<FormFeedback message={formik.errors["*"] as string} />
				<Box className="form-body" sx={{ flexGrow: 1, overflowY: "auto", pl: 2, pr: 2 }}>
					<FormContext.Provider value={{
						mode: props.mode,
						initialValues: formik.initialValues as FormikValues,
						setFieldValue: (field, value, shouldValidate) => {
							formik.setFieldValue(field, value, shouldValidate).then(() => undefined).catch((err) => console.error(err));
						},
						setFieldError: formik.setFieldError,
						isSubmitting: formik.isSubmitting,
						isValidating: formik.isValidating,
						formikValues: {
							errors: formik.errors,
							touched: formik.touched,
							values: formik.values as FormikValues,
							inputProps: {
								onBlur: formik.handleBlur,
								onChange: formik.handleChange
							}
						}
					}}>
						{props.children}
					</FormContext.Provider>
				</Box>
				<Box
					className="form-buttons"
					sx={{
						flexGrow: 0,
						p: 2,
						pt: 0,
						"> button:not(:last-child)": {
							marginRight: "10px"
						}
					}}
				>
					<FormButtons
						cancelProps={props.buttonProps?.cancel}
						isSubmitting={formik.isSubmitting}
						mode={props.mode}
						onCancel={props.onCancel}
						submitProps={props.buttonProps?.submit}
					/>
				</Box>
			</Box>
		</Paper>
	);
};

export default Form;