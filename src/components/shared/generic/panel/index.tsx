import React, { useMemo, useRef, useState } from "react";
import Card from "../../commons/card";
import CardContent from "../../commons/card/cardContent";
import CardHeader from "../../commons/card/cardHeader";
import CardActions from "../../commons/card/cardActions";
import { useIdRef } from "../../commons/utils/ids";
import { Collapse, SxProps, Theme } from "@mui/material";
import { useTranslate } from "../../commons/text/translate";
import { mergeSx } from "merge-sx";
import SkeletonPanelLoading from "./skeleton";

interface IPanelProps {
    headerTitle?:string,
    isCollapsable?:boolean,
    children?:React.ReactNode,
	sx?: SxProps<Theme>,
	isSuspended?:boolean
}

const Panel = (props:IPanelProps) => {
	const panelIdRef = useIdRef();
	const [isCollapsed, setCollapsed] = useState<boolean>(false);

	const [setTranslate] = useTranslate();

	const titlesRef = useRef({
		tooltips: {
			collapse: setTranslate({ namespace: "common", value: "collapse" }),
			show: setTranslate({ namespace: "common", value: "show" })
		}
	});

	const CardHeaderComponent = useMemo(() => {
		return (
			<CardHeader
				sx={{ pb: 1, pt: 1, borderBottom: 1, borderBottomColor: "grey.300" }}
				title={props.headerTitle}
				typography={{ variant: "subtitle1", sx: { fontWeight: 600 } }}
			/>
		);
	}, [props.headerTitle]);

	const CardActionsComponent = useMemo(() => {
		if (!props.isCollapsable) {
			return null;
		}

		return (
			<CardActions leftActions={isCollapsed ? [{
				key: "show-more-panel_" + panelIdRef.current,
				iconName: "arrow-down",
				tooltip: titlesRef.current.tooltips.show,
				onClick: () => setCollapsed(false)
			}] : [{
				key: "collapse-panel_" + panelIdRef.current,
				iconName: "arrow-up",
				tooltip: titlesRef.current.tooltips.collapse,
				onClick: () => setCollapsed(true)
			}]} />
		);
	}, [props.isCollapsable, isCollapsed]);

	const CardContentChildren = props.isSuspended ? <SkeletonPanelLoading /> : (
		<CardContent sx={{ pt: 0, pb: props.isCollapsable ? "0 !important" : 3 }}>
			{props.children}
		</CardContent>
	);

	return (
		<Card className="panel" sx={mergeSx({ borderLeft: 10, borderLeftColor: "primary.main" }, props.sx)}>
			{CardHeaderComponent}
			{ props.isCollapsable ? (
				<Collapse in={!isCollapsed} timeout="auto">
					{CardContentChildren}
				</Collapse>
			) : CardContentChildren}
			{CardActionsComponent}
		</Card>
	);
};

export default Panel;