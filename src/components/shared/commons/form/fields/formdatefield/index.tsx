import React, { memo, useMemo } from "react";
import DateField, { IDateFieldProps } from "../../../field/datepicker/datefield";
import { useFormikValues } from "../utils";
import dayjs, { Dayjs } from "dayjs";

interface IFormDateFieldProps extends Omit<IDateFieldProps, "name"> {
    name:string
}

const MemoFormDateFieldMemo = memo((props:IFormDateFieldProps) => {
	return (
		<DateField
			{...props}
		/>
	);
});
MemoFormDateFieldMemo.displayName = "MemoFormDateFieldMemo";

const FormDateField = (props:IFormDateFieldProps) => {
	const formikValues = useFormikValues(props);
	const initialValue = useMemo<Dayjs | null>(() => {
		if (dayjs.isDayjs(formikValues.initialValue)) {
			return formikValues.initialValue;
		}
		else if (formikValues.initialValue instanceof Date) {
			return dayjs(formikValues.initialValue);
		}
        
		return null;
		
	}, [formikValues.initialValue]);

	const isReadonly = formikValues.mode === "readonly";

	return (
		<MemoFormDateFieldMemo
			{...props}
			defaultValue={initialValue}
			disabled={props.disabled ?? (isReadonly || formikValues.isDisabled)}
			onChange={(value) => {
				if (props.onChange) {
					props.onChange(value);
					return;
				}
                
				// @ts-expect-error There is not event in DatePicker from MaterialUI, and formik needs a common event handler.
				formikValues.inputProps?.onChange({ target: { id: props.name, name: props.name, value: value.toDate()}});
			}}
			required={props.required ?? false}
		/>
	);
};

export default FormDateField;