import React from "react";
import DatePickerField, { IDatePickerProps } from ".";

export interface IDateFieldProps extends IDatePickerProps {
    views?: ("year" | "month" | "day")[]
}

const DateField = (props:IDateFieldProps) => {
	return (
		<DatePickerField
			{...props}
		/>
	);
};


export default DateField;