import React, { memo, useCallback, useMemo } from "react";
import { IDropdownButtonProps } from "./index.t";
import Button from "../button";
import { Menu, MenuItem } from "@mui/material";
import { isStringNotEmpty } from "src/utils/utils";
import DropdownIcon from "../icon/dropdownicon";
import Text, { } from "../text";
import { ITextLabel } from "../text/index.t";
import { useIdRef } from "../utils/ids";
import Box from "../box";

const DropdownButtonMemoized = memo((props:IDropdownButtonProps) => {
	const buttonIdRef = useIdRef({ id: `dd-button-${props.id}` });
	const menuIdRef = useIdRef({ id: `dd-menu-${props.id}` });

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const isOpen = Boolean(anchorEl);

	const onHandleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	}, []);

	const onHandleClose = useCallback(() => {
		setAnchorEl(null);
	}, []);

	const options = useMemo(() => {
		return props.options?.map(option => {
			let TitleComponent = null;
			if (isStringNotEmpty(option.title)) {
				TitleComponent = option.title;
			}
			else {
				TitleComponent = <Text label={option.title as ITextLabel} />;
			}

			return (
				<MenuItem key={option.key} onClick={option.onClick}>
					{TitleComponent}
				</MenuItem>
			);
		});
	}, [props.options]);

	return (
		<Box className={`dropdown-container ${props.classNames?.root ?? ""}`.trim()}>
			<Button
				aria-controls={isOpen ? menuIdRef.current : undefined}
				aria-expanded={isOpen ? "true" : undefined}
				aria-haspopup="true"
				color={props.color}
				endIcon={props.hideEndIcon ? null : <DropdownIcon />}
				id={buttonIdRef.current}
				onClick={onHandleClick}
				sx={props.sxButton}
				title={props.title}
				variant={props.variant}
			/>
			<Menu
				MenuListProps={{
					"aria-labelledby": buttonIdRef.current,
				}}
				anchorEl={anchorEl}
				id={menuIdRef.current}
				onClose={onHandleClose}
				open={isOpen}
			>
				{options}
			</Menu>
		</Box>
	);
});

DropdownButtonMemoized.displayName = "DropdownButtonMemoized";
const DropdownButton = DropdownButtonMemoized;

export default DropdownButton;