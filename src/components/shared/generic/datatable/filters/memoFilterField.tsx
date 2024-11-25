import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import ComboBox from "src/components/shared/commons/combobox";
import { IComboBoxItem } from "src/components/shared/commons/combobox/index.t";
import DropdownButton from "src/components/shared/commons/dropdownbutton";
import TextField from "src/components/shared/commons/field/textfield";
import { useTranslate } from "src/components/shared/commons/text/translate";
import { ColumnFilterSearchType } from "../globalFilterManagerIcon";
import { debounce } from "lodash";
import { isBoolean, isNumber, isString } from "src/utils/utils";
import { IMenuItem } from "src/components/shared/commons/dropdownbutton/index.t";

interface IMemoFilterFieldProps {
	filterSelectOptions?: { value: unknown, label: string }[],
	filterVariant?: "select" | "text",
	filterColumnName: string,
	filterTitle?:string,
	filterType?: "string" | "number" | "datetime",
	onSetFilterValue?: (params:{ name: string, value: unknown, operator:ColumnFilterSearchType }) => void,
	onClearFilterValue?:() => void,
	defaultValue?: unknown
}

const MemoFilterField = memo((props:IMemoFilterFieldProps) => {
	const [setTranslate] = useTranslate();

	const operators = useMemo(() => ({
		equal: {
			key: "eq",
			title: setTranslate({ namespace: "common", value: "grid.filter.equal"}),
			onClick: () => setOptionSelected("eq")
		},
		noEqual: {
			key: "neq",
			title: setTranslate({ namespace: "common", value: "grid.filter.noEqual"}),
			onClick: () => setOptionSelected("neq")
		},
		lessThan: {
			key: "lt",
			title: setTranslate({ namespace: "common", value: "grid.filter.lessThan"}),
			onClick: () => setOptionSelected("lt")
		},
		lessOrEqualThan: {
			key: "lte",
			title: setTranslate({ namespace: "common", value: "grid.filter.lessOrEqualThan"}),
			onClick: () => setOptionSelected("lte")
		},
		greaterThan: {
			key: "gt",
			title: setTranslate({ namespace: "common", value: "grid.filter.greaterThan"}),
			onClick: () => setOptionSelected("gt")
		},
		greaterOrEqualThan: {
			key: "gte",
			title: setTranslate({ namespace: "common", value: "grid.filter.greaterOrEqualThan"}),
			onClick: () => setOptionSelected("gte")
		},
		startsWith: {
			key: "startswith",
			title: setTranslate({ namespace: "common", value: "grid.filter.startsWith"}),
			onClick: () => setOptionSelected("startswith")
		},
		endsWith: {
			key: "endswith",
			title: setTranslate({ namespace: "common", value: "grid.filter.endsWith"}),
			onClick: () => setOptionSelected("endswith")
		},
		contains: {
			key: "contains",
			title: setTranslate({ namespace: "common", value: "grid.filter.contains"}),
			onClick: () => setOptionSelected("contains")
		},
		doesNotContain: {
			key: "doesnotcontain",
			title: setTranslate({ namespace: "common", value: "grid.filter.doesNotContain"}),
			onClick: () => setOptionSelected("doesnotcontain")
		},
	}), [setTranslate]);

	const { filterType } = props;
	const optionsOperator = useMemo<IMenuItem[]>(() => {
		// datetime operators
		if (filterType === "datetime") {
			return [
				operators.equal,
				operators.noEqual,
				operators.lessThan,
				operators.lessOrEqualThan,
				operators.greaterThan,
				operators.greaterOrEqualThan,
			];
		}

		// string operators
		return [
			operators.contains,
			operators.doesNotContain,
			operators.startsWith,
			operators.endsWith,
			operators.equal,
			operators.noEqual,
		];
	}, [setTranslate, filterType]);

	const [optionSelected, setOptionSelected] = useState<ColumnFilterSearchType>(optionsOperator[0].key);

	const options = useMemo(() => {
		return props.filterSelectOptions?.map<IComboBoxItem>((o) => {
			if (isString(o.value) || isNumber(o.value) || isBoolean(o.value)) {
				return ({ id: o.value, label: o.label });
			}
			else {
				throw new Error("Value is not a string, number nor boolean");
			}
		});
	}, [props.filterSelectOptions]);

	const { onSetFilterValue, onClearFilterValue, filterColumnName } = props;

	const onSetFilterValueCallback = useCallback((value:string) => {
		if (value) {
			onSetFilterValue?.({ name: filterColumnName, value: value, operator: optionSelected });
			return;
		}
		
		onClearFilterValue?.();

	}, [filterColumnName, onSetFilterValue, onClearFilterValue, optionSelected]);

	const debouncedSetFilterValue = useMemo(() => {
		return debounce(onSetFilterValueCallback, 1000);
	}, [onSetFilterValueCallback]);

	useEffect(() => {
		return () => {
			console.log("DISMOUNT!");
		};
	}, []);

	switch(props.filterVariant){
		case "select":
			return (
				<ComboBox
					label={props.filterTitle}
					onClear={() => onClearFilterValue?.()}
					onSelect={(_, value) => onSetFilterValue?.({ name: props.filterColumnName, value: value.id, operator: "eq" })}
					options={options}
				/>
			);
		default:
			return (
				<TextField
					defaultValue={props.defaultValue as string}
					inputProps={{
						startAdornment:
							<DropdownButton
								options={optionsOperator}
								sxButton={{
									padding: "2px",
									minWidth: "32px",
									fontSize: "0.850rem",
									color: "primary.main",
									borderRight: "1px solid",
									borderColor: "grey.300",
									borderRadius: 0
								}}
								title={optionsOperator.find((o) => o.key === optionSelected)?.title}
								variant="text"
							/>
					}}
					label={props.filterTitle}
					onChange={(evt) => {
						debouncedSetFilterValue(evt.target.value);
					}}
					size="small"
				/>
			);
	}
});

MemoFilterField.displayName = "MemoFilterField";
export default MemoFilterField;