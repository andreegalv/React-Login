import React from "react";
import Box from "../box";

interface ITabContentProps {
    id:string,
    children?: React.ReactNode
    isSelected:boolean
}

const TabContent = (props:ITabContentProps) => {    
	return (
		<div
			aria-labelledby={`simple-tab-${props.id}`}
			hidden={!props.isSelected}
			id={`simple-tabpanel-${props.id}`}
			role="tabpanel"
			style={{
				height: "100%",
				overflowY: "scroll"
			}}
		>
			<Box className="__tab-item-body" sx={{
				display: props.isSelected ? "block" : "none",
				boxSizing: "border-box"
			}}>
				{props.children}
			</Box>
		</div>
	);
};

export default TabContent;