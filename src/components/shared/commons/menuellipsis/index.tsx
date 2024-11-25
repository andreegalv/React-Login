import React, { useMemo, useState } from "react";
import { Box, MenuItem, MenuList, useTheme } from "@mui/material";
import IconButton from "../iconbutton";
import { useId } from "../utils/ids";
import { IMenuEllipsisProps } from "./index.t";
import Text from "../text";
import { StyledMenu } from "./styled";

const MenuEllipsis = (props:IMenuEllipsisProps) => {
	const theme = useTheme();
	const buttonId = useId({ prefix: "button-menu-ellipsis" });
	const menuId = useId({ prefix: "menu-ellipsis" });
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	
	const Options = useMemo(() => {
		return props.options?.map((option, index) => {
			const optionKey = `${buttonId}-item-${index}`;

			return (
				<MenuItem
					divider={option.divider ?? false}
					key={optionKey}
					onClick={(evt) => {
						option.onClick?.(evt);
						setAnchorEl(null);
					}}>
					{option.icon}
					<Text label={option.label} />
				</MenuItem>
			);
		});
	}, [props.options, buttonId]);

	const isOpen = Boolean(anchorEl);
	return (
		<Box className="menu-ellipsis-container">
			<IconButton
				aria-controls={isOpen ? menuId : undefined}
				aria-expanded={isOpen ? "true" : undefined}
				aria-haspopup="true"
				bordered={props.bordered ?? false}
				id={buttonId}
				name="vert-ellipsis"
				onClick={(event) => setAnchorEl(event.currentTarget)}
				tooltip={props.tooltip}
				tooltipPlacement={props.tooltipPlacement}
			/>
			<StyledMenu
				MenuListProps={{
					"aria-labelledby": buttonId,
				}}
				anchorEl={anchorEl}
				id={menuId}
				onClose={() => setAnchorEl(null)}
				open={isOpen}
				theme={theme}
			>
				<MenuList dense>
					{Options}
				</MenuList>
			</StyledMenu>
		</Box>
	);
};

export default MenuEllipsis;