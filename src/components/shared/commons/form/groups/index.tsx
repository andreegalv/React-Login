import React, { useRef, useState } from "react";
import Typography from "../../typography";
import Box from "../../box";
import { useText } from "../../text";
import { ITextLabel } from "../../text/index.t";
import Divider from "../../divider";
import { Collapse } from "@mui/material";
import IconButton from "../../iconbutton";

type IFormColumnGroupProps = {
    children?: React.ReactNode,
    title: ITextLabel | string,
	isCollapsable?:boolean,
}
const FormColumnGroup = (props:IFormColumnGroupProps) => {
	const [isCollapsed, setCollapsed] = useState<boolean>(false);
	const Text = useText({ label: props.title, disableTypography: true });
	const sxButtonRef = useRef({
		width: "20px",
		height: "20px",
		ml: 1
	});

	return (
		<Box className="form-title-group" sx={{
			pt: 1,
			pb: 1,
			"&:not(:first-of-type)": {
				marginTop: "10px"
			}
		}}>
			<Box className="__header" sx={{display: "flex", flexDirection: "row"}}>
				<Typography sx={{ fontWeight: 600 }} variant="subtitle2">{Text}</Typography>
				{ props.isCollapsable ? (
					isCollapsed ? <IconButton name="expand-arrow" onClick={() => setCollapsed(false)} sx={sxButtonRef.current} /> :
						<IconButton name="collapse-arrow" onClick={() => setCollapsed(true)} sx={sxButtonRef.current} />
				) : null}
			</Box>
			<Collapse in={!isCollapsed} timeout="auto">
				<Divider sx={{ pb: 1, mb: 1 }} />
				<Box className="group-content">
					{props.children}
				</Box>
			</Collapse>
		</Box>
	);
};

export default FormColumnGroup;