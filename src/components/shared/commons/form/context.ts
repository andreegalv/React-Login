import { createContext, useContext } from "react";
import { FormMode, FormikValues, IFormValuesModel } from "./index.t";

export interface IFormContext {
    mode?: FormMode;
    setFieldValue?: (field:string, value:unknown, shouldValidate?:boolean) => void,
    setFieldError?: (field:string, value: unknown) => void,
    isValidating?:boolean,
    isSubmitting?:boolean,
    initialValues: FormikValues,
    formikValues?:IFormValuesModel,
}
export const FormContext = createContext<IFormContext>({
	mode: undefined,
	setFieldValue: () => undefined,
	initialValues: {},
	formikValues: undefined
});

FormContext.displayName = "FormContext";

export const useFormContext = () => {
	const context = useContext(FormContext);
	return context;
};