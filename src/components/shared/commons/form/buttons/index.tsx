import React, { memo, useMemo } from "react";
import { memoizedComponentChecker } from "src/utils/utils";
import { FormMode, IFormButtonRenderProps } from "../index.t";
import AddButton from "src/components/shared/generic/buttons/addbutton";
import CancelButton from "src/components/shared/generic/buttons/cancelbutton";
import UpdateButton from "src/components/shared/generic/buttons/updatebutton";
import { isFalse } from "../../utils/comparison";

interface IFormButtonsProps {
	onCancel?: React.MouseEventHandler<HTMLButtonElement>,
	submitProps?: {
		label?:string,
		visible?:boolean,
		onRender?: (props:IFormButtonRenderProps) => React.ReactNode
	},
	cancelProps?: {
		label?:string,
		visible?:boolean,
	},
	isSubmitting?: boolean,
	mode?: FormMode,
}
const FormButtonsMemoized = memo((props:IFormButtonsProps) => {
	const submitClassName = "submit-form";
	const submitButtonType = "submit";

	const {  isSubmitting } = props;

	const AddButtonComponent = useMemo(() => {
		if (props.mode === "create") {
			return <AddButton className={submitClassName} disabled={isSubmitting} title={props.submitProps?.label} type="submit" />;
		}
		return null;
	}, [props.mode, isSubmitting]);

	const UpdateButtonComponent = useMemo(() => {
		if (props.mode === "edit") {
			return <UpdateButton className={submitClassName} disabled={isSubmitting} title={props.submitProps?.label} type="submit" />;
		}
		return null;
	}, [props.mode, isSubmitting]);

	const SubmitComponent = props.submitProps?.onRender ?
		props.submitProps.onRender({type: submitButtonType, className: submitClassName, disabled: props.isSubmitting }) : (
			<>
				{ isFalse(props.submitProps?.visible) ? null : AddButtonComponent }
				{ isFalse(props.submitProps?.visible) ? null : UpdateButtonComponent }
				{ isFalse(props.cancelProps?.visible) ? null : props.onCancel && <CancelButton className="cancel-form" disabled={props.isSubmitting} onClick={props.onCancel} title={props.cancelProps?.label} /> }
			</>
		);

	return SubmitComponent;
},
memoizedComponentChecker({include: [ "isSubmitting" ]}));

FormButtonsMemoized.displayName = "FormButtonsMemoized";

const FormButtons = FormButtonsMemoized;
export default FormButtons;