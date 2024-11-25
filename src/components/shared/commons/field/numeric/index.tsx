import React, { useEffect, useRef, useState } from "react";
import TextField from "../textfield";
import { INumericFieldProps } from "./index.t";
import _ from "lodash";
import { isKeyPassValidationForNumbers } from "../textfield/utils";
import { NUMERIC_LOCALES } from "../../utils/numbers";

export const NUMERIC_FONT_FAMILY = "monospace";

const setFormatValue = (maxPrecision:number, value?:number, emptyAsZero?:boolean, currentPrecision?:number):string => {
	const result = value?.toLocaleString(NUMERIC_LOCALES, { maximumFractionDigits: maxPrecision, minimumFractionDigits: currentPrecision });
	return emptyAsZero && result === "0" ? "" : result ?? "";
};

interface NumericStyleSxProps {
	className?:string
};
export const useNumericStyleSx = (props?:NumericStyleSxProps) => {
	const { className } = props ?? {};

	const numericStyleSx = useRef(className ? {
		[className]: {
			fontFamily: NUMERIC_FONT_FAMILY
		}
	} : {
		fontFamily: NUMERIC_FONT_FAMILY
	});

	return numericStyleSx.current;
};

const NumericField = (props:INumericFieldProps) => {
	const maxPrecision = props.maxPrecision ?? 4;
	const maxLength = props.maxLength ?? 16;
	const [valueIntercepted, setValueIntercepted] = useState<string>(setFormatValue(maxPrecision, props.defaultValue ?? props.value ?? 0, true));
	const numericValue = useRef<{integer?: number, rest?:number, precision?: number}>({});
	const setPointerRef = useRef<boolean>(false);
	const selectionRef = useRef<{selectionStart?:number, selectionEnd?:number}>({selectionStart: null, selectionEnd: null});
	const inputRef = useRef(null);
	const isBackspaceRef = useRef<boolean>(false);
	const sx = useNumericStyleSx({ className: "input.MuiInputBase-input" });
	const isMounted = useRef(false);

	useEffect(() => {
		if (isMounted.current && (props.value !== undefined && props.value !== null)) {
			setValueIntercepted(setFormatValue(maxPrecision, props.value, true));
		}
	}, [props.value, maxPrecision]);

	useEffect(() => {
		if (valueIntercepted?.includes(",") && inputRef.current !== null) {
			inputRef.current.setSelectionRange(selectionRef.current.selectionStart, selectionRef.current.selectionEnd);
		}
	}, [valueIntercepted]);

	useEffect(() => {
		isMounted.current = true;
	}, []);

	return (
		<TextField
			placeholder="0"
			sx={sx}
			textAlign="right"
			{..._.omit(props, ["value", "defaultValue"])}
			inputRef={inputRef}
			onChange={(evt) => {
				selectionRef.current.selectionStart = evt.target.selectionStart;
				selectionRef.current.selectionEnd = evt.target.selectionEnd;
                
				let valueChanged = evt.target.value;

				const oldValue = valueChanged;
				valueChanged = valueChanged?.replaceAll(".", "").replace(",", ".");

				const hasPrecision = valueChanged?.includes(".");
				const integerValue = hasPrecision ? valueChanged?.split(".")[0] : valueChanged;
				const precisionValue = hasPrecision ? valueChanged?.split(".")[1] : null;

				if (precisionValue?.length > maxPrecision) {
					evt.preventDefault();
					return;
				}

				if (integerValue?.length > maxLength) {
					evt.preventDefault();
					return;
				}

				if (!maxPrecision && oldValue.endsWith(",")) {
					evt.preventDefault();
					return;
				}
                
				const currentValue = parseFloat(valueChanged);
				props.onChange?.({ ...evt, target: { ...evt.target, value: valueChanged, name: props.name }}, isNaN(currentValue) ? 0 : currentValue);
				if (oldValue?.endsWith(",0") || oldValue.endsWith(",")) {
					setValueIntercepted(oldValue);
				}
				else {
					const valueToFormat = isNaN(currentValue) ? 0 : currentValue;
					setValueIntercepted(setFormatValue(maxPrecision, valueToFormat, isBackspaceRef.current, precisionValue?.length));
				}

				evt.target.setSelectionRange(selectionRef.current.selectionStart, selectionRef.current.selectionEnd);
				numericValue.current = { integer: parseInt(integerValue), precision: precisionValue?.length ?? 0, rest: !precisionValue ? 0 : parseInt(precisionValue) };
			}}
			onKeyDown={(evt) => {
				const isNotValidKey = !isKeyPassValidationForNumbers(evt.key);
				if (evt.key === "," && !setPointerRef.current) {
					setPointerRef.current = true;
				}

				if (evt.key === "Backspace") {
					isBackspaceRef.current = true;
				}
				else {
					isBackspaceRef.current = false;
				}

				if (isNotValidKey) {
					evt.preventDefault();
					return;
				}
			}}
			value={valueIntercepted}
		/>
	);
};

export default NumericField;