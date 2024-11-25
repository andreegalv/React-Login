import React, { useCallback, useState } from "react";
import Button, { IButtonProps } from "src/components/shared/commons/button";
import { LoadingIcon } from "src/components/shared/commons/icon/animations/loading";

interface ILoadingButtonProps extends Omit<IButtonProps, "onClick" | "startIcon"> {
    onClickAsync: () => Promise<unknown>
}

const LoadingButton = (props:ILoadingButtonProps) => {
	const [isLoading, setLoading] = useState(false);
	const onHandleClickCallback = useCallback(() => {
		const loadingTimeout = setTimeout(() => {
			setLoading(true);
		}, 100);

		props.onClickAsync().finally(() => {
			clearTimeout(loadingTimeout);
			setLoading(false);
		});
	}, [props.onClickAsync]);

	return (
		<Button
			{...props}
			disabled={isLoading || props.disabled}
			onClick={onHandleClickCallback}
			startIcon={isLoading ? <LoadingIcon size={16} /> : null}
			title={props.title}
		/>
	);
};

export default LoadingButton;