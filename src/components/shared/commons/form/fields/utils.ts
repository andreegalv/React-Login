import { useContext } from "react";
import { FormContext } from "../context";
import { isStringNotEmpty } from "src/utils/utils";
import _ from "lodash";

interface IFormikValuesHook {
    name: string,
	disabled?:boolean
}

const tryGetFormikInitialAndValue = (name:string, values:unknown, initialValues: unknown) => {
	const value = _.get(values, name) as string | undefined;
	const initialValue = _.get(initialValues, name) as unknown;
	return { initialValue, value };
};

const setFieldValueCallback = (setFieldValue: (name:string, value:unknown) => void, name:string, value:unknown, initialValue?:unknown) => {
	setFieldValue(name, value ?? initialValue);
};

export const useFormikValues = (props:IFormikValuesHook) => {
	const formContext = useContext(FormContext);
	const { name } = props;
	const { value, initialValue } = tryGetFormikInitialAndValue(name, formContext.formikValues?.values ?? {}, formContext.initialValues ?? {});

	/*const value:string | undefined = formContext.formikValues?.values[name];
	const initialValue = formContext.initialValues[name] as unknown;*/

	if (formContext === null) {
		return null;
	}

	const hasKey:boolean = Object.keys(formContext.formikValues?.values ?? {}).some(k => k === name);
	const errorMessage:string | undefined = _.get(formContext.formikValues?.errors, name);
	
	const isTouched:boolean = _.get(formContext.formikValues?.touched, name) ?? false;
	const isError:boolean = isStringNotEmpty(errorMessage) && (isTouched || props.disabled);
	const inputProps = formContext.formikValues?.inputProps;
	const isSubmitting:boolean = formContext.isSubmitting;
	const isValidating:boolean = formContext.isValidating;
	const isDisabled:boolean = formContext.isSubmitting && !formContext.isValidating;	

	return {
		mode: formContext.mode,
		isDisabled,
		isSubmitting,
		isValidating,
		initialValue,
		errorMessage,
		isError,
		isTouched,
		value,
		hasKey,
		inputProps,
		setters: {
			setFieldValue: (value) => setFieldValueCallback(formContext.setFieldValue, name, value, initialValue)
		}
	};
};