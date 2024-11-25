import React, { memo, useCallback, useMemo } from "react";
import { useFormikValues } from "../utils";
import { IFormComboBox } from "./index.t";
import { IComboBoxItem } from "../../../combobox/index.t";
import ComboBox from "../../../combobox";
import { useId } from "../../../utils/ids";

const MemoFormComboBox = memo((props:IFormComboBox) => {
	return (
		<ComboBox
			{...props}
		/>
	);
});
MemoFormComboBox.displayName = "MemoFormComboBox";

const FormComboBox = (props:IFormComboBox) => {
	const id = useId({ prefix: "combobox" });
	const formikValues = useFormikValues(props);
	const { hasKey = false } = formikValues;

	const defaultValue = useMemo(() => {
		if (formikValues.initialValue) {
			const defaultValue = props.options?.find(o => o.id === formikValues.initialValue);
			return defaultValue;
		}
		else {
			return props.defaultValue;
		}
	}, [props.defaultValue, formikValues.initialValue, props.options]);

	const { setFieldValue } = formikValues.setters;

	const onChangeCallback = useCallback((event:React.SyntheticEvent<Element, Event>, value:IComboBoxItem) => {
		if (hasKey) {
			setFieldValue?.(value?.id);
		}

		props.onChange?.(event, value);
	}, [hasKey]);

	const isReadonly = formikValues.mode === "readonly";

	return (
		<MemoFormComboBox
			id={id}
			{...props}
			defaultValue={defaultValue}
			disabled={props.disabled ?? (isReadonly || formikValues.isDisabled)}
			helperText={formikValues.isError ? formikValues.errorMessage : props.helperText}
			isError={props.isError ?? formikValues.isError}
			onChange={onChangeCallback}
		/>
	);
};

export default FormComboBox;