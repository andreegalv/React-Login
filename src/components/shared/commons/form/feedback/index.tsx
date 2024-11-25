import React, { memo } from "react";
import { IFormFeedbackProps } from "./index.t";

const FormFeedbackMemoized = memo((props: IFormFeedbackProps) => {
	return (
		<div className="form-feedback">
			{props.message ? <span>{props.message}</span> : null}
		</div>
	);
});

FormFeedbackMemoized.displayName = "FormFeedbackMemoized";
const FormFeedback = FormFeedbackMemoized;

export default FormFeedback;