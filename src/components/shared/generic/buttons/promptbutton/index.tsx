import React from "react";
import Button from "src/components/shared/commons/button";
import PromptIcon from "src/components/shared/commons/icon/prompticon";
import { useDialogProviderContext } from "src/components/shared/generic/dialogprovider/context";

interface IPromptButtonProps {
	disabled?: boolean,
	element: (params?: { close: () => void }) => React.ReactNode

}
const PromptButton = (props:IPromptButtonProps) => {
	const { setPromptDialog } = useDialogProviderContext();

	return (
		<Button
			disabled={props.disabled}
			onClick={() => {
				if (!props?.element) {
					return null;
				}
				return setPromptDialog({ element: ({ closeDialog }) => props?.element({ close: closeDialog }) });
			}}
			startIcon={<PromptIcon />}
			title="Buscar"
			variant="outlined"
		/>
	);
};

export default PromptButton;