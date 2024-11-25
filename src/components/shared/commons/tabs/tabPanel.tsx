import React, { useRef, useState } from "react";
import Box from "../box";
import { SxProps, Tab, Tabs, Theme } from "@mui/material";
import TabContent from "./tabContent";

export interface ITabPanelItemProps {
    id:string,
    title?:React.ReactNode,
    element: React.ReactNode,
	slots?: {
		tab?: { sx?: SxProps<Theme> }
	}
}

export interface ITabPanelProps {
    items?:ITabPanelItemProps[]
}

const TabPanel = (props:ITabPanelProps) => {
	const [tabValue, setTabValue] = useState(0);
	const sxRef = useRef({
		tabContent: {
			sx: { height: "100%" },
			header: { sx: { boxSizing: "border-box", borderBottom: 1, borderColor: "divider"} },
			body: { sx: { height: "calc(100% - 49px)", p: 2, boxSizing: "border-box" }}
		}
	});

	return (
		<Box className="tab-content__container" sx={sxRef.current.tabContent.sx}>
			<Box className="__header" sx={sxRef.current.tabContent.header.sx}>
				<Tabs aria-label="tab-content" onChange={(event, number:number) => setTabValue(number)} value={tabValue}>
					{props.items?.map((i) => (
						<Tab aria-controls={`simple-tabpanel-${i.id}`} id={`simple-tab-${i.id}`} key={`key.tab-content__header-item__${i.id}`} label={i.title} sx={i.slots?.tab?.sx} />
					))}
				</Tabs>
			</Box>
			<Box className="__body" sx={sxRef.current.tabContent.body.sx}>
				{props.items?.map((i, index) => (
					<TabContent
						id={i.id}
						isSelected={tabValue == index}
						key={`key.tab-content__body-item__${i.id}`}
					>
						{i.element}
					</TabContent>
				))}
			</Box>
		</Box>
	);
};

export default TabPanel;