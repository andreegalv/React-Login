import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { IDialogCallbackProps, IDialogProviderProps } from "./index.t";
import DialogProviderContext from "./context";
import CustomDialog from "../../commons/dialog/customDialog";
import IconButton from "../../commons/iconbutton";
import Box from "../../commons/box";
import { useTranslate } from "../../commons/text/translate";

enum DialogType {
	Confirm = 1,
	Prompt = 2,
	Delete = 3
}

interface IDialogStateProps {
	title?:React.ReactNode,
	body?:(props?:{ closeDialog: () => void }) => React.ReactNode,
	disabled?:boolean,
	type: DialogType,
	onConfirm?:(props:IDialogCallbackProps) => void
}

const DialogProviderMemo = memo((props:IDialogProviderProps) => {
	const [dialogProps, setDialogProps] = useState<IDialogStateProps>(null);
	const [setTranslate] = useTranslate();
	const defaultLabelsRef = useRef({
		defaultSelectTitle: { label: setTranslate({namespace: "common", value: "select" }) },
		defaultDeleteEntry: { label: setTranslate({ namespace: "common", value: "dialog.deleteEntry" }) },
		confirm: {
			label: {
				error: setTranslate({namespace: "common", value: "dialog.deleteEntryButton" })
			}
		}
	});

	const DialogComponent = useMemo(() => {
		if (!dialogProps) {
			return null;
		}

		const { body } = dialogProps;

		const generalProps = {
			title: dialogProps.title,
			body: body({ closeDialog: () => setDialogProps(null) }),
			disabled: dialogProps.disabled
		};

		let CustomDialogComponent = null;

		switch(dialogProps.type){
			case DialogType.Prompt:
				CustomDialogComponent = (
					<CustomDialog
						{...generalProps}
						title={(
							<Box sx={{display: "flex", placeContent: "space-between"}}>
								{defaultLabelsRef.current.defaultSelectTitle.label}
								<IconButton name="cancel" onClick={() => setDialogProps(null)} />
							</Box>
						)}
					/>
				);
				break;
			case DialogType.Delete:
				CustomDialogComponent = (
					<CustomDialog
						{...generalProps}
						buttonsProps={{
							confirm: {
								color: "error",
								title: defaultLabelsRef.current.confirm.label.error
							}
						}}
						iconProps={{
							name: "cancel",
							fontSize: "large",
							color: "error"
						}}
						onCancel={() => {
							setDialogProps(null);
						}}
						onConfirm={() => {
							dialogProps.onConfirm?.({
								closeDialog: () => setDialogProps(null),
								setDisabled: (disabled) => setDialogProps((prev) => ({...prev , disabled}))
							});
						}}
						sx={{
							"& .MuiDialog-paper": {
								borderTop: 12,
								borderColor: "error.main",
							}
						}}
						title={defaultLabelsRef.current.defaultDeleteEntry.label}
					/>
				);
				break;
			default:
				CustomDialogComponent = (
					<CustomDialog
						{...generalProps}
						onCancel={() => {
							setDialogProps(null);
						}}
						onConfirm={() => {
							dialogProps.onConfirm?.({
								closeDialog: () => setDialogProps(null),
								setDisabled: (disabled) => setDialogProps((prev) => ({...prev , disabled}))
							});
						}}
					/>
				);
				break;
		}

		return (CustomDialogComponent);
	}, [dialogProps]);

	const setConfirmDialogCallback = useCallback((p) => {
		setDialogProps({
			title: p.title,
			type: DialogType.Confirm,
			body: () => p.message,
			onConfirm: p.onConfirm
		});
	}, [setDialogProps]);
	const setDeleteDialogCallback = useCallback((p) => {
		setDialogProps({
			type: DialogType.Delete,
			body: () => p.message,
			onConfirm: p.onConfirm
		});
	}, [setDialogProps]);
	const setPromptDialogCallback = useCallback((p) => {
		setDialogProps({
			type: DialogType.Prompt,
			body: p.element
		});
	}, [setDialogProps]);

	return (
		<DialogProviderContext.Provider value={{
			setConfirmDialog: setConfirmDialogCallback,
			setDeleteDialog: setDeleteDialogCallback,
			setPromptDialog: setPromptDialogCallback
		}}>
			{props.children}
			{DialogComponent}
		</DialogProviderContext.Provider>
	);
},
() => true);

DialogProviderMemo.displayName = "DialogProviderMemo";
const DialogProvider = DialogProviderMemo;

export default DialogProvider;