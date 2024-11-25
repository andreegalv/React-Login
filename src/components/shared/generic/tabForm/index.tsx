import React, { useMemo } from "react";
import FeedbackIcon from "../../commons/icon/feedbackicon";
import Badge from "../../commons/badge";
import { useFormContext } from "../../commons/form/context";
import TabPanel, { ITabPanelItemProps, ITabPanelProps } from "../../commons/tabs/tabPanel";
import TabFormContent from "./tabFormContent";

const TabFormFeedback = () => {
	const { formikValues: { errors }  } = useFormContext();

	const Icon = useMemo(() => {
		const totalKeys = Object.keys(errors).length;
		if (totalKeys <= 0) {
			return <FeedbackIcon />;
		}

		return (
			<Badge color="error" content={totalKeys}>
				<FeedbackIcon />
			</Badge>
		);
	}, [errors]);

	return Icon;
};

const TabFormPanel = (props:ITabPanelProps) => {
	const { mode } = useFormContext();

	const items = useMemo<ITabPanelItemProps[]>(() => {
		if (mode === "readonly") {
			return props.items;
		}
		
		const newArray = [...props.items];
		newArray.push({
			title: <TabFormFeedback />,
			id: "form.error",
			element: <TabFormContent />,
			slots: {
				tab: { sx: { ml: "auto" } }
			}
		});

		return newArray;
	}, [props.items, mode]);

	return (
		<TabPanel
			items={items}
		/>
	);
};

export default TabFormPanel;