import { createContext, useContext } from "react";
import { IDialogProviderContextProps } from "./index.t";

export const useDialogProviderContext = () => {
	return useContext(DialogProviderContext);
};

const DialogProviderContext = createContext<IDialogProviderContextProps>({
	setConfirmDialog: () => undefined,
	setDeleteDialog: () => undefined,
	setPromptDialog: () => undefined,
});

DialogProviderContext.displayName = "DialogProviderContext";
export default DialogProviderContext;